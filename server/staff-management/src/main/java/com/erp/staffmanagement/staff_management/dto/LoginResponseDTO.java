package com.erp.staffmanagement.staff_management.dto;

import com.erp.commonutil.jwt.dto.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDTO {

  private boolean ok;
  private JwtToken body;
  private String authCode;
  private String message;

  public LoginResponseDTO(JwtToken jwtToken, String roles) {
    this.body = jwtToken;
    this.authCode = roles;
  }
}
