package com.erp.staff_management_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class LoginRequestDTO {

  private String organizationId;
  private String id;
  private String password;
}
