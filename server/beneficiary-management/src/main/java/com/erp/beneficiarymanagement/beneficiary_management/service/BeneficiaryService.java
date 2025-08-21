package com.erp.beneficiarymanagement.beneficiary_management.service;

import com.erp.beneficiarymanagement.beneficiary_management.dto.RegBeneficiaryReqDTO;
import com.erp.beneficiarymanagement.beneficiary_management.dto.RegBeneficiaryResponseDTO;
import com.erp.beneficiarymanagement.beneficiary_management.entity.Beneficiaries;
import com.erp.beneficiarymanagement.beneficiary_management.repository.BeneficiariesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BeneficiaryService {

  private final BeneficiariesRepository beneficiariesRepository;

  public RegBeneficiaryResponseDTO registerBeneficiary(RegBeneficiaryReqDTO requestDTO) {
    try {
      Beneficiaries beneficiaries = beneficiariesRepository.save(new Beneficiaries(requestDTO));

      return new RegBeneficiaryResponseDTO(true, beneficiaries.getBeneficiaryId().toString(),
          "수급자 등록 성공");
    } catch (Exception e) {
      return new RegBeneficiaryResponseDTO(false, null, "에러발생" + e.getMessage());
    }
  }
}
