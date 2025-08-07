import type {GetStaffInfo} from '../../types';
import * as API from '../../api';
import {useEffect, useState} from 'react';
import * as ST from '../../../../share/types';
import * as U from '../../../../share/utils';

// status all(전체) | onDuty(근무중) | offDuty(퇴사) | break(휴직) | waiting(대기)
export const StaffList = ({
  status,
  getStaffId
}: {
  status: string;
  getStaffId: (staffDetail: GetStaffInfo) => void;
}) => {
  const [staffList, setStaffList] = useState<GetStaffInfo[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<number | undefined>(undefined);
  const commonCode: ST.CommonCodeListType = U.readObject('commonCode');

  useEffect(() => {
    (async (status: string) => {
      const staffList = await API.loadStaffInfoList(status);
      setStaffList(staffList.data);
      for (const staff of staffList.data) {
        staff.workType = staff.workType
          .split(',')
          .map(
            subCode =>
              commonCode?.work_type.find(code => code.subCode === subCode)?.codeName || ''
          )
          .join(',');
        staff.possibleWork = staff.possibleWork
          .split(',')
          .map(
            subCode =>
              commonCode?.work_list.find(code => code.subCode === subCode)?.codeName || ''
          )
          .join(',');
        staff.workStatus = staff.workStatus
          .split(',')
          .map(
            subCode =>
              commonCode?.work_status.find(code => code.subCode === subCode)?.codeName ||
              ''
          )
          .join(',');
      }
    })(status);
  }, [status, commonCode]);

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
