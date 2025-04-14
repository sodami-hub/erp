package com.erp.staff_management_server.controller;

import com.erp.staff_management_server.dto.LoginRequestDTO;
import com.erp.staff_management_server.dto.LoginResponseDTO;
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

  @PostMapping("/auth/login")
  public ResponseEntity<LoginResponseDTO> login(
      @RequestBody LoginRequestDTO loginRequestDTO,
      @RequestHeader(value = "Authorization", required = false) JwtToken jwtToken) {
    LoginResponseDTO responseDTO = authService.login(loginRequestDTO, jwtToken);
    return ResponseEntity.ok(responseDTO);
  }

}
