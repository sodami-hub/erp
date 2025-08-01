package com.erp.commonutil.util;

import com.erp.commonutil.config.security.UserContext;
import java.util.Collection;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Security 관련 유틸리티
 */
public class SecurityUtils {

  /**
   * 직원 번호 반환
   *
   * @return
   */
  public static Long getStaffId() {
    UserContext userContext = getContext();
    if (userContext == null) {
      return null;
    }

    return userContext.getStaffId();
  }

  /**
   * 직원 이름 반환
   *
   * @return 직원이름
   */
  public static String getName() {
    UserContext userContext = getContext();
    if (userContext == null) {
      return null;
    }

    return userContext.getName();
  }

  /**
   * 요양기관 번호 반환
   *
   * @return 요양기관 번호
   */
  public static String getInstitutionId() {
    UserContext userContext = getContext();
    if (userContext == null) {
      return null;
    }

    return userContext.getInstitutionId();
  }


  /**
   * 현재 로그인한 사용자의 전화번호(ID) 반환
   *
   * @return 전화번호(ID)
   */
  public static String getUserId() {
    UserContext userContext = getContext();
    if (userContext == null) {
      return null;
    }

    return userContext.getUsername();
  }

  /**
   * 현재 로그인한 사용자의 권한 목록 반환
   *
   * @return 권한 목록
   */
  public static Collection<? extends GrantedAuthority> getAuthorities() {
    UserContext userContext = getContext();
    if (userContext == null) {
      return null;
    }

    return userContext.getAuthorities();
  }

  /**
   * 현재 로그인한 사용자 정보 객체 반환
   *
   * @return UserContext 객체
   */
  private static UserContext getContext() {
    UserContext userContext = getUserContext();

    if (userContext == null) {
      return null;
    }
    return userContext;
  }

  /**
   * 현재 로그인한 사용자 정보 객체 반환
   *
   * @return
   */
  public static UserContext getUserContext() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // 인증 정보가 없거나 인증되지 않은 경우 null 반환
    if (authentication == null) {
      return null;
    }

    if (!authentication.isAuthenticated()) {
      return null;
    }

    // UserContext 인스턴스인 경우 반환 (AnonymousAuthentication 제외)
    if (authentication.getPrincipal() instanceof UserContext userContext) {
      return userContext;
    }

    // 인증 정보가 UserContext 아닌 경우 null 반환
    return null;
  }
}
