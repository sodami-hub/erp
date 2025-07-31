package com.erp.commonutil.config.security;

import com.erp.commonutil.Constants;
import com.erp.commonutil.jwt.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

/**
 * JWT 인증 필터
 * 이 필터는 모든 요청에 대해 JWT 토큰을 검사하고, 유효한 토큰이 있는 경우 인증 정보를 설정
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  /** Logger */
  private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  /** JwtTokenProvider */
  private final JwtTokenProvider tokenProvider;

  /** RefreshTokenFinder */
  private final RefreshTokenFinder refreshTokenFinder;

  /** Security 제외 URL */
  private static final List<String> WHITE_LIST_URLS = List.of(SecurityConstant.PERMIT_ALL_URLS);

  /** PathMacher */
  private static final AntPathMatcher pathMatcher = new AntPathMatcher();


  /**
   * 요청이 들어올 때마다 호출되며, JWT 토큰을 검사하고 인증 정보를 설정
   * @param request
   * @param response
   * @param filterChain
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // 허용 URL 은 토큰 검증 안함
    for (String pattern : WHITE_LIST_URLS) {
      if (pathMatcher.match(pattern, request.getRequestURI())) {
        filterChain.doFilter(request, response);
        return;
      }
    }


    String token = resolveToken(request);

    if(StringUtils.hasText(token)) {
      if(tokenProvider.validateToken(token)) {
        // 토큰이 유효한 경우 인증 정보를 설정
        applyTokenAuthentication(token);
      } else if(tokenProvider.isExpired(token)) {
        // 토큰이 만료되었을 경우에 리프레시 토큰 시도
        logger.warn("만료된 JWT 토큰: {}", token);
        // TODO common-utils 여러 프로젝트에서 사용하는데, refreshToken 가져오는 방식은 각각 프로젝트에서 구현을 해야하는지
        // 기존 토큰을 이용해서 UserContext 조회
        UserContext userContext = tokenProvider.getUserContextAllowExpired(token);
        String refreshToken = refreshTokenFinder.findRefreshToken(userContext.getStaffId());

        // 리프레시 토큰이 존재하고 유효한 경우 새로운 액세스 토큰 발급
        if(StringUtils.hasText(refreshToken) && tokenProvider.validateToken(refreshToken)) {
          String newAccessToken = tokenProvider.reissueAccessToken(refreshToken);
          // 새로운 액세스 토큰이 발급되면 헤더에 설정하고 인증 정보 적용
          if (StringUtils.hasText(newAccessToken)) {
            logger.info("새로운 액세스 토큰 발급: {}", newAccessToken);
            // 새로운 토큰 헤더 응답
            response.setHeader(HttpHeaders.AUTHORIZATION, Constants.BEARER_PREFIX + newAccessToken);

            // 인증 설정
            applyTokenAuthentication(newAccessToken);
          } else {
            // 새로운 액세스 토큰 발급 실패
            logger.warn("새로운 액세스 토큰 발급 실패: {}", token);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
          }
        } else {
          // 리프레시 토큰이 없거나 유효하지 않은 경우
          logger.warn("유효하지 않은 리프레시 토큰: {}", refreshToken);
          response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
          return;
        }
      } else {
        // 유효하지 않은 JWT 토큰인 경우
        logger.warn("유효하지 않은 JWT 토큰: {}", token);
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return;
      }
    }

    // 다음 필터로 요청 전달
    filterChain.doFilter(request, response);
  }

  /**
   * JWT 토큰을 기반으로 인증 정보를 설정
   * @param token 토큰
   */
  private void applyTokenAuthentication(String token) {
    UserContext userContext = tokenProvider.getUserContext(token);
    if (userContext != null) {
      logger.info("JWT 인증 정보 설정: {}", userContext.getUsername());

      // UsernamePasswordAuthenticationToken 객체를 생성하여 인증 정보를 설정
      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());

      // SecurityContextHolder 인증 정보를 저장
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
  }

  /**
   * 요청 헤더에서 JWT 토큰 추출
   * @param request
   * @return JWT 토큰 문자열 또는 null
   */
  private String resolveToken(HttpServletRequest request) {
    // Authorization 헤더에서 Bearer 토큰을 추출
    String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

    // Bearer 접두사가 있는지 확인하고, 접두사를 제거 후 토큰 반환
    if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(Constants.BEARER_PREFIX)) {
      return bearerToken.substring(Constants.BEARER_PREFIX.length());
    }
    return null;
  }
}