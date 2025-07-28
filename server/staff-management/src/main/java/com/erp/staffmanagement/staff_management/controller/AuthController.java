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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
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


  @PostMapping(value = "/auth/login")
  public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
      @RequestBody LoginRequestDTO loginRequestDTO) {

    /*
    authenticationManager는 내부적으로 authenticationProvider를 사용해 인증을 처리한다. 과정은 다음과 같다.

    SecurityConfig에서 authenticationManager를 Bean으로 등록할 때,
    builder.authenticationProvider(authenticationProvider())로 커스텀 AuthenticationProvider를 등록한다.

    AuthController의 login 메서드에서 authenticationManager.authenticate(...)를 호출하면,
    등록된 CustomAuthenticationProvider의 authenticate 메서드가 실행됩니다.

    CustomAuthenticationProvider는 전달받은 아이디/비밀번호로 UserDetailsService를 통해 사용자를 조회하고,
    비밀번호를 검증한 뒤 인증 객체를 반환합니다.

    즉, AuthenticationManager는 여러 AuthenticationProvider 중 적합한 것을 찾아 인증을 위임
    실제 인증 로직(아이디/비밀번호 확인)은 CustomAuthenticationProvider에서 처리하고, 인증 성공 시 인증된 사용자 정보가 반환됩니다.
    */
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

//      LoginResponseDTO resp = authService.login(loginRequestDTO);
//      if (!resp.isOk()) {
//        return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST, resp.getMessage()));
//      }
//      resp.setBody(token);
//      resp.setAuthCode(roles);
      return ResponseEntity.ok(
          ApiResponse.success(new LoginResponseDTO(true, token, roles, "login success")));
    } catch (AuthenticationException e) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage() + " // 로그인 정보를 확인해주세요."));
    }
  }

  @PostMapping(value = "/auth/signup", produces = "application/json")
  public ResponseEntity<ApiResponse<SignUpResponseDTO>> signup(
      @RequestBody SignUpRequestDTO signUpRequestDTO,
      @RequestHeader(value = "Authorization") String token
  ) {
    // 클라이언트에서 넘어오는 데이터 확인 완료
    System.out.println(signUpRequestDTO.toString());
    System.out.println(token);

    String accessToken = token.replace("Bearer ", "");
    SignUpResponseDTO signUpResponseDTO = authService.staffSignUp(signUpRequestDTO, accessToken);

    if (!signUpResponseDTO.isOk()) {
      return ResponseEntity.ok(
          ApiResponse.error(HttpStatus.BAD_REQUEST, signUpResponseDTO.getMessage()));
    }

    return ResponseEntity.ok(ApiResponse.success(signUpResponseDTO));
  }
}
