package com.erp.staffmanagement.staff_management.service;

import com.erp.commonutil.jwt.JwtTokenProvider;
import com.erp.commonutil.jwt.dto.JwtToken;
import com.erp.staffmanagement.staff_management.dto.SaveCertificateReqDTO;
import com.erp.staffmanagement.staff_management.dto.SaveCertificationResponseDTO;
import com.erp.staffmanagement.staff_management.dto.StaffInfoDTO;
import com.erp.staffmanagement.staff_management.dto.certificateRequestDTO;
import com.erp.staffmanagement.staff_management.entity.Certificates;
import com.erp.staffmanagement.staff_management.entity.Staff;
import com.erp.staffmanagement.staff_management.repository.CertificateRepository;
import com.erp.staffmanagement.staff_management.repository.StaffRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ManageStaffsService {

  private final StaffRepository staffRepository;
  private final CertificateRepository certificateRepository;
  private final JwtTokenProvider jwtTokenProvider;

  public ManageStaffsService(StaffRepository staffRepository,
      CertificateRepository certificateRepository, JwtTokenProvider jwtTokenProvider) {
    this.staffRepository = staffRepository;

    this.certificateRepository = certificateRepository;
    this.jwtTokenProvider = jwtTokenProvider;
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
        certificateRepository.findCertificatesByStaffId(staffId)).orElse(List.of());
    return certificatesList.stream().map(certificateRequestDTO::new).toList();
  }


  public SaveCertificationResponseDTO saveCertService(SaveCertificateReqDTO saveCertificateReqDTO,
      JwtToken jwtToken) {

    Long managerId = jwtTokenProvider.getClaims(jwtToken.getAccessToken()).getStaffId();

    Certificates cert = certificateRepository.save(
        new Certificates(saveCertificateReqDTO, managerId));
    return new SaveCertificationResponseDTO(true, cert.getCertificatesId(), null);
  }
}
