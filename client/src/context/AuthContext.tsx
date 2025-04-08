import type {FC, PropsWithChildren} from 'react';
import {createContext, useContext, useState, useCallback, useEffect} from 'react';
import * as U from '../utils';
import {post} from '../server';

export type LoggedUser = {organizationId: string; id: string; password: string};

type Callback = () => void;

// 먼저 login 부분만 구현해본다.
type ContextType = {
  jwt?: string;
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
  const [jwt, setJwt] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const login = useCallback(
    (organizationId: string, id: string, password: string, callback?: Callback) => {
      const user = {organizationId, id, password};
      U.readStringP('jwt')
        .then(jwt => {
          setJwt(jwt ?? '');
          return post('/auth/login', user, jwt);
        })
        .then(res => res.json())
        .then((result: {ok: boolean; errorMessage?: string}) => {
          if (result.ok) {
            setLoggedUser(notUsed => user);
            callback && callback();
          } else {
            setErrorMessage(result.errorMessage ?? '');
          }
        });
    },
    []
  );

  useEffect(() => {
    // localStorage 의 jwt 값을 초기화할 때 사용
    const deleteToken = false;
    if (deleteToken) {
      U.writeStringP('jwt', '')
        .then(() => {})
        .catch(() => {});
    } else {
      U.readStringP('jwt')
        .then(jwt => setJwt(jwt ?? ''))
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
