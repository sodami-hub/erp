package com.erp.server.staff_management.dto;

import java.time.LocalDate;
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

  // 클라이언트에서 전달되는 필드
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
  // ==== 추가 정의 필드
  private String institutionId;
  private LocalDate retireDate;
  private String authId;


}
