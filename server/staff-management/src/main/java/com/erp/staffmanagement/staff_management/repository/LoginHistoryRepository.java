package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
}
