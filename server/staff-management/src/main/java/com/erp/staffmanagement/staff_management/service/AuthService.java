package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.config.security.UserContext;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.entity.Staff;
import com.erp.staffmanagement.staff_management.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final StaffRepository staffRepository;
  private final LoginAuditService loginAuditService;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  @Transactional
  public LoginResponseDTO login(LoginRequestDTO loginRequest) {
    try {
      Authentication authenticate = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPassword())
      );

      UserContext userContext = (UserContext) authenticate.getPrincipal();
      LoginResponseDTO loginResponseDTO = loginAuditService.recordSuccessLogin(userContext);
      loginResponseDTO.setOk(true);
      return loginResponseDTO;
    } catch (Exception e) {
      return new LoginResponseDTO(false, null, null, e.getMessage());
    }
  }


  public SignUpResponseDTO staffSignUp(SignUpRequestDTO signUpRequestDTO) {
    UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal();
    if (userContext.getAuthorities().contains("102")) {
      return new SignUpResponseDTO(false, null, "직원등록 권한이 없습니다.");
    }

    signUpRequestDTO.setPassword(passwordEncoder.encode(signUpRequestDTO.getPassword()));

    // 직원등록에 추가로 필요한 정보
    signUpRequestDTO.setInstitutionId(userContext.getInstitutionId());
    if (signUpRequestDTO.getWorkType().contains("센터장")) {
      signUpRequestDTO.setAuthId("101");  // 직종에 '센터장'이 있으면 권한코드 '101'
    } else {
      signUpRequestDTO.setAuthId("102"); // 기관관리자가 등록하는 직원의 권한코드 '102'
    }
    signUpRequestDTO.setRetireDate(null);

    // 2. 직원 등록 로직
    Staff newStaff = new Staff(signUpRequestDTO);
    Staff staff = staffRepository.save(newStaff);
    return new SignUpResponseDTO(true, staff.getStaffId(), null);
  }
}
