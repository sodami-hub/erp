export type LoggedUser = {institutionId: string; id: string; password: string};

export type JwtToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

export type Callback = () => void;

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

export type ContextType = {
  jwt?: JwtToken;
  authCode?: string;
  errorMessage?: string;
  loggedUser?: LoggedUser;
  login: (
    institutionId: string,
    id: string,
    password: string,
    callback?: Callback
  ) => void;
  signup: (newStaff: SignupStaffInfo, currentJwt: JwtToken, document?: FormData) => void;
};
