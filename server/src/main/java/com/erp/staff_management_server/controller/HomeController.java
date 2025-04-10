package com.erp.staff_management_server.controller;

import com.erp.staff_management_server.util.DateTimeUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

import static com.erp.staff_management_server.util.DateFormatUtil.formatter;


@RestController
public class HomeController {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // UTC 시간 가져오기 test
    @GetMapping("/")
    public String home() {
        LocalDateTime now = DateTimeUtil.nowFromZone();

        String pw = "12345";
        String encodedPw = encoder.encode(pw);


        return "UTC time(asia/seoul) : " + now.format(formatter) +"<br> encoded p/w : "+encodedPw;
    }
}
