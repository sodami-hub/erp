package com.erp.commonutil.jwt;

import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.jwt.dto.JwtClaimsDTO;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;


/*
    * JWT 토큰을 생성하고 검증하는 클래스
    * 토큰에 들어갈 정보는 Claims에 저장 Map<String, Object> 형태로 저장
    저장 정보는 staff_id, institution_id, phone(로그인 id), auth_id(권한)
 */

@Slf4j
@Component
public class JwtTokenProvider {

  private final ObjectMapper objectMapper;
  private Key key;
  private long accessTokenValiditySeconds;
  private long refreshTokenValiditySeconds;

  // application.yml에 있는 jwt.secret 값을 가져와서 Base64로 디코딩 후 Key 객체를 생성
  public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
                          @Value("${jwt.access-token-validity-seconds}") long accessTokenValiditySeconds,
                          @Value("${jwt.refresh-token-validity-seconds}") long refreshTokenValiditySeconds,
                          ObjectMapper objectMapper)
  {
      this.objectMapper = objectMapper;
      this.accessTokenValiditySeconds = accessTokenValiditySeconds;
      this.refreshTokenValiditySeconds = refreshTokenValiditySeconds;

      if (secretKey == null || secretKey.isEmpty()) {
      // 키가 제공되지 않은 경우 안전한 키를 생성
      this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
      log.warn("No secret key provided. A secure random key has been generated.");
    }
    try {
      byte[] keyBytes = Decoders.BASE64.decode(secretKey);
      this.key = Keys.hmacShaKeyFor(keyBytes);
    } catch (IllegalArgumentException e) {
      throw new IllegalArgumentException("Invalid JWT secret key format", e);
    }
  }

  /**
   * AccessToken 생성
   * @param context UserContext
   * @return String
   */
  public String generateAccessToken(UserContext context) {
    return Jwts.builder()
            .setSubject(context.getUsername())
            .claim("staffId", context.getStaffId())
            .claim("institutionId", context.getInstitutionId())
            .claim("roles", getAuthorities(context))
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + accessTokenValiditySeconds * 1000))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
  }

  /**
   * RefreshToken 생성
   * @param context UserContext
   * @return String
   */
  public String generateRefreshToken(UserContext context) {
    return Jwts.builder()
            .setSubject(context.getUsername())
            .claim("staffId", context.getStaffId())
            .claim("institutionId", context.getInstitutionId())
            .claim("roles", getAuthorities(context))
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + refreshTokenValiditySeconds * 1000))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
  }

  /**
   * UserContext 권한 조회
   * @param context UserContext
   * @return String
   */
  private String getAuthorities(UserContext context) {
      return context.getAuthorities().stream().filter(Objects::nonNull)
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.joining(","));
  }

  /**
   * 토큰에서 UserContext 생성
   * @param token
   * @return UserContext
   */
  public UserContext getUserContext(String token) {
    Claims claims = parseClaims(token);

    String username = claims.getSubject();
    Long staffId = claims.get("staffId", Long.class);
    String institutionId = claims.get("institutionId", String.class);
    String roles = claims.get("roles", String.class);

    List<GrantedAuthority> authorities = (roles != null) ? Arrays.stream(roles.split(","))
                          .map(SimpleGrantedAuthority::new)
                          .collect(Collectors.toList()) : Collections.emptyList();

    return UserContext.builder()
        .phone(username)
        .staffId(staffId)
        .institutionId(institutionId)
        .authorities(authorities)
        .build();
  }

  /**
   * 토큰에서 Claims 파싱
   * @param token
   * @return Claims
   */
  private Claims parseClaims(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody();
    } catch (Exception e) {
      log.error("JWT token parsing error: {}", e.getMessage());
      throw new RuntimeException("Invalid JWT token", e);
    }
  }

  // JWT 토큰을 생성하는 메서드
  public JwtToken generateAccessToken(JwtClaimsDTO claims) {
    long now = System.currentTimeMillis();

    Date accessTokenExpiresIn = new Date(now + 864000000); // 10일
    String accessToken = Jwts.builder()
        .claim("auth", claims)
        .setExpiration(accessTokenExpiresIn)
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();

    String refreshToken = Jwts.builder()
        .setExpiration(new Date((now + 864000000) * 20)) // 20일
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();

    return new JwtToken("Bearer", accessToken, refreshToken);
  }

  // jwt 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
  public JwtClaimsDTO getClaims(String token) {
    return objectMapper.convertValue(
        Jwts.parserBuilder()
            .deserializeJsonWith(new JacksonDeserializer<>(objectMapper))
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("auth", LinkedHashMap.class),
        JwtClaimsDTO.class
    );
  }


  // 토큰 검증
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      log.error("JWT token validation error: {}", e.getMessage());
      return false;
    }
  }
}
