package com.erp.staff_management_server.service;

import com.erp.staff_management_server.dto.StaffInfoDTO;
import com.erp.staff_management_server.dto.certificateRequestDTO;
import com.erp.staff_management_server.entity.Certificates;
import com.erp.staff_management_server.entity.Staff;
import com.erp.staff_management_server.repository.CertificatesRepository;
import com.erp.staff_management_server.repository.StaffRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ManageStaffsService {

  private final StaffRepository staffRepository;
  private final CertificatesRepository certificatesRepository;

  public ManageStaffsService(StaffRepository staffRepository,
      CertificatesRepository certificatesRepository) {
    this.staffRepository = staffRepository;
    this.certificatesRepository = certificatesRepository;
  }

  public List<StaffInfoDTO> getAllStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    return staffs.stream().map(StaffInfoDTO::new).toList();
  }

  public List<StaffInfoDTO> getOnDutyStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    List<StaffInfoDTO> result = staffs.stream().map(StaffInfoDTO::new).toList();
    return result.stream().filter(object -> "근무".equals(object.getWorkStatus())).collect(
        Collectors.toList());
  }

  public List<StaffInfoDTO> getOffDutyStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    List<StaffInfoDTO> result = staffs.stream().map(StaffInfoDTO::new).toList();
    return result.stream().filter(object -> "퇴사".equals(object.getWorkStatus())).collect(
        Collectors.toList());
  }

  public List<StaffInfoDTO> getBreakStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    List<StaffInfoDTO> result = staffs.stream().map(StaffInfoDTO::new).toList();
    return result.stream().filter(object -> "휴직".equals(object.getWorkStatus())).collect(
        Collectors.toList());
  }

  public List<StaffInfoDTO> getWaitingStaffs() {
    List<Staff> staffs = staffRepository.findAll();
    List<StaffInfoDTO> result = staffs.stream().map(StaffInfoDTO::new).toList();
    return result.stream().filter(object -> "대기".equals(object.getWorkStatus())).collect(
        Collectors.toList());
  }


  public List<certificateRequestDTO> getCertificates(Long staffId) {
    List<Certificates> certificatesList = Optional.ofNullable(
        certificatesRepository.findCertificatesByStaffId(staffId)).orElse(List.of());
    return certificatesList.stream().map(certificateRequestDTO::new).toList();
  }


}
