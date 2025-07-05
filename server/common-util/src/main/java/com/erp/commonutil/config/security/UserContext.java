package com.erp.commonutil.config.security;

import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


/**
 * 사용자 정보를 담는 UserContext 클래스
 * Spring Security에서 인증된 사용자 정보를 담기 위해 사용.
 */
public class UserContext implements UserDetails {

    /** 직원번호 */
    private Long staffId;

    /** 요양기관번호 */
    private String institutionId;

    /** 전화번호(ID) */
    private String phone;

    /** 비밀번호 */
    private String password;

    /** 권한 */
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return phone;
    }

    public Long getStaffId() {
        return staffId;
    }

    public String getInstitutionId() {
        return institutionId;
    }

    @Builder
    public UserContext(
            Long staffId, String institutionId, String phone, String password, Collection<? extends GrantedAuthority> authorities
    ) {
        this.staffId = staffId;
        this.institutionId = institutionId;
        this.phone = phone;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public String toString() {
        return "UserContext{" +
                "staffId=" + staffId +
                ", institutionId='" + institutionId + '\'' +
                ", phone='" + phone + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}
