package com.erp.commonutil.config;

import com.erp.commonutil.config.security.CustomAuthenticationEntryPoint;
import com.erp.commonutil.config.security.CustomAuthenticationProvider;
import com.erp.commonutil.config.security.JwtAuthenticationFilter;
import com.erp.commonutil.config.security.RefreshTokenFinder;
import com.erp.commonutil.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Spring Security 설정
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  /**
   * Security 제외 URL 목록
   */
  private static final String[] PERMIT_ALL_PATHS = {"/staff/commonCodeList", "/auth/login"};

  /**
   * JWT Token
   */
  private final JwtTokenProvider jwtTokenProvider;

  /**
   * 사용자 인증
   */
  private final UserDetailsService userDetailsService;

  /**
   * 인증 실패
   */
  private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

  /** 리프레시 토큰 finder */
  private final RefreshTokenFinder refreshTokenFinder;

  /**
   * SecurityFilterChain 등록
   *
   * @param http HttpSecurity
   * @return SecurityFilterChain
   * @throws Exception
   */
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //TODO 인증 성공/실패에 대한 추가적인 처리 필요
    http
        .authorizeHttpRequests(authorize -> {
          authorize.requestMatchers(PERMIT_ALL_PATHS).permitAll();
          authorize.anyRequest().authenticated();
        })
        .exceptionHandling(exception ->
            exception.authenticationEntryPoint(customAuthenticationEntryPoint)
        )
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용 안함
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화
        .addFilterBefore(jwtAuthenticationFilter(),
            UsernamePasswordAuthenticationFilter.class); // JWT 인증 필터 추가
    return http.build();
  }

  /**
   * JWT 인증 필터 Bean 등록
   *
   * @return JwtAuthenticationFilter
   */
  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter(jwtTokenProvider, refreshTokenFinder);
  }

  /**
   * 사용자 인증 Provider 등록
   *
   * @return AuthenticationProvider
   */
  @Bean
  public AuthenticationProvider authenticationProvider() {
    return new CustomAuthenticationProvider(passwordEncoder(), userDetailsService);
  }

  /**
   * AuthenticationManager 설정
   *
   * @param http
   * @return
   * @throws Exception
   */
  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
    builder.authenticationProvider(authenticationProvider());
    return builder.build();
  }

  /**
   * 비밀번호 암호화 등록
   *
   * @return PasswordEncoder
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * CORS 설정
   *
   * @return CorsConfigurationSource
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:3000"); // 허용할 Origin
    configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
    configuration.addAllowedHeader("*"); // 모든 헤더 허용
    configuration.setAllowCredentials(true); // 자격 증명 허용

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 설정 적용
    return source;
  }
}
