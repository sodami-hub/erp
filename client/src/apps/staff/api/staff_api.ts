import {axiosClient} from '../../../share/api/axios';
import * as T from '../types';

export const loadCommonCode = async () => {
  const res = await axiosClient.get<T.CommonCode>('/staff/commonCodeList');
  return res.data;
};

export const saveCertInfo = async (certInfo: T.saveCertInfoRequest) => {
  const res = await axiosClient.post<T.saveCertInfoResponse>(
    '/staff/saveCertificate',
    certInfo
  );
  return res.data;
};

export const saveCertFile = async (file: FormData, certificateId: string) => {
  const res = await axiosClient.post<T.saveCertFileResponse>(
    `/staff/saveCertFile/${certificateId}`,
    file
  );
  return res.data;
};
