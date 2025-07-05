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
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

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
        String token = resolveToken(request);

        if(StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            // 토큰이 유효한 경우 인증 정보를 설정
            UserContext userContext = tokenProvider.getUserContext(token);
            if (userContext != null) {
                logger.info("JWT 인증 정보 설정: {}", userContext.getUsername());

                // UsernamePasswordAuthenticationToken 객체를 생성하여 인증 정보를 설정 (패스워드는 필요 없음)
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());

                // SecurityContextHolder에 인증 정보를 저장
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
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