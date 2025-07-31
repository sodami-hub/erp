package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.config.security.RefreshTokenFinder;
import com.erp.staffmanagement.staff_management.entity.RefreshToken;
import com.erp.staffmanagement.staff_management.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomRefreshTokenFinder implements RefreshTokenFinder {
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public String findRefreshToken(Long staffId) {
        RefreshToken findRefreshToken = refreshTokenRepository.findByStaffIdAndRevoked(staffId, false);
        if(findRefreshToken != null) {
            return findRefreshToken.getRefreshToken();
        }
        return null;
    }
}
