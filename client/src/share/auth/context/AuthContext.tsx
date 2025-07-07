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
  login: (
    _institutionId: string,
    _id: string,
    _password: string,
    _callback?: T.Callback
  ) => {},
  signup: (
    _newStaff: SignupStaffInfo,
    _currentJwt: T.JwtToken,
    _document?: FormData
  ) => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<T.LoggedUserInfo | undefined>(undefined);
  const [jwt, setJwt] = useState<T.JwtToken>(initialJwtToken);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const navigate = useNavigate();

  const signup = useCallback(
    async (newStaff: SignupStaffInfo, currentJwt: T.JwtToken, document?: FormData) => {
      console.log(newStaff, currentJwt);
      const response = await Signup(newStaff.email, newStaff.password);
      console.log(response);
      // post('/auth/signup', newStaff, currentJwt)
      //   .then(res => res.json())
      //   .then((result: {ok: boolean; userId: number; errorMessage?: string}) => {
      //     const {ok, userId, errorMessage} = result;
      //     console.log(ok, userId, errorMessage);
      //     if (ok) {
      //       if (document) {
      //         document.append('userId', String(userId));
      //         fileUpload('/staff/saveDependentDocument', document, currentJwt)
      //           .then(res => res.json())
      //           .then((result: {ok: boolean; errorMessage?: string}) => {
      //             const {ok, errorMessage} = result;
      //             if (!ok) {
      //               setErrorMessage(errorMessage ?? '');
      //               return;
      //             }
      //           });
      //       }
      //       alert('회원가입이 완료되었습니다.');
      //     } else {
      //       setErrorMessage(errorMessage ?? '');
      //       if (errorMessage?.includes('권한이')) {
      //         navigate('/index');
      //       } else if (errorMessage?.includes('로그인')) {
      //         //로그아웃 로직 추가!!! 필요
      //         navigate('/');
      //       } else {
      //         navigate('/index/staffInfo');
      //       }
      //     }
      //   });
    },
    []
  );

  const login = useCallback(async (info: T.LoginInfo, callback?: T.Callback) => {
    const response: T.Response = await API.staffLogin(info);
    if (!response.ok) {
      if (response.errorMessage) {
        alert('Error Message : ' + response.errorMessage);
      } else {
        alert('login failed');
      }
    } else {
      const loggedUserInfo: T.LoggedUserInfo = {
        institutionId: info.institutionId,
        id: info.id,
        authCode: response.authCode
      };
      U.writeObject('user', loggedUserInfo);
      setLoggedUser(loggedUserInfo);
      U.writeStringP('accessToken', response.body?.accessToken ?? '');
      U.writeStringP('refreshToken', response.body?.refreshToken ?? '');
      setJwt(response.body);
      setAuthCode(response.authCode);
      callback && callback();
    }
  }, []);

  useEffect(() => {
    // localStorage 의 jwt 값을 초기화할 때 사용
    const deleteToken = false;
    if (deleteToken) {
      U.writeObject('jwt', {});
    } else {
      // 새로고침해도 로그인 상태유지
      const storedJwt = U.readObject('jwt');
      setJwt((storedJwt as T.JwtToken) ?? initialJwtToken);

      const user = U.readStringP('user');
      setLoggedUser(
        user === null ? undefined : user === '{}' ? undefined : JSON.parse(user)
      );
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
    signup
  };
  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
