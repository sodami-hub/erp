package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.LoginRequestDTO;
import com.erp.staff_management_server.dto.LoginResponseDTO;
import com.erp.staff_management_server.dto.StaffInfoDTO;
import com.erp.staff_management_server.dto.jwt.JwtClaimsDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.erp.staff_management_server.entity.Staff;
import com.erp.staff_management_server.repository.StaffRepository;
import com.erp.staff_management_server.util.jwt.JwtTokenProvider;
import java.util.Objects;
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

  private StaffInfoDTO getStaffInfoByPhone(String phone) {
    Staff staff = staffRepository.getStaffIdByPhone(phone);
    if (staff == null) {
      return null;
    }
    return new StaffInfoDTO(staff);
  }

  // 토큰을 생성하고 생성한 토큰을 Authentication에 저장
  private JwtToken genJwtToken(StaffInfoDTO staffInfo) {
    JwtClaimsDTO claims = new JwtClaimsDTO(staffInfo.getStaffId(), staffInfo.getInstitutionId(),
        staffInfo.getAuthId());
    JwtToken token = jwtTokenProvider.generateToken(claims);
    jwtTokenProvider.saveAuth(claims);
    return token;
  }

  public LoginResponseDTO login(LoginRequestDTO loginRequestDTO, JwtToken jwtToken) {
    // 1.
    StaffInfoDTO staffInfo = getStaffInfoByPhone(loginRequestDTO.getId());
    if (staffInfo == null) {
      // 직원 정보가 존재하지 않음
      return new LoginResponseDTO(false, null, "로그인 정보를 확인해주세요.");
    }
    boolean check = loginInfoCheck(loginRequestDTO, staffInfo);
    if (!check) {
      // DB 정보와 로그인 정보가 일치하지 않음
      return new LoginResponseDTO(false, null, "로그인 정보를 확인해주세요.");
    }

    // 2. 로그인 정보와 DB에서 조회한 정보가 일치하는 경우
    if (jwtToken == null) {
      //토큰을 생성해서 전달
      System.out.println("로그인 정보와 DB에서 조회한 정보가 일치하지만 토큰이 없습니다. 토큰을 생성합니다.");
      JwtToken token = genJwtToken(staffInfo);
      return new LoginResponseDTO(true, token, null);
    } else {
      // 토큰이 있는 경우 토큰의 유효성 확인 및 토큰의 정보와 로그인 정보가 같은지 확인
      System.out.println("로그인 정보와 DB에서 조회한 정보가 일치하고 토큰이 있습니다. 토큰을 확인합니다.");
      boolean valid = jwtTokenProvider.validateToken(jwtToken.getAccessToken());
      if (!valid) {
        // 만료된 토큰인 경우 - 다시 생성해서 전달
        System.out.println("토큰이 만료되었습니다. 새로운 토큰을 생성합니다.");
        JwtToken token = genJwtToken(staffInfo);
        return new LoginResponseDTO(true, token, null);
      } else {
        // 유효한 토큰인 경우 - 토큰의 정보와 로그인 정보를 비교한다.
        System.out.println("토큰이 유효합니다. 토큰의 정보를 확인합니다.");
        JwtClaimsDTO claims = jwtTokenProvider.getClaims(jwtToken.getAccessToken());
        if (Objects.equals(claims.getStaffId(), staffInfo.getStaffId())) {
          // 토큰의 정보와 로그인 정보가 같은 경우
          System.out.println("토큰의 정보와 로그인 정보가 같습니다. 로그인 성공.");
          jwtTokenProvider.saveAuth(claims);
          return new LoginResponseDTO(true, jwtToken, null);
        } else {
          // 토큰의 정보와 로그인 정보가 다른 경우 - 다시 생성해서 전달
          System.out.println("토큰의 정보와 로그인 정보가 다릅니다. 새로운 토큰을 생성합니다.");
          JwtToken token = genJwtToken(staffInfo);
          return new LoginResponseDTO(true, token, null);
        }
      }
    }

  }


}
