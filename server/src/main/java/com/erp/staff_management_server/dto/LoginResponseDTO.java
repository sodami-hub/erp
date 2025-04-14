package com.erp.staff_management_server.dto;

import com.erp.staff_management_server.dto.jwt.JwtToken;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class LoginResponseDTO {

  private boolean ok;
  private JwtToken jwtToken;
  private String errorMessage;
}
