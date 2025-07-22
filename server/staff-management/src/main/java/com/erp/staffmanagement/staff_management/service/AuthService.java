package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.commonutil.jwt.dto.JwtClaimsDTO;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.dto.StaffInfoDTO;
import com.erp.staffmanagement.staff_management.entity.Staff;
import com.erp.staffmanagement.staff_management.repository.StaffRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final StaffRepository staffRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthService(StaffRepository staffRepository, JwtTokenProvider jwtTokenProvider) {
    this.staffRepository = staffRepository;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  // 로그인(Request) 정보와 DB에서 조회한 정보가 일치하는지 확인
  private boolean loginInfoCheck(LoginRequestDTO loginRequestDTO, StaffInfoDTO staffInfo) {
    return loginRequestDTO.getPassword().equals(staffInfo.getPassword())
        && loginRequestDTO.getInstitutionId().equals(staffInfo.getInstitutionId());
  }

  // 로그인 정보(id -> phone)를 가지고 DB에서 직원 정보 조회
  private StaffInfoDTO getStaffInfoByPhone(String phone) {
    Staff staff = staffRepository.getStaffIdByPhone(phone);
    if (staff == null) {
      return null;
    }
    return new StaffInfoDTO(staff);
  }

  // 토큰을 생성하고 생성한 토큰을 Authentication에 저장 및 토큰 반환
  private JwtToken genJwtToken(StaffInfoDTO staffInfo) {
    JwtClaimsDTO claims = new JwtClaimsDTO(staffInfo.getStaffId(), staffInfo.getInstitutionId(),
        staffInfo.getAuthId());
    return jwtTokenProvider.generateAccessToken(claims);
  }

  public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
    // 1.
    StaffInfoDTO staffInfo = getStaffInfoByPhone(loginRequestDTO.getId());
    if (staffInfo == null) {
      // 직원 정보가 존재하지 않음
      return new LoginResponseDTO(false, null, null, "로그인 정보를 확인해주세요.");
    }
    boolean check = loginInfoCheck(loginRequestDTO, staffInfo);
    if (!check) {
      // DB 정보와 로그인 정보가 일치하지 않음
      return new LoginResponseDTO(false, null, null, "로그인 정보를 확인해주세요.");
    }
    return new LoginResponseDTO(true, null, null, "로그인 성공");
  }


  public SignUpResponseDTO staffSignUp(SignUpRequestDTO signUpRequestDTO, String accessToken) {

    UserContext userContext = null;

    // 1. 토큰 검증 로직 -> 유효한지(유효하지 않으면 다시 로그인) // 직원등록 권한이 있는지
    if (jwtTokenProvider.validateToken(accessToken)) {
      userContext = jwtTokenProvider.getUserContext(accessToken);
      if (userContext.getAuthorities().contains("102")) {
        return new SignUpResponseDTO(false, null, "직원등록 권한이 없습니다.");
      }
    } else {
      return new SignUpResponseDTO(false, -1L, "토큰의 유효성 에러");
    }

    // 직원등록에 추가로 필요한 정보
    signUpRequestDTO.setInstitutionId(userContext.getInstitutionId());
    if (signUpRequestDTO.getWorkType().contains("센터장")) {
      signUpRequestDTO.setAuthId("101");  // 직종에 '센터장'이 있으면 권한코드 '101'
    } else {
      signUpRequestDTO.setAuthId("102"); // 기관관리자가 등록하는 직원의 권한코드 '102'
    }
    signUpRequestDTO.setRetireDate(null);

    // 2. 직원 등록 로직
    Staff newStaff = new Staff(signUpRequestDTO, userContext.getUsername());
    Staff staff = staffRepository.save(newStaff);
    return new SignUpResponseDTO(true, staff.getStaffId(), null);
  }
}
