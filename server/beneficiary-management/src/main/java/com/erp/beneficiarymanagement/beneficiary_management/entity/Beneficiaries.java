package com.erp.beneficiarymanagement.beneficiary_management.entity;

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
@Table(name = "beneficiaries")
public class Beneficiaries extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "beneficiary_id")
  private Long beneficiaryId;

  @Column(name = "institution_id")
  private Long institutionId;

  @Column(name = "name")
  private String name;

  @Column(name = "gender")
  private String gender;

  @Column(name = "birth")
  private LocalDate birth;

  @Column(name = "phone")
  private String phone;

  @Column(name = "address")
  private String address;

  @Column(name = "RFID")
  private String rfid;

  @Column(name = "supply_status")
  private String supplyStatus; // 수급현황 : 수급중, 상담중, 해지, 만료

  @Column(name = "self_payment_rate")
  private String selfPaymentRate;  // 본인부담률

  @Column(name = "counsel_memo")
  private String counselMemo;

  @Column(name = "under_disease")
  private String underDisease;  // 기저질환

  @Column(name = "receive_method")
  private String receiveMethod;  // 수신방법?

  @Column(name = "recognition_number")
  private String recognitionNumber; // 인정번호

  @Column(name = "recognition_begin_date")
  private LocalDate recognitionBeginDate;  // 인정시작일

  @Column(name = "recognition_end_date")
  private LocalDate recognitionEndDate;  // 인정종료일

  @Column(name = "recognition_level")
  private String recognitionLevel; // 인정등급

  @Column(name = "contract_date")
  private LocalDate contractDate; // 계약일

  @Column(name = "contract_begin_date")
  private LocalDate contractBeginDate; // 계약시작일

  @Column(name = "contract_end_date")
  private LocalDate contractEndDate;  // 계약종료일

  @Column(name = "service_type")
  private String serviceType; // 서비스 : 요양, 목욕, 간병 ... 등

  @Column(name = "basic_evaluation")
  private String basicEvaluation; // 기초 평가 - 추후에 추가 테이블값으로 연결

  @Column(name = "this_month_plan")
  private String thisMonthPlan; // 이번달 계획

  @Column(name = "next_month_plan")
  private String nextMonthPlan; // 다음달 계획

  @Column(name = "supply_revelation_date")
  private LocalDate supplyRevelationDate; // 급여계시일

  @Column(name = "supply_start_date")
  private LocalDate supplyStartDate; // 급여시작일

  @Column(name = "supply_end_date")
  private LocalDate supplyEndDate;  //급여 종료일

  @Column(name = "nursing_care_worker")
  private Long nursingCareWorker;  // 담당 요양보호사(직원)

}
