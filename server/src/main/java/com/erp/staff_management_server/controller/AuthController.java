package com.erp.staff_management_server.controller;

import com.erp.staff_management_server.dto.LoginRequestDTO;
import com.erp.staff_management_server.dto.LoginResponseDTO;
import com.erp.staff_management_server.dto.SignUpRequestDTO;
import com.erp.staff_management_server.dto.SignUpResponseDTO;
import com.erp.staff_management_server.dto.jwt.JwtToken;
import com.erp.staff_management_server.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping(value = "/auth/login", produces = "application/json")
  public ResponseEntity<LoginResponseDTO> login(
      @RequestBody LoginRequestDTO loginRequestDTO,
      @RequestHeader(value = "Authorization", required = false) JwtToken jwtToken) {
    LoginResponseDTO loginResponseDTO = authService.login(loginRequestDTO, jwtToken);
    return ResponseEntity.ok(loginResponseDTO);
  }

  @PostMapping(value = "/auth/signup", produces = "application/json")
  public ResponseEntity<SignUpResponseDTO> signup(
      @RequestBody SignUpRequestDTO signUpRequestDTO,
      @RequestHeader(value = "Authorization", required = true) JwtToken jwtToken
  ) {
    // 클라이언트에서 넘어오는 데이터 확인 완료
    System.out.println(signUpRequestDTO.toString());
    System.out.println(jwtToken.toString());

    // 클라이언트로 넘겨주는 데이터 확인 완료
    SignUpResponseDTO signUpResponseDTO = new SignUpResponseDTO(true, 1L, null);
    return ResponseEntity.ok(signUpResponseDTO);
  }
}
