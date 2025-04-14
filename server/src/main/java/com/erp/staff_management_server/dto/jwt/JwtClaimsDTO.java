package com.erp.staff_management_server.dto.jwt;
/*
저장 정보는 staff_id, institution_id, phone(로그인 id), auth_id(권한)
 */

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtClaimsDTO {

  private Long staffId;
  private String institutionId;
  private String authId;
}
