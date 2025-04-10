package com.erp.staff_management_server.util;
import com.erp.staff_management_server.dto.jwt.JwtClaimsDTO;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Optional;




public class AuditorAwareImpl implements AuditorAware<Integer> {

    @Override
    public Optional<Integer> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof JwtClaimsDTO jwtClaimsDTO) {
            return Optional.of(jwtClaimsDTO.getStaffId());
        }

        return Optional.empty();
    }
}
