import * as T from './index';

export type LoginInfo = {
  institutionId: string;
  id: string;
  password: string;
};

export type Response = {
  ok: boolean;
  staffId?: string; // 직원 등록후 등록한 직원의 id 가져오기. -> 파일등록에 사용.
  token?: T.JwtToken;
  authCode?: string;
  errorMessage?: string;
};

export type LoggedUserInfo = {institutionId: string; id: string; authCode: string};

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
  loggedUser?: LoggedUserInfo;
  login: (
    institutionId: string,
    id: string,
    password: string,
    callback?: Callback
  ) => void;
  signup: (newStaff: SignupStaffInfo, document?: FormData) => void;
  logout: () => void;
};
