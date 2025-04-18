package com.erp.staff_management_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
CreatedBy, LastModifiedBy 어노테이션을 사용하기 위해서
creatorId, updaterId 를 자동으로 넣어주는 클래스
 */
@Configuration
public class JpaAuditConfig {

  @Bean
  public AuditorAwareImpl auditorProvider() {
    return new AuditorAwareImpl();
  }
}
