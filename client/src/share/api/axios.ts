import axios from 'axios';
import * as U from '../utils';
import {changeSubCodeToCodeName, readStringP} from '../utils';

export const axiosClient = axios.create({
  headers: {
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
  response => {
    const newAccessToken = response.headers['Authorization'];
    if (newAccessToken && newAccessToken.startsWith('Bearer ')) {
      const newToken = newAccessToken.replace('Bearer ', '');
      U.writeStringP('accessToken', newToken);
    }
    console.log(response);
    for (let i = 0; i < response.data.data.length; i++) {
      response.data.data[i].possibleWork = changeSubCodeToCodeName(
        response.data.data[i].possibleWork
      );
      response.data.data[i].workType = changeSubCodeToCodeName(
        response.data.data[i].workType
      );
      response.data.data[i].workStatus = changeSubCodeToCodeName(
        response.data.data[i].workStatus
      );
    }

    return response;
  },
  async err => {
    return Promise.reject(err);
  }
);
