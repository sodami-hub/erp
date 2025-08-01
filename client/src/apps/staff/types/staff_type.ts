export type SignupStaffInfo = {
  name: string;
  gender: string;
  birth: string;
  phone: string;
  password: string;
  email: string;
  address: string;
  joinDate: string;
  contractStatus: string;
  dependents: string;
  w4c: string;
  possibleWork: string;
  workType: string;
  workStatus: string;
};

export type GetStaffInfo = {
  staffId: string;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  password: string;
  email: string;
  address: string;
  joinDate: string;
  contractStatus: string;
  dependents: string;
  w4c: string;
  possibleWork: string;
  workType: string;
  workStatus: string;
  retireDate: string;
};

export type SaveCertInfoRequest = {
  staffId: string;
  certificateName: string;
  organization: string;
  issueDate: string;
};

export type SaveCertInfoResponse = {
  ok: boolean;
  certificateId: string;
  errorMessage?: string;
};

export type CommonCode = {
  ok: boolean;
  groupName: string;
  codeNames: string[];
};

export type AllCommonCode = {
  ok: boolean;
  work_status: string[];
  work_type: string[];
  work_list: string[];
  errorMessage: string;
};

export enum CommonCodeToCodeName {
  센터장 = 201,
  사회복지사,
  요양보호사,
  목욕관리자,
  간호사,
  요양 = 301,
  목욕,
  간호,
  치매관리,
  상담서비스,
  대기 = 401,
  근무,
  휴직,
  퇴사 = 405
}
