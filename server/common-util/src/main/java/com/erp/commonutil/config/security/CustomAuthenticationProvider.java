package com.erp.commonutil.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 사용자 정의 인증 프로바이더
 * UsernamePasswordAuthenticationToken을 사용하여 인증 처리.
 */
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    /**
     * 인증 처리 메소드
     * @param authentication Authentication
     * @return Authentication
     * @throws AuthenticationException
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userId = authentication.getName();
        String password = (String) authentication.getCredentials();

        UserContext userContext = (UserContext) userDetailsService.loadUserByUsername(userId);

        if(!passwordEncoder.matches(password, userContext.getPassword())) {
            throw new BadCredentialsException("잘못된 비밀번호입니다.");
        }

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userContext, password, userContext.getAuthorities());
        token.setDetails(userContext);

        return token;
    }

    /**
     * 지원하는 인증 타입을 지정 (UsernamePasswordAuthenticationToken)
     * @param authentication
     * @return 지원여부
     */
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
