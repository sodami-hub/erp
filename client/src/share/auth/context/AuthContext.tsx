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
  logout: () => {},
  clearJwt: () => {},
  newJwt: () => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<T.LoggedUserInfo | undefined>(undefined);
  const [jwt, setJwt] = useState<T.JwtToken | undefined>(initialJwtToken);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  // 로컬 스토리지 정보(jwtToken,user)를 초기화(logout)할 때 사용
  const [deleteStorage, setDeleteStorage] = useState<boolean>(false);
  const navigate = useNavigate();

  const clearJwt = useCallback(() => {
    U.writeStringP('accessToken', '');
    U.writeStringP('refreshToken', '');
    setJwt(undefined);
  }, []);

  const newJwt = useCallback((newJwt: T.JwtToken) => {
    setJwt(newJwt);
  }, []);

  const signup = useCallback(
    async (newStaff: T.SignupStaffRequest, document?: FormData) => {
      // 직원 정보 등록
      const response: T.ResponseType<any> = await API.staffSignup(newStaff);
      if (!response.ok) {
        if (response.message) {
          setErrorMessage('Message ' + response.message);
          return;
        } else {
          setErrorMessage('staff signup failed');
          return;
        }
      } else {
        console.log('직원 정보 저장 성공');
      }
      // 첨부 서류 업로드
      const staffId: string = response.data.staffID;
      if (document) {
        document.append('staffId', staffId);
        const response = await API.staffFileUpload(document);
        if (!response.ok) {
          if (response.message) {
            setErrorMessage('Message : ' + response.message);
            return;
          } else {
            setErrorMessage('file upload failed');
            return;
          }
        } else {
          console.log('file upload succeed');
        }
      }
      alert('직원 등록이 완료됐습니다.');
    },
    []
  );

  const login = useCallback(
    async (
      institutionId: string,
      id: string,
      password: string,
      callback?: T.Callback
    ) => {
      const info: T.LoginInfo = {institutionId, id, password};
      const response: T.ResponseType<any> = await API.staffLogin(info);
      if (!response.ok) {
        if (response.message) {
          setErrorMessage('Message : ' + response.message);
        } else {
          setErrorMessage('login failed');
        }
      } else {
        const loggedUserInfo: T.LoggedUserInfo = {
          institutionId: info.institutionId,
          id: info.id,
          authCode: response.data.authCode
        };
        U.writeObject('user', loggedUserInfo);
        setLoggedUser(loggedUserInfo);
        U.writeStringP('accessToken', response.data.body.accessToken);
        U.writeObject('jwt', response.data.body);
        setJwt(response.data.body);
        setAuthCode(response.data.authCode);
        callback && callback();
        console.log('login success');
      }
    },
    []
  );

  const logout = useCallback(() => {
    U.writeObject('user', {});
    U.writeStringP('accessToken', '');
    setJwt(undefined);
    setAuthCode('');
    setLoggedUser(undefined);
    console.log('logout');
    navigate('/');
  }, []);

  useEffect(() => {
    // localStorage 의 값을 초기화할 때 사용 logout?
    if (deleteStorage) {
      U.writeObject('user', {});
      U.writeStringP('accessToken', '');
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
      setAuthCode('');
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
    logout,
    clearJwt,
    newJwt
  };
  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
