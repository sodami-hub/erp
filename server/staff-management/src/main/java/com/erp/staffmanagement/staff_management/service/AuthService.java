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
import java.util.Objects;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final StaffRepository staffRepository;
  private final LoginAuditService loginAuditService;
  private final JwtTokenProvider jwtTokenProvider;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;

  @Transactional
  public LoginResponseDTO login(LoginRequestDTO loginRequest) {
    Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPassword())
    );

    UserContext userContext = (UserContext) authenticate.getPrincipal();
    return loginAuditService.recordSuccessLogin(userContext);
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

  public LoginResponseDTO login(LoginRequestDTO loginRequestDTO, JwtToken jwtToken) {
    // 1.
    StaffInfoDTO staffInfo = getStaffInfoByPhone(loginRequestDTO.getId());
    if (staffInfo == null) {
      // 직원 정보가 존재하지 않음
      return new LoginResponseDTO(null, null);
    }
    boolean check = loginInfoCheck(loginRequestDTO, staffInfo);
    if (!check) {
      // DB 정보와 로그인 정보가 일치하지 않음
      return new LoginResponseDTO( null, null);
    }

    // 2. 로그인 정보와 DB에서 조회한 정보가 일치하는 경우
    if (jwtToken == null) {
      //클라이언트에 토큰이 없다. 토큰을 새로 생성해서 전달한다.
      System.out.println("로그인 정보와 DB에서 조회한 정보가 일치하지만 토큰이 없습니다. 토큰을 생성합니다.");
      JwtToken token = genJwtToken(staffInfo);
      return new LoginResponseDTO(token, staffInfo.getAuthId());
    } else {
      // 토큰이 있는 경우 토큰의 유효성 확인 및 토큰의 정보와 로그인 정보가 같은지 확인
      System.out.println("로그인 정보와 DB에서 조회한 정보가 일치하고 토큰이 있습니다. 토큰을 확인합니다.");
      boolean valid = jwtTokenProvider.validateToken(jwtToken.getAccessToken());
      if (!valid) {
        // 만료된 토큰인 경우 - 다시 생성해서 전달
        System.out.println("토큰이 만료되었습니다. 새로운 토큰을 생성합니다.");
        JwtToken token = genJwtToken(staffInfo);
        return new LoginResponseDTO(token, staffInfo.getAuthId());
      } else {
        // 유효한 토큰인 경우 - 토큰의 정보와 로그인 정보를 비교한다.
        System.out.println("토큰이 유효합니다. 토큰의 정보를 확인합니다.");
        JwtClaimsDTO claims = jwtTokenProvider.getClaims(jwtToken.getAccessToken());
        if (Objects.equals(claims.getStaffId(), staffInfo.getStaffId())) {
          // 토큰의 정보와 로그인 정보가 같은 경우
          System.out.println("토큰의 정보와 로그인 정보가 같습니다. 로그인 성공.");
          return new LoginResponseDTO(jwtToken, staffInfo.getAuthId());
        } else {
          // 토큰의 정보와 로그인 정보가 다른 경우 - 다시 생성해서 전달
          System.out.println("토큰의 정보와 로그인 정보가 다릅니다. 새로운 토큰을 생성합니다.");
          JwtToken token = genJwtToken(staffInfo);
          return new LoginResponseDTO(token, staffInfo.getAuthId());
        }
      }
    }
  }


  public SignUpResponseDTO staffSignUp(SignUpRequestDTO signUpRequestDTO, JwtToken jwtToken) {

    UserContext userContext = null;

    // 1. 토큰 검증 로직 -> 유효한지(유효하지 않으면 다시 로그인) // 직원등록 권한이 있는지
    if (jwtTokenProvider.validateToken(jwtToken.getAccessToken())) {
      //jwtClaimsDTO = jwtTokenProvider.getClaims(jwtToken.getAccessToken());
      userContext = jwtTokenProvider.getUserContext(jwtToken.getAccessToken());
      if (userContext.getAuthorities().contains("102")) {
        return new SignUpResponseDTO(false, null, "직원등록 권한이 없습니다.");
      }
    } else {
      return new SignUpResponseDTO(false, null, "사용자 인증이 만료됐습니다. 다시 로그인해주세요.");
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
    Staff newStaff = new Staff(signUpRequestDTO, userContext.getUsername());
    Staff staff = staffRepository.save(newStaff);
    return new SignUpResponseDTO(true, staff.getStaffId(), null);
  }
}
