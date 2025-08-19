export type RegisterBeneficiary = {
  name: string;
  gender: string;
  birth: string;
  phone: string;
  address: string;
  rfid: string;  // 미확인, 완료, 미설치, 진행중
  supplyStatus: string; // 수급현황 (상담중(기본), 수급중, 만료, 해지)
  selfPaymentRate: string; // 본인부담률
  counselMemo:string // 상담 메모
  //underDisease: string; // 기저질환
  //receiveMethod: string; // 수신방법
  recognitionNumber: string; // 인정번호
  recognitionBeginDate: string; // 인정시작일
  recognitionEndDate: string; // 인정종료일
  recognitionLevel: string; // 인정등급
  contractDate: string; // 계약일
  contractBeginDate: string; // 계약시작일
  contractEndDate: string; // 계약종료일
  serviceType: string; // 서비스
  //basicEvaluation: string; // 기초평가
  //thisMonthPlan: string; // 당월일정
  //nextMonthPlan: string; // 다음월 일정
  //supplyRevelationDate: string; // 급여계시일
  //supplyStartDate: string; // 급여시작일
  //supplyEndDate: string; //급여종료일
  //nursingCareWorker: string; // 담당 요양보호사
};

export type GetBeneficiaryInfo = {
  beneficiaryId: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  address: string;
  rfid: string;
  supplyStatus: string; // 수급현황
  selfPaymentRate: string;
  underDisease: string;
  receiveMethod: string;
  recognitionNumber: string;
  recognitionBeginDate: string;
  recognitionEndDate: string;
  recognitionLevel: string;
  contractDate: string;
  contractBeginDate: string;
  contractEndDate: string;
  serviceType: string;
  basicEvaluation: string;
  thisMonthPlan: string;
  nextMonthPlan: string;
  supplyRevelationDate: string;
  supplyStartDate: string;
  supplyEndDate: string;
  nursingCareWorker: string;
};
