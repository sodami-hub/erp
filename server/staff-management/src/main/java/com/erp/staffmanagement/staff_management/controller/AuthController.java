package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.response.ApiResponse;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

  private final AuthService authService;

  @PostMapping(value = "/auth/login")
  public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
      @RequestBody LoginRequestDTO loginRequestDTO) {

    try {
      LoginResponseDTO loginResponseDTO = authService.login(loginRequestDTO);
      if (!loginResponseDTO.isOk()) {
        return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST,
            "로그인 실패 // " + loginResponseDTO.getMessage()));
      }
      return ResponseEntity.ok(ApiResponse.success(loginResponseDTO));
    } catch (AuthenticationException e) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, "로그인 실패 // " + e.getMessage()));
    }
  }

  @PostMapping(value = "/auth/signup", produces = "application/json")
  public ResponseEntity<ApiResponse<SignUpResponseDTO>> signup(
      @RequestBody SignUpRequestDTO signUpRequestDTO
  ) {

    SignUpResponseDTO signUpResponseDTO = authService.staffSignUp(signUpRequestDTO);

    if (!signUpResponseDTO.isOk()) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, signUpResponseDTO.getMessage()));
    }

    return ResponseEntity.ok(ApiResponse.success(signUpResponseDTO));
  }
}
