export type LoginInfo = {
  institutionId: string;
  id: string;
  password: string;
};

export type SignupStaffRequest = {
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

export type LoggedUserInfo = {institutionId: string; id: string; authCode: string};

export type Callback = () => void;

export type ContextType = {
  errorMessage?: string;
  loggedUser?: LoggedUserInfo;
  login: (
    institutionId: string,
    id: string,
    password: string,
    callback?: Callback
  ) => void;
  signup: (newStaff: SignupStaffRequest, document?: FormData) => void;
  logout: () => void;
  clearJwt: () => void;
};

/*
// 실제로는 accessToken 필드만 사용됨
export type JwtToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};
*/

/* ResponseType<T> 를 사용하면서 사용하지 않는 타입들
export type LoginResponse = {
  ok: boolean;
  status: string;
  message: string;
  data: {
    ok: boolean;
    body: {
      grantType: string;
      accessToken: string;
      refreshToken: string;
    };
    authCode: string;
    message: string;
  };
};
export type signupStaffResponse = {
  ok: boolean;
  status: string;
  message: string;
  data: {
    ok: boolean;
    staffID: string;
    message: string;
  };
};
*/
