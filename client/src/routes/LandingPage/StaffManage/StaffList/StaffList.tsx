import {get} from '../../../../server';
import {useAuth} from '../../../../context';
import type {getStaffInfo} from './getStaffInfoType';
import {useEffect, useState} from 'react';

// status all(전체) | onDuty(근무중) | offDuty(퇴사) | break(휴직) | waiting(대기)
export const StaffList = ({status}: {status: string}) => {
  const {jwt} = useAuth();
  const [staffList, setStaffList] = useState<getStaffInfo[]>();

  useEffect(() => {
    if (jwt) {
      get(`/staffs/${status}`, jwt)
        .then(resp => resp.json())
        .then((result: getStaffInfo[]) => {
          setStaffList(result);
        });
    } else {
      alert('토큰이 확인되지 않습니다. 다시 로그인해주세요.');
    }
  }, [status]);

  return <div></div>;
};
