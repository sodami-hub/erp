package com.erp.server.staff_management.controller;

import static com.erp.server.util.DateFormatUtil.formatter;

import com.erp.server.util.DateTimeUtil;
import java.time.LocalDateTime;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {

  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  // utility 클래스 및 기타 클래스들의 동작을 확인하기 위한 테스트용 컨트롤러
  @GetMapping("/utiltest")
  public String home() {

    // 현재 UTC 시간
    LocalDateTime now = DateTimeUtil.nowFromZone();
    String time = now.format(formatter);

    // 비밀번호 인코딩
    String pw = "5678";
    String encodedPw = encoder.encode(pw);

    // SecurityContextHolder 에 Authentication 객체를 넣어준다.
    Authentication auth = new UsernamePasswordAuthenticationToken(pw, null, null);
    SecurityContextHolder.getContext().setAuthentication(auth);

    // SecurityContextHolder 에서 Authentication 객체를 가져온다.
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String principal = (String) authentication.getPrincipal();

    return "UTC time(asia/seoul) : " + time + "<br> encoded p/w : " + encodedPw + "<br> principal: "
        + principal;
  }
}
