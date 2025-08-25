package com.erp.beneficiarymanagement.beneficiary_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadDTO {

  private boolean ok;
  private String message;
  private String saveFileName;
  private String originalFileName;

}
