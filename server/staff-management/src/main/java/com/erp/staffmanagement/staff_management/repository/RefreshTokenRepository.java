package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByStaffId(Long staffId);

    RefreshToken findByStaffIdAndRevoked(Long staffId, boolean revoked);
}
