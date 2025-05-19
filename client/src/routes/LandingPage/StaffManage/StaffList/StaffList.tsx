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
  const [selectedStaff, setSelectedStaff] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (jwt) {
      get(`/staffs/${status}`)
        .then(resp => resp.json())
        .then((result: getStaffInfo[]) => {
          setStaffList(result);
        });
    } else {
      alert('토큰이 확인되지 않습니다. 다시 로그인해주세요.');
    }
  }, [status]);

  useEffect(() => {
    const findStr = selectedStaff + 'staff';
    const $staffInfo = document.getElementsByClassName('staffInfo');
    Array.from($staffInfo).forEach(node => {
      if (node.className.includes(findStr)) {
        node.className = node.className.replace('bg-white', 'bg-amber-300');
      } else {
        node.className = node.className.replace('bg-amber-300', 'bg-white');
      }
    });
  }, [selectedStaff]);

  const children = staffList?.map((value, index) => (
    <div
      key={index}
      className={`staffInfo ${index + 'staff'}  mt-2 border-2 border-gray-700 w-[95%] cursor-pointer bg-white`}
      onClick={() => {
        setSelectedStaff(index ?? undefined);
        getStaffId(value);
      }}>
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
