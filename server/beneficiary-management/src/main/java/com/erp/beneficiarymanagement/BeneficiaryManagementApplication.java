package com.erp.beneficiarymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@ComponentScan(basePackages = {"com.erp"})
public class BeneficiaryManagementApplication {

  public static void main(String[] args) {
    System.out.println("수급자 관리 서버");
    SpringApplication.run(BeneficiaryManagementApplication.class, args);
  }
}
