package com.erp.staffmanagement.staff_management.dto;

import com.erp.commonutil.jwt.dto.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDTO {
  private JwtToken body;
  private String authCode;
}