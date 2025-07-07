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

        if(StringUtils.hasText(token)) {
            if(tokenProvider.validateToken(token)) {
                // 토큰이 유효한 경우 인증 정보를 설정
                applyTokenAuthentication(token);
            } else if(tokenProvider.isExpired(token)) {
                // 토큰이 만료되었을 경우에 리프레시 토큰 시도
                logger.warn("만료된 JWT 토큰: {}", token);
                // TODO 리프레시 토큰을 데이터베이스에 저장 할지? 일단 헤더에 리프레스 토큰을 받는다고 생각하고 코딩 진행
                String refreshToken = request.getHeader(Constants.REFRESH_TOKEN_HEADER);

                if(StringUtils.hasText(refreshToken) && tokenProvider.validateToken(refreshToken)) {
                    String newAccessToken = tokenProvider.reissueAccessToken(token);
                    if (StringUtils.hasText(newAccessToken)) {
                        logger.info("새로운 액세스 토큰 발급: {}", newAccessToken);
                        // 새로운 토큰 헤더 응답
                        response.setHeader(HttpHeaders.AUTHORIZATION, Constants.BEARER_PREFIX + newAccessToken);

                        // 인증 설정
                        applyTokenAuthentication(newAccessToken);
                    } else {
                        logger.warn("새로운 액세스 토큰 발급 실패: {}", token);
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                        return;
                    }
                } else {
                    logger.warn("유효하지 않은 리프레시 토큰: {}", refreshToken);
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            } else {
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