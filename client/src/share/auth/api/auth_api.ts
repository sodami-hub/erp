import * as T from '../type';
import {axiosClient} from '../../api/axios';

export const staffLogin = async (info: T.LoginInfo) => {
  const res = await axiosClient.post<T.Response>('/auth/login', info);
  return res.data;
};

export const staffSignup = async (newStaff: T.SignupStaffInfo) => {
  const res = await axiosClient.post<T.Response>('/auth/signup', newStaff);
  return res.data;
};

export const staffFileUpload = async (file: FormData) => {
  // Content-Type을 바꿔야 되는데? 자동으로 바뀌나? ...
  const res = await axiosClient.post<T.Response>('/staff/saveDependentDocument', file);
  return res.data;
};
