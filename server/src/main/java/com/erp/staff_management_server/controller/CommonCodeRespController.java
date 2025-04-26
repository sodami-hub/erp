package com.erp.staff_management_server.controller;

import com.erp.staff_management_server.dto.CommonCodeResponseDTO;
import com.erp.staff_management_server.service.CommonCodeRespService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommonCodeRespController {

  private final CommonCodeRespService commonCodeRespService;

  public CommonCodeRespController(CommonCodeRespService commonCodeRespService) {
    this.commonCodeRespService = commonCodeRespService;
  }

  @GetMapping(value = "/commonCodeList", produces = "application/json")
  public ResponseEntity<CommonCodeResponseDTO> getCommonCodeList() {
    CommonCodeResponseDTO commonCodeResp = commonCodeRespService.getCommonCodeList();
    return ResponseEntity.ok(commonCodeResp);
  }
}
