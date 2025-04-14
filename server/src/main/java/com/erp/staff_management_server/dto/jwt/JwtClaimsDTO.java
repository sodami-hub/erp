package com.erp.staff_management_server.dto.jwt;
/*
저장 정보는 staff_id, institution_id, phone(로그인 id), auth_id(권한)
 */

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtClaimsDTO {

  private int staffId;
  private String institutionId;
  private String authId;
}
