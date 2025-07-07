import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import * as U from '../../utils';
import {useNavigate} from 'react-router-dom';
import type {SignupStaffInfo} from '../../../types';
import * as T from '../type';
import * as API from '../api';

const initialJwtToken: T.JwtToken = {
  grantType: '',
  accessToken: '',
  refreshToken: ''
};

export const AuthContext = createContext<T.ContextType>({
  login: async () => Promise.resolve(),
  signup: async () => Promise.resolve(),
  logout: () => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<T.LoggedUserInfo | undefined>(undefined);
  const [jwt, setJwt] = useState<T.JwtToken | undefined>(initialJwtToken);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [deleteStorage, setDeleteStorage] = useState<boolean>(false); // 로컬 스토리지 정보(jwtToken,user)를 초기화(logout)할 때 사용
  const navigate = useNavigate();

  const signup = useCallback(async (newStaff: SignupStaffInfo, document?: FormData) => {
    // 직원 정보 등록
    const response = await API.staffSignup(newStaff);
    if (!response.ok) {
      if (response.errorMessage) {
        setErrorMessage('error message : ' + response.errorMessage);
      } else {
        setErrorMessage('staff signup failed');
      }
    } else {
      console.log('직원 정보 저장 성공');
    }
    // 첨부 서류 업로드
    const staffId: string = response.staffId ? response.staffId : '';
    if (document) {
      document.append('staffId', staffId);
      const response = await API.staffFileUpload(document);
      if (!response.ok) {
        if (response.errorMessage) {
          setErrorMessage('error message : ' + response.errorMessage);
        } else {
          setErrorMessage('file upload failed');
        }
      } else {
        console.log('file upload succeed');
      }
    }
    alert('직원 등록이 완료됐습니다.');
  }, []);

  const login = useCallback(
    async (
      institutionId: string,
      id: string,
      password: string,
      callback?: T.Callback
    ) => {
      const info: T.LoginInfo = {institutionId, id, password};
      const response: T.Response = await API.staffLogin(info);
      if (!response.ok) {
        if (response.errorMessage) {
          setErrorMessage('Error Message : ' + response.errorMessage);
        } else {
          setErrorMessage('login failed');
        }
      } else {
        const loggedUserInfo: T.LoggedUserInfo = {
          institutionId: info.institutionId,
          id: info.id,
          authCode: response.authCode ?? ''
        };
        U.writeObject('user', loggedUserInfo);
        setLoggedUser(loggedUserInfo);
        U.writeStringP('accessToken', response.token?.accessToken ?? '');
        U.writeStringP('refreshToken', response.token?.refreshToken ?? '');
        U.writeObject('jwt', response.token ?? {});
        setJwt(response.token ?? undefined);
        setAuthCode(response.authCode ?? '');
        callback && callback();
        console.log('login success');
      }
    },
    []
  );

  const logout = useCallback(() => {
    U.writeObject('user', {});
    U.writeStringP('accessToken', '');
    U.writeStringP('refreshToken', '');
    setJwt(undefined);
    setAuthCode('');
    setLoggedUser(undefined);
    navigate('/');
  }, []);

  useEffect(() => {
    // localStorage 의 값을 초기화할 때 사용 logout?
    if (deleteStorage) {
      U.writeObject('user', {});
      U.writeStringP('accessToken', '');
      U.writeStringP('refreshToken', '');
      setJwt(undefined);
      setAuthCode('');
      setLoggedUser(undefined);
      navigate('/');
      setDeleteStorage(!deleteStorage);
    } else {
      // 새로고침해도 로그인 상태유지
      const storedJwt: T.JwtToken = U.readObject('jwt');
      setJwt(storedJwt ?? initialJwtToken);
      const user: T.LoggedUserInfo = U.readObject('user');
      setLoggedUser(user);
      setAuthCode(user.authCode);
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(() => '');
    }
  }, [errorMessage]);

  const value = {
    authCode,
    jwt,
    errorMessage,
    loggedUser,
    login,
    signup,
    logout
  };
  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
