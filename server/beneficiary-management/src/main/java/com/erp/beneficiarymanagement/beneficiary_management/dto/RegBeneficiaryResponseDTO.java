package com.erp.beneficiarymanagement.beneficiary_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegBeneficiaryResponseDTO {

  private boolean ok;
  private String beneficiaryId;
  private String message;

}
