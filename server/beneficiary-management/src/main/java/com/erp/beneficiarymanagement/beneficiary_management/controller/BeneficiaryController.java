package com.erp.beneficiarymanagement.beneficiary_management.controller;

import com.erp.beneficiarymanagement.beneficiary_management.dto.RegBeneficiaryReqDTO;
import com.erp.beneficiarymanagement.beneficiary_management.dto.RegBeneficiaryResponseDTO;
import com.erp.beneficiarymanagement.beneficiary_management.service.BeneficiaryService;
import com.erp.commonutil.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BeneficiaryController {

  private final BeneficiaryService beneficiaryService;

  @PostMapping("/beneficiary/register")
  public ResponseEntity<ApiResponse<RegBeneficiaryResponseDTO>> registerBeneficiary(
      @RequestBody RegBeneficiaryReqDTO requestDTO
  ) {
    RegBeneficiaryResponseDTO responseDTO = beneficiaryService.registerBeneficiary(requestDTO);

    if (!responseDTO.isOk()) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST, responseDTO.getMessage()));
    }

    //TODO 레디스 서버에 수급자 정보 저장

    return ResponseEntity.ok(ApiResponse.success(responseDTO));
  }
}
