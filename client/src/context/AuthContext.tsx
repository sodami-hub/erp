import type {FC, PropsWithChildren} from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import * as U from '../utils';
import {post} from '../server';

export type LoggedUser = {organizationId: string; id: string; password: string};
export type JwtToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

type Callback = () => void;

// 먼저 login 부분만 구현해본다.
type ContextType = {
  jwt?: object;
  errorMessage?: string;
  loggedUser?: LoggedUser;
  login: (
    organizationId: string,
    id: string,
    password: string,
    callback?: Callback
  ) => void;
};

export const AuthContext = createContext<ContextType>({
  login: (organizationId: string, id: string, password: string, callback?: Callback) => {}
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined);
  const [jwt, setJwt] = useState<object>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const login = useCallback(
    (organizationId: string, id: string, password: string, callback?: Callback) => {
      const user = {organizationId, id, password};
      U.readObjectP('jwt')
        .then(jwt => {
          if (!jwt) {
            const receiveNewJwt = window.confirm(
              `로그인 인증 정보가 없습니다.\n 새로운 기기에서 로그인 하시겠습니까?`
            );
            if (!receiveNewJwt) return;
          }
          setJwt(jwt ?? {});
          return post('/auth/login', user, jwt);
        })
        .then(res => {
          if (res === undefined) {
            setErrorMessage('res is undefined');
          } else {
            console.log(res.json());
            return res.json();
          }
        })
        .then((result: {ok: boolean; body?: JwtToken; errorMessage?: string}) => {
          const {ok, body, errorMessage} = result;
          console.log(result);
          if (ok) {
            U.writeObjectP('jwt', body ?? {}).finally(() => {
              setJwt(body ?? {});
              setLoggedUser(notUsed => user);
              callback && callback();
            });
          } else {
            setErrorMessage(errorMessage ?? '');
          }
        });
    },
    []
  );

  useEffect(() => {
    // localStorage 의 jwt 값을 초기화할 때 사용
    const deleteToken = false;
    if (deleteToken) {
      U.writeObjectP('jwt', {})
        .then(() => {})
        .catch(() => {});
    } else {
      U.readObjectP('jwt')
        .then(jwt => setJwt(jwt ?? {}))
        .catch(() => {
          // 오류 무시
        });
      // 새로고침해도 로그인 상태유지
      U.readStringP('user')
        .then(user =>
          setLoggedUser(
            user === null ? undefined : user === '{}' ? undefined : JSON.parse(user)
          )
        )
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(notUsed => '');
    }
  }, [errorMessage]);

  const value = {
    jwt,
    errorMessage,
    loggedUser,
    login
  };
  return <AuthContext.Provider value={value} children={children} />;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
