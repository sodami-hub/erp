package com.erp.staffmanagement.staff_management.service;

import com.erp.staffmanagement.staff_management.dto.CertificateRequestDTO;
import com.erp.staffmanagement.staff_management.dto.SaveCertificateReqDTO;
import com.erp.staffmanagement.staff_management.dto.SaveCertificationResponseDTO;
import com.erp.staffmanagement.staff_management.dto.StaffInfoDTO;
import com.erp.staffmanagement.staff_management.entity.Certificates;
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

  public ManageStaffsService(StaffRepository staffRepository,
      CertificateRepository certificateRepository) {
    this.staffRepository = staffRepository;
    this.certificateRepository = certificateRepository;
  }

  public List<StaffInfoDTO> getStaffsForStatus(String status) throws Exception {
    List<StaffInfoDTO> staffs = staffRepository.findAll().stream().map(StaffInfoDTO::new).toList();
    return switch (status) {
      case "all" -> staffs;
      case "onDuty" ->
          staffs.stream().filter(object -> "근무".equals(object.getWorkStatus())).collect(
              Collectors.toList());
      case "offDuty" ->
          staffs.stream().filter(object -> "퇴사".equals(object.getWorkStatus())).collect(
              Collectors.toList());
      case "break" -> staffs.stream().filter(object -> "휴직".equals(object.getWorkStatus())).collect(
          Collectors.toList());
      case "waiting" ->
          staffs.stream().filter(object -> "대기".equals(object.getWorkStatus())).collect(
              Collectors.toList());
      default -> throw new Exception("잘못된 요청입니다.");
    };
  }

  public List<CertificateRequestDTO> getCertificates(Long staffId) throws Exception {
    try {
      List<Certificates> certificatesList = Optional.ofNullable(
          certificateRepository.findCertificatesByStaffId(staffId)).orElse(List.of());
      return certificatesList.stream().map(CertificateRequestDTO::new).toList();
    } catch (Exception e) {
      throw new Exception(e.getMessage());
    }
  }

  public SaveCertificationResponseDTO saveCertService(SaveCertificateReqDTO saveCertificateReqDTO) {
    try {
      Certificates cert = certificateRepository.save(
          new Certificates(saveCertificateReqDTO));
      return new SaveCertificationResponseDTO(true, cert.getCertificatesId(), null);
    } catch (Exception e) {
      return new SaveCertificationResponseDTO(false, null, e.getMessage());
    }
  }
}
