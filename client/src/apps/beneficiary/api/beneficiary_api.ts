import {axiosClient} from "../../../share/api/axios.ts";
import * as T from '../types'
import * as ST from '../../../share/types'

export const registerBeneficiary = async (data: T.RegisterBeneficiary) => {
  const res = await axiosClient.post<ST.ResponseType<any>>(
      `${import.meta.env.VITE_BENEFICIARY_SERVER}/register`,
      data
  );
  return res.data;
}

export const saveBeneficiaryAttachment = async(data:FormData) => {
  const res = await axiosClient.post<ST.ResponseType<any>>(
      `${import.meta.env.VITE_BENEFICIARY_SERVER}/saveAttachment`,
      data
  );
  return res.data;
}