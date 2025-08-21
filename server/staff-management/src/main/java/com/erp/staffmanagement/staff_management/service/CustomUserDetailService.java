package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.config.security.UserContext;
import com.erp.staffmanagement.staff_management.entity.Staff;
import com.erp.staffmanagement.staff_management.repository.StaffRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 사용자 정보 조회
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

  private final StaffRepository staffRepository;

  @Override
  public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
    Staff staff = staffRepository.getStaffIdByPhone(phoneNumber);

    if (staff == null) {
      // TODO 에러코드 변경
      throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: ID(전화번호) - " + phoneNumber);
    }

    //TODO 권한 설정
    List<GrantedAuthority> roles = new ArrayList<>();
    roles.add(new SimpleGrantedAuthority(staff.getAuthId()));

    return UserContext.builder()
        .staffId(staff.getStaffId())
        .name(staff.getName())
        .institutionId(staff.getInstitutionId())
        .phone(staff.getPhone())
        .password(staff.getPassword())
        .authorities(roles)
        .build();
  }
}
