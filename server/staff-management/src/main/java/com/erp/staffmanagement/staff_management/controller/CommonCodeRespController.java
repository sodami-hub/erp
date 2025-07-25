package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.staffmanagement.staff_management.dto.CommonCodeRequestDTO;
import com.erp.staffmanagement.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.service.CommonCodeRespService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommonCodeRespController {

  private final CommonCodeRespService commonCodeRespService;

  public CommonCodeRespController(CommonCodeRespService commonCodeRespService) {
    this.commonCodeRespService = commonCodeRespService;
  }

  @GetMapping(value = "/staff/commonCodeList")
  public ResponseEntity<CommonCodeResponseDTO> getCommonCodeList(
          @RequestBody CommonCodeRequestDTO requestDTO
          ) {
    CommonCodeResponseDTO commonCodeResp = commonCodeRespService.getCommonCodeList(requestDTO);
    return ResponseEntity.ok(commonCodeResp);
  }
}