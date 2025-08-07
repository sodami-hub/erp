import * as T from '../types';
import * as ST from '../../types';
import {axiosClient} from '../../api/axios';

export const staffLogin = async (info: T.LoginInfo) => {
  const res = await axiosClient.post<ST.ResponseType<any>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/auth/login`,
    info
  );
  return res.data;
};

export const staffSignup = async (newStaff: T.SignupStaffRequest) => {
  const res = await axiosClient.post<ST.ResponseType<any>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/auth/signup`,
    newStaff
  );
  return res.data;
};

export const staffFileUpload = async (file: FormData) => {
  // Content-Type을 바꿔야 되는데? 자동으로 바뀌나? ...
  const res = await axiosClient.post<ST.ResponseType<any>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/saveDependentDocument`,
    file
  );
  return res.data;
};

export const loadCommonCode = async () => {
  const res = await axiosClient.get<ST.ResponseType<ST.AllCommonCodeResp>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/commonCodeList/all`
  );
  return res.data;
};
