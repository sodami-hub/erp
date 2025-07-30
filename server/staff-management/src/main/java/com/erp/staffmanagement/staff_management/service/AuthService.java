package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.config.security.UserContext;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.entity.Staff;
import com.erp.staffmanagement.staff_management.repository.StaffRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final StaffRepository staffRepository;

  public AuthService(StaffRepository staffRepository) {
    this.staffRepository = staffRepository;
  }

  public SignUpResponseDTO staffSignUp(SignUpRequestDTO signUpRequestDTO) {

    UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal();

    signUpRequestDTO.setInstitutionId(userContext.getInstitutionId());
    if (signUpRequestDTO.getWorkType().contains("센터장")) {
      signUpRequestDTO.setAuthId("101");  // 직종에 '센터장'이 있으면 권한코드 '101'
    } else {
      signUpRequestDTO.setAuthId("102"); // 기관관리자가 등록하는 직원의 권한코드 '102'
    }
    signUpRequestDTO.setRetireDate(null);

    // 2. 직원 등록 로직
    Staff newStaff = new Staff(signUpRequestDTO, userContext.getStaffId());
    Staff staff = staffRepository.save(newStaff);
    return new SignUpResponseDTO(true, staff.getStaffId(), null);
  }
}
