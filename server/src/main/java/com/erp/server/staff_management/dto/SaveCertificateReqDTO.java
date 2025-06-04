package com.erp.server.staff_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveCertificateReqDTO {

  private Long staffId;
  private String certificateName;
  private String organization;
  private String issueDate;

}
