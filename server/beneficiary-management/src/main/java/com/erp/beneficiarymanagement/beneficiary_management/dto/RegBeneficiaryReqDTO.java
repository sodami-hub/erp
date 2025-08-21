package com.erp.beneficiarymanagement.beneficiary_management.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegBeneficiaryReqDTO {

  private String name;
  private String institutionId;
  private String gender;
  private String birth;
  private String phone;
  private String address;
  private String rfid; // 미확인, 완료, 미설치, 진행중
  private String supplyStatus; // 수급현황 (상담중(기본), 수급중, 만료, 해지)
  private String selfPaymentRate; // 본인부담률
  private String counselMemo; // 상담 메모
  private String recognitionNumber; // 인정번호
  private String recognitionBeginDate; // 인정시작일
  private String recognitionEndDate; // 인정종료일
  private String recognitionLevel; // 인정등급
  private String contractDate; // 계약일
  private String contractBeginDate; // 계약시작일
  private String contractEndDate; // 계약종료일
  private String serviceType; // 서비스
}
