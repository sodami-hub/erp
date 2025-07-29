package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.response.ApiResponse;
import com.erp.staffmanagement.staff_management.dto.SaveCertificateReqDTO;
import com.erp.staffmanagement.staff_management.dto.SaveCertificationResponseDTO;
import com.erp.staffmanagement.staff_management.dto.StaffInfoDTO;
import com.erp.staffmanagement.staff_management.dto.certificateRequestDTO;
import com.erp.staffmanagement.staff_management.service.ManageStaffsService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ManageStaffsController {

  private final ManageStaffsService manageStaffsService;

  public ManageStaffsController(ManageStaffsService manageStaffsService) {
    this.manageStaffsService = manageStaffsService;
  }

  @GetMapping(value = "/staffs/{status}", produces = "application/json")
  public ResponseEntity<ApiResponse<List<StaffInfoDTO>>> getAllStaffs(@PathVariable String status) {
    try {
      List<StaffInfoDTO> allStaffs = manageStaffsService.getStaffsForStatus(status);

      return ResponseEntity.ok(ApiResponse.success(allStaffs));
    } catch (Exception e) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage()));
    }
  }

  @GetMapping("/staff/certificates/{staffId}")
  public ResponseEntity<ApiResponse<List<certificateRequestDTO>>> getCertificateByStaffId(
      @PathVariable Long staffId) {
    try {
      List<certificateRequestDTO> myCertificates = manageStaffsService.getCertificates(staffId);

      return ResponseEntity.ok(ApiResponse.success(myCertificates));
    } catch (Exception e) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST,
          "해당 직원의 자격증 정보 불러오기 에러 // " + e.getMessage()));
    }

  }

  @PostMapping("/staff/saveCertificate")
  public ResponseEntity<ApiResponse<SaveCertificationResponseDTO>> saveCertificateInfo(
      @RequestBody SaveCertificateReqDTO saveCertificateReqDTO
  ) {
    SaveCertificationResponseDTO saveCertificationResponseDTO = manageStaffsService.saveCertService(
        saveCertificateReqDTO);

    if (!saveCertificationResponseDTO.isOk()) {
      return ResponseEntity.ok(ApiResponse.error(HttpStatus.BAD_REQUEST,
          "자격증 정보 저장 실패 // " + saveCertificationResponseDTO.getErrorMessage()));
    }
    return ResponseEntity.ok(ApiResponse.success(saveCertificationResponseDTO));
  }
}
