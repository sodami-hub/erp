import * as T from '../type';
import {axiosClient} from '../../api/axios';

export const staffLogin = async (info: T.LoginInfo) => {
  const res = await axiosClient.post<T.Response>('/auth/login', info);
  return res.data;
};

export const staffSignup = async (newStaff: T.SignupStaffInfo) => {};
