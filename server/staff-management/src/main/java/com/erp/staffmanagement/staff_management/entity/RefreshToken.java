package com.erp.staffmanagement.staff_management.entity;

import com.erp.commonutil.jpa.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "refresh_token")
public class RefreshToken extends BaseEntity {

    @Id
    @Column(name = "refresh_token_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenId;

    @Column(name = "staff_id", nullable = false)
    private Long staffId;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "issued_at", nullable = false)
    private LocalDateTime issuedAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "revoked", nullable = false)
    private Boolean revoked = false;

    public RefreshToken() {}

    @Builder
    public RefreshToken(
            Long staffId, String refreshToken, String userAgent, String ipAddress, LocalDateTime issuedAt, LocalDateTime expiresAt, Boolean revoked
    ) {
        this.staffId = staffId;
        this.refreshToken = refreshToken;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
        this.revoked = revoked;
    }

    public void updateRefreshToken(String refreshToken, LocalDateTime issuedAt, LocalDateTime expiresAt) {
        this.refreshToken = refreshToken;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
        this.revoked = false;

    }
}
