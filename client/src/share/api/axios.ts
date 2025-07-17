import axios from 'axios';
import * as U from '../utils';
import {readStringP, writeObject} from '../utils';
import * as T from '../auth/type';

// 새로운 토큰을 요청하는 API
const requestNewToken = async (refreshToken: string) => {
  const res = await axios.post<T.JwtToken>(
    'auth/newToken',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken
      }
    }
  );
  return res.data;
};

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true // refresh token을 위해 필요
});

// axios 인스턴스를 가져와 API 호출에 사용할 때마다 헤더가 Authorization자동으로 인터셉터에 포함됩니다
axiosClient.interceptors.request.use(
  async config => {
    const accessToken = readStringP('accessToken');
    // const locale = localStorage.getItem('locale');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken || ''}`;
      config.headers['language'] = 'KR';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 서버의 모든 응답을 가로채서 엑세스 토큰이 만료되어 response 로 새롭게 받아온 토큰으로 교체
axiosClient.interceptors.response.use(
  response => response,
  async err => {
    const currentPath = window.location.pathname; // 현재 경로를 가져옴
    const originalConfig = err.config; // 에러난 api 요청 정보

    // TODO : 로그인 페이지일 경우 토큰 갱신 시도하지 않음
    if (currentPath === '/') {
      return Promise.reject(err);
    }

    // 네트워크 오류
    if (err.code === 'ERR_NETWORK') {
      // 에러 페이지가 아닐 때만 리다이렉트
      if (!currentPath.startsWith('/error')) {
        // window.location.href = appRoutes.error + `?error=ERR_NETWORK&from=` + currentPath
      }
      return Promise.reject(err);
    }

    // 토큰 만료 에러 처리
    if (err.response?.status === 401) {
      // 이미 재시도한 경우는 다시 시도하지 않음
      if (originalConfig._retry) {
        // clearLocalStorage() jwt 초기화
        U.writeStringP('accessToken', '');
        U.writeStringP('refreshToken', '');
        // window.location.href = login + '?expired=true&from=' + currentPath
        return Promise.reject(err);
      }

      originalConfig._retry = true;

      try {
        // localStorage에서 refresh token 가져오기
        const refreshToken = readStringP('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // refresh token으로 새로운 token 요청
        const newToken = await requestNewToken(refreshToken);

        // 새로운 토큰 저장
        const result: T.JwtToken = newToken;
        const newAccessToken = newToken.accessToken;
        const newRefreshToken = newToken.refreshToken;

        if (newAccessToken) {
          localStorage.setItem('AccessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          writeObject('jwt', result);

          // 실패했던 원래 요청 다시 시도
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalConfig);
        } else {
          throw new Error('failed to get new access token');
        }
      } catch (refreshError) {
        // refresh token도 만료되었거나 갱신 실패한 경우 로그아웃
        // clearLocalStorage() jwt 초기화
        // window.location.href = login + '?expired=true&from=' + currentPath 로그인 페이지로 이동

        // 로그아웃 로직~ 컴포넌트에서...

        return Promise.reject(refreshError);
      }
    } else if (err.response.status === 404 || err.response.status === 500) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);
