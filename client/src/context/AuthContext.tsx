import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import * as U from '../utils';
import {fileUpload, post} from '../server';
import type {staffInfo} from '../routes/LandingPage/StaffManage/SignUpComponents';

export type LoggedUser = {institutionId: string; id: string; password: string};
export type JwtToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

const initialJwtToken: JwtToken = {
  grantType: '',
  accessToken: '',
  refreshToken: ''
};

type Callback = () => void;

type ContextType = {
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
  signup: (newStaff: staffInfo, document?: FormData) => void;
};

export const AuthContext = createContext<ContextType>({
  login: (
    _institutionId: string,
    _id: string,
    _password: string,
    _callback?: Callback
  ) => {},
  signup: (_newStaff: staffInfo, _document?: FormData) => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined);
  const [jwt, setJwt] = useState<JwtToken>(initialJwtToken);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');

  const signup = useCallback((newStaff: staffInfo, document?: FormData) => {
    post('/auth/signup', newStaff)
      .then(res => res.json())
      .then((result: {ok: boolean; userId: number; errorMessage?: string}) => {
        const {ok, userId, errorMessage} = result;
        if (ok) {
          if (document) {
            document.append('userId', String(userId));
            fileUpload('/fileUpload', document)
              .then(res => res.json())
              .then((result: {ok: boolean; errorMessage?: string}) => {
                const {ok, errorMessage} = result;
                if (!ok) {
                  setErrorMessage(errorMessage ?? '');
                  return;
                }
              });
          }
          alert('회원가입이 완료되었습니다.');
        } else {
          setErrorMessage(errorMessage ?? '');
        }
      });
  }, []);

  const login = useCallback(
    (institutionId: string, id: string, password: string, callback?: Callback) => {
      const user = {institutionId, id, password};
      const jwt = U.readObject('jwt');
      if (!jwt) {
        const receiveNewJwt = window.confirm(
          `로그인 인증 정보가 없습니다.\n 새로운 기기에서 로그인 하시겠습니까?`
        );
        if (!receiveNewJwt) return;
      }
      setJwt((jwt as JwtToken) ?? {});

      post('/auth/login', user, jwt)
        .then(res => {
          if (res === undefined) {
            setErrorMessage('res is undefined');
          } else {
            return res.json();
          }
        })
        .then(
          (result: {
            ok: boolean;
            body?: JwtToken | null;
            authCode?: string | null;
            errorMessage?: string | null;
          }) => {
            console.log(result);
            const {ok, body, errorMessage, authCode} = result;
            if (ok) {
              U.writeObject('user', user);
              U.writeObject('jwt', body ?? {});
              setJwt(body ?? initialJwtToken);
              setLoggedUser(() => user);
              setAuthCode(() => authCode ?? '');
              callback && callback();
            } else {
              setErrorMessage(errorMessage ?? '');
            }
          }
        );
    },
    []
  );

  useEffect(() => {
    // localStorage 의 jwt 값을 초기화할 때 사용
    const deleteToken = false;
    if (deleteToken) {
      U.writeObject('jwt', {});
    } else {
      // 새로고침해도 로그인 상태유지
      const jwt = U.readObject('jwt');
      setJwt((jwt as JwtToken) ?? initialJwtToken);

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
