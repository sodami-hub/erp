package com.erp.staff_management_server.config;

import com.erp.staff_management_server.dto.jwt.JwtClaimsDTO;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public class AuditorAwareImpl implements AuditorAware<Long> {

  @Override
  public Optional<Long> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new IllegalStateException("인증되지 않은 사용자입니다.");
    }

    Object principal = authentication.getPrincipal();

    if (principal instanceof JwtClaimsDTO jwtClaimsDTO) {
      return Optional.of(jwtClaimsDTO.getStaffId());
    }

    return Optional.empty();
  }
}
