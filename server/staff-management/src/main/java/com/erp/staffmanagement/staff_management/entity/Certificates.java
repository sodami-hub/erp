package com.erp.staffmanagement.staff_management.entity;

import com.erp.commonutil.jpa.BaseEntity;
import com.erp.staffmanagement.staff_management.dto.SaveCertificateReqDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "certificates")
public class Certificates extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "certificate_id")
  private Long certificatesId;

  @Column(name = "staff_id", nullable = false)
  private Long staffId;

  @Column(name = "certificate_name", nullable = false)
  private String certificateName;

  @Column(name = "organization", nullable = false)
  private String organization;

  @Column(name = "issue_date")
  private LocalDate issueDate;

  @Column(name = "original_name")
  private String originalName;

  @Column(name = "save_name")
  private String saveName;

  public Certificates(SaveCertificateReqDTO dto, Long managerId) {
    this.staffId = dto.getStaffId();
    this.certificateName = dto.getCertificateName();
    this.organization = dto.getOrganization();
    this.issueDate = LocalDate.parse(dto.getIssueDate());
    super.setCreatorId(managerId);
    super.setUpdaterId(managerId);
  }
}
