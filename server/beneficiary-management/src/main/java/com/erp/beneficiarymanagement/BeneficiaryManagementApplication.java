package com.erp.beneficiarymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BeneficiaryManagementApplication {

  public static void main(String[] args) {
    System.out.println("welcome to my-server");
    SpringApplication.run(BeneficiaryManagementApplication.class, args);
  }

}
