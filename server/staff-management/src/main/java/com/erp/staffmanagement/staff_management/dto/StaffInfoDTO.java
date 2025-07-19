package com.erp.staffmanagement.staff_management.dto;

import com.erp.staffmanagement.staff_management.entity.Staff;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StaffInfoDTO {

  private Long staffId;
  private String institutionId;
  private String name;
  private String gender;
  private String phone;
  private String password;
  private String email;
  private String address;
  private LocalDate birth;
  private LocalDate joinDate;
  private String contractStatus;
  private LocalDate retireDate;
  private String dependents;
  private String w4c;
  private String authId;
  private String possibleWork;
  private String workType;
  private String workStatus;
  private LocalDateTime createdAt;
  private String creatorId;
  private LocalDateTime updatedAt;
  private String updaterId;

  public StaffInfoDTO(Staff staff) {
    this.staffId = staff.getStaffId();
    this.institutionId = staff.getInstitutionId();
    this.name = staff.getName();
    this.gender = staff.getGender();
    this.phone = staff.getPhone();
    this.password = staff.getPassword();
    this.email = staff.getEmail();
    this.address = staff.getAddress();
    this.birth = staff.getBirth();
    this.joinDate = staff.getJoinDate();
    this.contractStatus = staff.getContractStatus();
    this.retireDate = staff.getRetireDate();
    this.dependents = staff.getDependents();
    this.w4c = staff.getW4c();
    this.authId = staff.getAuthId();
    this.possibleWork = staff.getPossibleWork();
    this.workType = staff.getWorkType();
    this.workStatus = staff.getWorkStatus();
    this.createdAt = staff.getCreatedAt();
    this.creatorId = staff.getCreatorId();
    this.updatedAt = staff.getUpdatedAt();
    this.updaterId = staff.getUpdaterId();
  }
}
