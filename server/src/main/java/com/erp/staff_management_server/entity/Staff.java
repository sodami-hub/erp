package com.erp.staff_management_server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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

}
