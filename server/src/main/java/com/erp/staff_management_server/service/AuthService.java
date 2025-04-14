package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.LoginRequestDTO;
import com.erp.staff_management_server.dto.LoginResponseDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.erp.staff_management_server.repository.StaffRepository;
import com.erp.staff_management_server.util.jwt.JwtTokenProvider;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final StaffRepository staffRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthService(StaffRepository staffRepository, JwtTokenProvider jwtTokenProvider) {
    this.staffRepository = staffRepository;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  public LoginResponseDTO login(LoginRequestDTO loginRequestDTO, JwtToken jwtToken) {
    System.out.println(loginRequestDTO.getOrganizationId() + " / " + loginRequestDTO.getId());
    return new LoginResponseDTO(false, new JwtToken(null, null, null), "error");
    /*
    - 토큰 검증
    - RequestDTO를 통해서 로그인 정보 조회
    - 토큰에 저장된 staffId 와 RequestDTO를 통해서 조회한 정보가 동일한지 확인
    - 동일하다면 로그인 성공, 아니면 토큰 재전송(실패?)  => 일단 재전송으로 하자.
    - 리스폰스한 토큰을 AuthenticationManager에 저장
     */

    // 1. 토큰 검증

  }
}
