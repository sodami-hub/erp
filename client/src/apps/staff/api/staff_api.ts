import {axiosClient} from '../../../share/api/axios';
import * as T from '../types';
import * as ST from '../../../share/types';

export const loadCommonCode = async (groupName: string) => {
  const res = await axiosClient.get<ST.ResponseType<T.CommonCode>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/commonCodeList/${groupName}`
  );
  return res.data;
};

export const saveCertInfo = async (certInfo: T.saveCertInfoRequest) => {
  const res = await axiosClient.post<ST.ResponseType<T.saveCertInfoResponse>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/saveCertificate`,
    certInfo
  );
  return res.data;
};

export const saveCertFile = async (file: FormData, certificateId: string) => {
  const res = await axiosClient.post<ST.ResponseType<any>>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/saveCertFile/${certificateId}`,
    file
  );
  return res.data;
};

export const loadStaffInfoList = async (status: string) => {
  const res = await axiosClient.get<T.GetStaffInfo[]>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staffs/${status}`
  );
  return res.data;
};

export const loadStaffCertInfo = async (staffId: string) => {
  const res = await axiosClient.get<T.saveCertInfoRequest[]>(
    `${process.env.REACT_APP_AUTH_AND_STAFF_SERVER}/staff/certificates/${staffId}`
  );
  return res.data;
};
