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

export type saveCertInfoRequest = {
  staffId: string;
  certificateName: string;
  organization: string;
  issueDate: string;
};

export type saveCertInfoResponse = {
  ok: boolean;
  certificateId: string;
  errorMessage?: string;
};

export type CommonCode = {
  ok: boolean;
  groupName: string;
  codeNames: string[];
};

export type allCommonCode = {
  ok: boolean;
  work_status: string[];
  work_type: string[];
  work_list: string[];
  errorMessage: string;
};
