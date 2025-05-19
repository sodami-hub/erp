package com.erp.staff_management_server.controller;

import com.erp.staff_management_server.dto.StaffInfoDTO;
import com.erp.staff_management_server.dto.certificateRequestDTO;
import com.erp.staff_management_server.service.ManageStaffsService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("/certificates/{staffId}")
  public ResponseEntity<List<certificateRequestDTO>> getCertificateByStaffId(
      @PathVariable Long staffId) {

    List<certificateRequestDTO> myCertificates = manageStaffsService.getCertificates(staffId);

    return new ResponseEntity<>(myCertificates, HttpStatus.OK);
  }

}
