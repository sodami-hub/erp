package com.erp.staffmanagement.staff_management.dto;

import com.erp.staffmanagement.staff_management.entity.Certificates;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class certificateRequestDTO {

  private String certificateName;
  private LocalDate issueDate;
  private String organization;

  public certificateRequestDTO(Certificates certificate) {
    this.certificateName = certificate.getCertificateName();
    this.issueDate = certificate.getIssueDate();
    this.organization = certificate.getOrganization();
  }
}
