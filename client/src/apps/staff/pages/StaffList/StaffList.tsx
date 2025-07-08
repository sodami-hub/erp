import {get} from '../../../../share/server';
import {useAuth} from '../../../../share/auth/context';
import type {GetStaffInfo} from '../../types';
import {useEffect, useState} from 'react';

// status all(전체) | onDuty(근무중) | offDuty(퇴사) | break(휴직) | waiting(대기)
export const StaffList = ({
  status,
  getStaffId
}: {
  status: string;
  getStaffId: (staffDetail: GetStaffInfo) => void;
}) => {
  const {jwt} = useAuth();
  const [staffList, setStaffList] = useState<GetStaffInfo[]>();
  const [selectedStaff, setSelectedStaff] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (jwt) {
      get(`/staffs/${status}`)
        .then(resp => resp.json())
        .then((result: GetStaffInfo[]) => {
          setStaffList(result);
        });
    } else {
      alert('토큰이 확인되지 않습니다. 다시 로그인해주세요.');
      // 로그아웃 처리 후, 로그인 화면으로
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
