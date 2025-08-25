package com.erp.beneficiarymanagement;

import jakarta.annotation.PostConstruct;
import java.io.File;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@ComponentScan(basePackages = {"com.erp"})
public class BeneficiaryManagementApplication {

  @PostConstruct
  public void started() {
    // timezone UTC 셋팅 -> 이걸 여기서 세팅하면 클라이언트의 시간과 차이가 발생하는데?? 흠...
    //TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

    String dependentDocumentDirPath = "docs/beneficiary/attachedFile/recognitionDocuments";
    File directory = new File(dependentDocumentDirPath);
    if (!directory.exists()) {
      boolean check = directory.mkdirs();
      if (!check) {
        throw new RuntimeException("Failed to create directory: " + dependentDocumentDirPath);
      }
    }
  }

  public static void main(String[] args) {
    System.out.println("수급자 관리 서버");
    SpringApplication.run(BeneficiaryManagementApplication.class, args);
  }
}
