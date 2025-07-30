package com.erp.staffmanagement.staff_management.entity;

import com.erp.commonutil.jpa.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "common_codes")
@IdClass(CommonCodeId.class)
public class CommonCode extends BaseEntity {

  @Id
  @Column(name = "group_name", nullable = false, length = 20)
  private String groupName;

  @Id
  @Column(name = "sub_code", nullable = false, length = 20)
  private String subCode;

  @Column(name = "code_name", nullable = false, length = 50)
  private String codeName;
}