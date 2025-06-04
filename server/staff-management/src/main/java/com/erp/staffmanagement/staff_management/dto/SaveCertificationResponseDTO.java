package com.erp.staffmanagement.staff_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveCertificationResponseDTO {

  private boolean ok;
  private Long certificateId;
  private String errorMessage;
}
