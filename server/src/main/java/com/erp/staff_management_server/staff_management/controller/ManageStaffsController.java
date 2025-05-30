package com.erp.staff_management_server.staff_management.controller;

import com.erp.staff_management_server.staff_management.dto.SaveCertificateReqDTO;
import com.erp.staff_management_server.staff_management.dto.SaveCertificationResponseDTO;
import com.erp.staff_management_server.staff_management.dto.StaffInfoDTO;
import com.erp.staff_management_server.staff_management.dto.certificateRequestDTO;
import com.erp.staff_management_server.staff_management.dto.jwt.JwtToken;
import com.erp.staff_management_server.staff_management.service.ManageStaffsService;
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

  @GetMapping("/staffs/all")
  public ResponseEntity<List<StaffInfoDTO>> getAllStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getAllStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping("/staffs/onDuty")
  public ResponseEntity<List<StaffInfoDTO>> getOnDutyStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getOnDutyStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping("/staffs/offDuty")
  public ResponseEntity<List<StaffInfoDTO>> getOffDutyStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getOffDutyStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping("/staffs/break")
  public ResponseEntity<List<StaffInfoDTO>> getBreakStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getBreakStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }

  @GetMapping("/staffs/waiting")
  public ResponseEntity<List<StaffInfoDTO>> getWaitingStaffs() {
    List<StaffInfoDTO> allStaffs = manageStaffsService.getWaitingStaffs();

    return new ResponseEntity<>(allStaffs, HttpStatus.OK);
  }


  @GetMapping("/certificates/{staffId}")
  public ResponseEntity<List<certificateRequestDTO>> getCertificateByStaffId(
      @PathVariable Long staffId) {

    List<certificateRequestDTO> myCertificates = manageStaffsService.getCertificates(staffId);

    return new ResponseEntity<>(myCertificates, HttpStatus.OK);
  }

  @PostMapping("/certificate/save")
  public ResponseEntity<SaveCertificationResponseDTO> saveCertificateInfo(
      @RequestBody SaveCertificateReqDTO saveCertificateReqDTO,
      @RequestHeader(value = "Authorization", required = true) JwtToken jwtToken
  ) {
    SaveCertificationResponseDTO requestDTO = manageStaffsService.saveCertService(
        saveCertificateReqDTO, jwtToken);
    return new ResponseEntity<>(requestDTO, HttpStatus.OK);
  }

}
