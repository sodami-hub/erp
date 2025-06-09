package com.erp.commonutil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.erp")
public class CommonUtilApplication {

  public static void main(String[] args) {
    SpringApplication.run(CommonUtilApplication.class, args);
  }
}
