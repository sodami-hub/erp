import {get} from '../../../../server';
import {useAuth} from '../../../../context';
import type {getStaffInfo} from './getStaffInfoType';
import {useEffect, useState} from 'react';

// status all(전체) | onDuty(근무중) | offDuty(퇴사) | break(휴직) | waiting(대기)
export const StaffList = ({
  status,
  getStaffId
}: {
  status: string;
  getStaffId: (staffDetail: getStaffInfo) => void;
}) => {
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

  // 시스템 관리자는 직원 정보에서 제외한다.
  const list = staffList?.filter(value => value.name !== 'admin');

  const children = list?.map((value, index) => (
    <div
      key={index}
      className={'mt-2 border-2 border-gray-700 w-[95%] cursor-pointer bg-white'}
      onClick={() => getStaffId(value)}>
      <div
        className={
          'text text-xs text-black flex flex-row justify-evenly items-center w-full'
        }>
        <span>{value.workStatus}</span>
        <span>{value.contractStatus}</span>
        <span>{value.workType ? value.workType.split(',')[0] : ''}</span>
      </div>
      <div
        className={'text text-xs text-black flex flex-row justify-evenly items-center'}>
        <span>{value.name}</span>
        <span>{value.birth}</span>
        <span>{value.possibleWork}</span>
      </div>
    </div>
  ));

  return <div className={'flex flex-col justify-center items-center'}>{children}</div>;
};
