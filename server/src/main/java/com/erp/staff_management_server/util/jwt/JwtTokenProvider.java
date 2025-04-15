package com.erp.staff_management_server.util.jwt;

import com.erp.staff_management_server.dto.jwt.JwtClaimsDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.LinkedHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

  // application.yml에 있는 jwt.secret 값을 가져와서 Base64로 디코딩 후 Key 객체를 생성
  public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;

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

  // JWT 토큰을 생성하는 메서드
  public JwtToken generateToken(JwtClaimsDTO claims) {
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

  // 토큰의 정보를 Authentication 객체에 저장하는 메서드
  public void saveAuth(JwtClaimsDTO claims) {
    Authentication auth = new UsernamePasswordAuthenticationToken(claims, null, null);
    SecurityContextHolder.getContext().setAuthentication(auth);
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
