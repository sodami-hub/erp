package com.erp.beneficiarymanagement.beneficiary_management.service;

import com.erp.commonutil.config.security.RefreshTokenFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomRefreshTokenFinder implements RefreshTokenFinder {

  @Override
  public String findRefreshToken(Long staffId) {
    return "";
  }
}
