package com.erp.server.staff_management.controller;

import com.erp.server.staff_management.dto.CommonCodeResponseDTO;
import com.erp.server.staff_management.dto.jwt.JwtToken;
import com.erp.server.staff_management.service.CommonCodeRespService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommonCodeRespController {

  private final CommonCodeRespService commonCodeRespService;

  public CommonCodeRespController(CommonCodeRespService commonCodeRespService) {
    this.commonCodeRespService = commonCodeRespService;
  }

  @GetMapping(value = "/staff/commonCodeList", produces = "application/json")
  public ResponseEntity<CommonCodeResponseDTO> getCommonCodeList(
      @RequestHeader(value = "Authorization", required = false) JwtToken jwtToken
  ) {
    CommonCodeResponseDTO commonCodeResp = commonCodeRespService.getCommonCodeList(jwtToken);
    return ResponseEntity.ok(commonCodeResp);
  }
}
