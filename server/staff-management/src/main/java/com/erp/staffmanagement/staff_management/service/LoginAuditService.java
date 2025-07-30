package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.Constants;
import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.commonutil.util.HttpUtils;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.entity.LoginHistory;
import com.erp.staffmanagement.staff_management.entity.RefreshToken;
import com.erp.staffmanagement.staff_management.repository.LoginHistoryRepository;
import com.erp.staffmanagement.staff_management.repository.RefreshTokenRepository;
import com.erp.staffmanagement.staff_management.repository.data.LoginStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoginAuditService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.refresh-token-validity-seconds}")
    private long refreshTokenValiditySeconds;

    public LoginResponseDTO recordSuccessLogin(UserContext userContext) {
        Instant issuedAt = Instant.now();
        Instant expiredAt = issuedAt.plus(refreshTokenValiditySeconds, ChronoUnit.SECONDS);

        JwtToken jwtToken = getJwtToken(userContext, issuedAt, expiredAt);
        RefreshToken findRefreshToken = refreshTokenRepository.findByStaffId(userContext.getStaffId());

        LocalDateTime issuedAtLocalTime = LocalDateTime.ofInstant(issuedAt, ZoneId.of("Asia/Seoul"));
        LocalDateTime expiredAtLocalTime = LocalDateTime.ofInstant(expiredAt, ZoneId.of("Asia/Seoul"));

        // 기존 리프레시 토큰이 존재하면 업데이트
        if(findRefreshToken != null) {
            findRefreshToken.updateRefreshToken(jwtToken.getRefreshToken(), issuedAtLocalTime, expiredAtLocalTime);
            refreshTokenRepository.save(findRefreshToken);
        } else {
            RefreshToken refreshTokenEntity = RefreshToken.builder()
                    .staffId(userContext.getStaffId())
                    .refreshToken(jwtToken.getRefreshToken())
                    .userAgent(HttpUtils.getRequestBrowser())
                    .ipAddress(HttpUtils.getRequestIp())
                    .issuedAt(issuedAtLocalTime)
                    .expiresAt(expiredAtLocalTime)
                    .revoked(false)
                    .build();

            refreshTokenRepository.save(refreshTokenEntity);
        }

        Collection<? extends GrantedAuthority> authorities = userContext.getAuthorities();

        String roles = authorities.stream()
                .filter(Objects::nonNull)
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        LoginHistory history = LoginHistory.builder()
                        .staffId(userContext.getStaffId())
                        .loginAt(issuedAtLocalTime)
                        .status(LoginStatus.SUCCESS)
                    .build();

        loginHistoryRepository.save(history);

        return new LoginResponseDTO(jwtToken, roles);
    }

    private JwtToken getJwtToken(UserContext userContext, Instant issuedAt, Instant expiredAt) {
        String accessToken = jwtTokenProvider.generateAccessToken(userContext);
        String refreshToken = jwtTokenProvider.generateRefreshToken(userContext, issuedAt, expiredAt);

        return JwtToken.builder()
                    .grantType(Constants.BEARER_PREFIX.trim())
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                .build();
    }
}
