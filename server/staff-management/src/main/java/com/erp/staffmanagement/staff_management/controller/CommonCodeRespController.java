package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.response.ApiResponse;
import com.erp.staffmanagement.staff_management.dto.AllCommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.dto.CommonCodeResponseDTO;
import com.erp.staffmanagement.staff_management.service.CommonCodeRespService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommonCodeRespController {

  private final CommonCodeRespService commonCodeRespService;

  public CommonCodeRespController(CommonCodeRespService commonCodeRespService) {
    this.commonCodeRespService = commonCodeRespService;
  }

  @GetMapping(value = "/staff/commonCodeList/all")
  public ResponseEntity<ApiResponse<AllCommonCodeResponseDTO>> getAllCommonCodeList() {
    AllCommonCodeResponseDTO allCommonCodeResponseDTO = commonCodeRespService.getAllCommonCodeList();
    if (!allCommonCodeResponseDTO.isOk()) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST,
          "공통코드 불러오기 에러 // " + allCommonCodeResponseDTO.getErrorMessage()));
    }
    return ResponseEntity.ok(ApiResponse.success(allCommonCodeResponseDTO));
  }

  @GetMapping(value = "/staff/commonCodeList/{groupName}")
  public ResponseEntity<ApiResponse<CommonCodeResponseDTO>> getCommonCodeList(
      @PathVariable String groupName
  ) {
    CommonCodeResponseDTO commonCodeResp = commonCodeRespService.getCommonCodeList(groupName);
    if (!commonCodeResp.isOk()) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST, "공통코드 로드 에러"));
    }
    return ResponseEntity.ok(ApiResponse.success(commonCodeResp));
  }
}