package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.service.AuthService;
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
      @RequestHeader(value = "Authorization") JwtToken jwtToken
  ) {
    // 클라이언트에서 넘어오는 데이터 확인 완료
    System.out.println(signUpRequestDTO.toString());
    System.out.println(jwtToken.toString());

    SignUpResponseDTO signUpResponseDTO = authService.staffSignUp(signUpRequestDTO, jwtToken);

    return ResponseEntity.ok(signUpResponseDTO);
  }
}
