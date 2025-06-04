package com.erp.server.staff_management.entity;

import com.erp.server.staff_management.dto.SignUpRequestDTO;
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
@Table(name = "staffs")
public class Staff extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "staff_id")
  private Long staffId;

  @Column(name = "institution_id", nullable = false)
  private String institutionId;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "gender")
  private String gender; // 남/여

  @Column(name = "birth")
  private LocalDate birth;

  @Column(name = "phone")
  private String phone;  // 로그인 id

  @Column(name = "password")
  private String password;  // phone 뒤 4자리

  @Column(name = "email")
  private String email;

  @Column(name = "address")
  private String address;

  @Column(name = "join_date")
  private LocalDate joinDate;

  @Column(name = "contract_status")
  private String contractStatus; // 정규직, 계약직, 인턴

  @Column(name = "retire_date")
  private LocalDate retireDate;

  @Column(name = "dependents")
  private String dependents; // 부양가족 0~9명

  @Column(name = "w4c")
  private String w4c;

  @Column(name = "auth_id")
  private String authId;

  @Column(name = "possible_work")
  private String possibleWork;

  @Column(name = "work_type")
  private String workType;

  @Column(name = "work_status")
  private String workStatus;

  public Staff(SignUpRequestDTO signUpRequestDTO, Long managerId) {
    this.institutionId = signUpRequestDTO.getInstitutionId();
    this.name = signUpRequestDTO.getName();
    this.gender = signUpRequestDTO.getGender();
    this.birth = LocalDate.parse(signUpRequestDTO.getBirth());
    this.phone = signUpRequestDTO.getPhone();
    this.password = signUpRequestDTO.getPassword();
    this.email = signUpRequestDTO.getEmail();
    this.address = signUpRequestDTO.getAddress();
    this.joinDate = LocalDate.parse(signUpRequestDTO.getJoinDate());
    this.contractStatus = signUpRequestDTO.getContractStatus();
    this.retireDate = signUpRequestDTO.getRetireDate();
    this.dependents = signUpRequestDTO.getDependents();
    this.w4c = signUpRequestDTO.getW4c();
    this.authId = signUpRequestDTO.getAuthId();
    this.possibleWork = signUpRequestDTO.getPossibleWork();
    this.workType = signUpRequestDTO.getWorkType();
    this.workStatus = signUpRequestDTO.getWorkStatus();
    super.setCreatorId(managerId);
    super.setUpdaterId(managerId);
  }

}
