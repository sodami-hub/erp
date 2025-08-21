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
import * as T from '../types';
import * as ST from '../../types';
import * as API from '../api';

export const AuthContext = createContext<T.ContextType>({
  login: async () => Promise.resolve(),
  signup: async () => Promise.resolve(),
  logout: () => {},
  clearJwt: () => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<ST.LoggedUserInfo | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // 로컬 스토리지 정보(jwtToken,user)를 초기화(logout)할 때 사용
  const [deleteStorage, setDeleteStorage] = useState<boolean>(false);

  const navigate = useNavigate();

  const clearJwt = useCallback(() => {
    U.writeStringP('accessToken', '');
  }, []);

  const signup = useCallback(
    async (newStaff: T.SignupStaffRequest, document?: FormData) => {
      // 직원 정보 등록
      const response = await API.staffSignup(newStaff);
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
        // 첨부 서류 업로드
        if (document && document.entries().next().done === false) {
          document.append('staffId', response.data.staffId);
          const response02 = await API.staffFileUpload(document);
          if (!response02.ok) {
            if (response02.message) {
              setErrorMessage('Message : ' + response02.message);
              return;
            } else {
              setErrorMessage('file upload failed');
              return;
            }
          } else {
            console.log('첨부파일 저장 성공');
          }
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
      const response: ST.ResponseType<any> = await API.staffLogin(info);
      if (!response.ok) {
        if (response.message) {
          setErrorMessage('Message : ' + response.message);
        } else {
          setErrorMessage('login failed');
        }
      } else {
        const loggedUserInfo: ST.LoggedUserInfo = {
          institutionId: info.institutionId,
          id: info.id,
          authCode: response.data.authCode
        };
        U.writeObject('user', loggedUserInfo);
        setLoggedUser(loggedUserInfo);
        U.writeStringP('accessToken', response.data.body.accessToken);
        U.writeStringP('refreshToken', response.data.body.refreshToken);
        console.log('accessToken => ' + U.readStringP('accessToken'));
        callback && callback();
        console.log('login success');

        const commonCode = await API.loadCommonCode();
        if (!commonCode.ok) {
          console.log('CommonCode(Staff) Load Failure // ' + commonCode.message);
          return;
        }
        U.writeObject('commonCode', commonCode.data);
        console.log('직원 공통코드 불러오기 성공');
      }
    },
    []
  );

  const logout = useCallback(() => {
    U.writeObject('user', {});
    U.writeStringP('accessToken', '');
    setLoggedUser(undefined);
    console.log('logout');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    // localStorage 의 값을 초기화할 때 사용 logout?
    if (deleteStorage) {
      U.writeObject('user', {});
      U.writeStringP('accessToken', '');
      setLoggedUser(undefined);
      navigate('/');
      setDeleteStorage(!deleteStorage);
    } else {
      // 새로고침해도 로그인 상태유지
      const user: ST.LoggedUserInfo = U.readObject('user');
      setLoggedUser(user);
    }
  }, [deleteStorage, navigate]);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(() => '');
    }
  }, [errorMessage]);

  const value = {
    errorMessage,
    loggedUser,
    login,
    signup,
    logout,
    clearJwt
  };
  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
