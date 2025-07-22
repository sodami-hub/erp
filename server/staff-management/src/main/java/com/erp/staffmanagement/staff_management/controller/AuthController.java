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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
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

  @PostMapping(value = "/auth/newToken/{userId}")
  public ResponseEntity<ApiResponse<JwtToken>> newToken(@PathVariable Long userId) {

    // 서버에 저장된 사용자의 refresh token 가져오기.
    String refreshToken = "userId 로 서버에 저장된 refreshToken 가져오기";

    if (!jwtTokenProvider.validateToken(refreshToken) || jwtTokenProvider.isExpired(refreshToken)) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST, "다시 로그인 해주세요."));
    }

    String newAccessToken = jwtTokenProvider.reissueAccessToken(refreshToken);

    // 새로운 리플레시 토큰 생성해서 서버에 저장??

    JwtToken newToken = new JwtToken("", newAccessToken, "");
    return ResponseEntity.ok(ApiResponse.success(newToken));
  }


  @PostMapping(value = "/auth/login")
  public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
      @RequestBody LoginRequestDTO loginRequestDTO) {
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

    LoginResponseDTO response = new LoginResponseDTO(true, token, roles);
    return ResponseEntity.ok(ApiResponse.success(response));
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
