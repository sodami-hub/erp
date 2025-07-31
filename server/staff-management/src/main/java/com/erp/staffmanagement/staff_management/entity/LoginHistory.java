package com.erp.staffmanagement.staff_management.entity;

import com.erp.commonutil.jpa.BaseEntity;
import com.erp.staffmanagement.staff_management.repository.data.LoginStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "login_history")
public class LoginHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_history_id")
    private Long loginHistoryId;

    @Column(name = "staff_id")
    private Long staffId;

    @Enumerated(value = jakarta.persistence.EnumType.STRING)
    @Column(name = "status", nullable = false, length = 10)
    private LoginStatus status; // 예: SUCCESS, FAIL

    @Column(name = "login_at", nullable = false)
    private LocalDateTime loginAt = LocalDateTime.now();

    public LoginHistory() {
    }

    @Builder
    public LoginHistory(Long staffId, LoginStatus status, LocalDateTime loginAt) {
        this.staffId = staffId;
        this.status = status;
        this.loginAt = loginAt;
    }
}
