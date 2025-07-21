package com.erp.commonutil.config.security;

public interface RefreshTokenFinder {
    String findRefreshToken(Long staffId);
}
