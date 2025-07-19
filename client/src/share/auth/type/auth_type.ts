// 타입의 중복되는 내용을 제네릭을 쓴다던지 방법을 찾아서 심플하게.
export type LoginInfo = {
  institutionId: string;
  id: string;
  password: string;
};

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
  };
};

export type signupStaffResponse = {
  ok: boolean;
  status: string;
  staffId?: string; // 직원 등록후 등록한 직원의 id 가져오기. -> 파일등록에 사용.
  message: string;
  data: {
    ok: boolean;
    body: {
      grantType: string;
      accessToken: string;
      refreshToken: string;
    };
  };
  authCode?: string;
  errorMessage?: string;
};

export type LoggedUserInfo = {institutionId: string; id: string};

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
  clearJwt: () => void;
  newJwt: (jwt: JwtToken) => void;
};
