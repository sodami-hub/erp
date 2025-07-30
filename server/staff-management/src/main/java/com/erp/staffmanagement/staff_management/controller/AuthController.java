package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.Constants;
import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.commonutil.response.ApiResponse;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.service.AuthService;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthController(AuthService authService, AuthenticationManager authenticationManager,
      JwtTokenProvider jwtTokenProvider) {
    this.authService = authService;
    this.authenticationManager = authenticationManager;
    this.jwtTokenProvider = jwtTokenProvider;
  }


  @PostMapping(value = "/auth/login")
  public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
      @RequestBody LoginRequestDTO loginRequestDTO) {

    try {
      Authentication authenticate = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequestDTO.getId(),
              loginRequestDTO.getPassword())
      );

      UserContext userContext = (UserContext) authenticate.getPrincipal();

      String accessToken = jwtTokenProvider.generateAccessToken(userContext);

      String refreshToken = jwtTokenProvider.generateRefreshToken(userContext);  // 서버 DB에 저장 및 관리

      JwtToken token = JwtToken.builder()
          .grantType(Constants.BEARER_PREFIX.trim())
          .accessToken(accessToken)
          .refreshToken(refreshToken)
          .build();

      Collection<? extends GrantedAuthority> authorities = userContext.getAuthorities();

      String roles = authorities.stream()
          .filter(Objects::nonNull)
          .map(GrantedAuthority::getAuthority)
          .collect(Collectors.joining(","));

      return ResponseEntity.ok(
          ApiResponse.success(new LoginResponseDTO(true, token, roles, "login success")));
    } catch (AuthenticationException e) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage() + " // 로그인 정보를 확인해주세요."));
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
