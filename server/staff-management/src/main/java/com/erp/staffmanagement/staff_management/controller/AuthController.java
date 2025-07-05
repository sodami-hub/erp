package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.Constants;
import com.erp.commonutil.config.security.UserContext;
import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.staffmanagement.staff_management.dto.LoginRequestDTO;
import com.erp.staffmanagement.staff_management.dto.LoginResponseDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SignUpResponseDTO;
import com.erp.staffmanagement.staff_management.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

  private final AuthService authService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
    this.authService = authService;
      this.authenticationManager = authenticationManager;
      this.jwtTokenProvider = jwtTokenProvider;
  }

  @PostMapping(value = "/auth/login")
  public ResponseEntity<LoginResponseDTO> login(
      @RequestBody LoginRequestDTO loginRequestDTO) {
    Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequestDTO.getId(), loginRequestDTO.getPassword())
    );

    UserContext userContext = (UserContext) authenticate.getPrincipal();
    String accessToken = jwtTokenProvider.generateAccessToken(userContext);
    String refreshToken = jwtTokenProvider.generateRefreshToken(userContext);

    JwtToken token = JwtToken.builder().
            grantType(Constants.BEARER_PREFIX.trim())
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();

    Collection<? extends GrantedAuthority> authorities = userContext.getAuthorities();

    String roles = authorities.stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

    return ResponseEntity.ok(new LoginResponseDTO(true, token, roles, null));
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
