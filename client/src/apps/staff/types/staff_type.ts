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

export type saveCertFileResponse = {
  ok: boolean;
  errorMessage?: string;
};

export type CommonCode = {
  ok: boolean;
  authList: string[];
  workTypeList: string[];
  workList: string[];
  workStatusList: string[];
};
