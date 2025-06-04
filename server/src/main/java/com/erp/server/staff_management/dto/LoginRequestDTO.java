package com.erp.server.staff_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class LoginRequestDTO {

  private String institutionId;
  private String id; // phone
  private String password;
}
