package com.erp.staffmanagement.staff_management.controller;

import com.erp.commonutil.jwt.dto.JwtToken;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ManageStaffsController {

  private final ManageStaffsService manageStaffsService;

  public ManageStaffsController(ManageStaffsService manageStaffsService) {
    this.manageStaffsService = manageStaffsService;
  }

  @GetMapping(value = "/staffs/all", produces = "application/json")
  public ResponseEntity<List<StaffInfoDTO>> getAllStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getAllStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping(value = "/staffs/onDuty", produces = "application/json")
  public ResponseEntity<List<StaffInfoDTO>> getOnDutyStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getOnDutyStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping(value = "/staffs/offDuty", produces = "application/json")
  public ResponseEntity<List<StaffInfoDTO>> getOffDutyStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getOffDutyStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping(value = "/staffs/break", produces = "application/json")
  public ResponseEntity<List<StaffInfoDTO>> getBreakStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getBreakStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping(value = "/staffs/waiting", produces = "application/json")
  public ResponseEntity<List<StaffInfoDTO>> getWaitingStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getWaitingStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }


  @GetMapping("/staff/certificates/{staffId}")
  public ResponseEntity<List<certificateRequestDTO>> getCertificateByStaffId(
      @PathVariable Long staffId) {

    List<certificateRequestDTO> myCertificates = manageStaffsService.getCertificates(staffId);

    return new ResponseEntity<>(myCertificates, HttpStatus.OK);
  }

  @PostMapping("/staff/saveCertificate")
  public ResponseEntity<SaveCertificationResponseDTO> saveCertificateInfo(
      @RequestBody SaveCertificateReqDTO saveCertificateReqDTO,
      @RequestHeader(value = "Authorization") JwtToken jwtToken
  ) {
    SaveCertificationResponseDTO requestDTO = manageStaffsService.saveCertService(
        saveCertificateReqDTO, jwtToken);
    return new ResponseEntity<>(requestDTO, HttpStatus.OK);
  }

}
