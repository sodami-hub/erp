export type SignupStaffInfo = {
  name: string;
  staffGender: string;
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
