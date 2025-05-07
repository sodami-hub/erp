package com.erp.staff_management_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignUpRequestDTO {

  private String name;
  private String gender;
  private String birth;
  private String phone;
  private String password;
  private String email;
  private String address;
  private String joinDate;
  private String contractStatus;
  private String dependents;
  private String w4c;
  private String possibleWork;
  private String workType;
  private String workStatus;
}
