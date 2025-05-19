import {ChangeEvent, useCallback, useState} from 'react';
import {useToggle} from '../../../hooks';
import {SignUpModal, SignUpModalContent} from './SignUpModal';
import {
  getStaffInfo as staffDetail,
  StaffDetails as StaffDetailsView,
  StaffList
} from './StaffList';

type NameSearch = Record<'name', string>;
const initialSearchState = {name: ''};

export default function StaffInfo() {
  // 신규 직원 등록 모달창 토글
  const [open, toggleOpen] = useToggle(false);

  // 직원 이름 검색
  const [{name}, setName] = useState<NameSearch>(initialSearchState);
  const changedSearchValue = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setName(obj => ({...obj, [key]: e.target.value}));
    },
    []
  );

  // 직원들의 근무 상태에 따른 직원 검색 전체, 근무, 대기, 휴직, 퇴사 - 기본 값은 '전체'
  const [staffListStatus, setStaffListStatus] = useState<
    'all' | 'onDuty' | 'offDuty' | 'break' | 'waiting'
  >('all');

  // 직원의 기본정보 클릭시 직원 상세정보의 세부 구분
  const [staffInfoStatus, setStaffInfoStatus] = useState<
    'basic' | 'payContract' | 'attendance' | undefined
  >(undefined);

  // 기본정보 클릭시 직원의 상세정보 노출
  const [staffDetail, setStaffDetail] = useState<staffDetail>();

  const getStaffInfo = useCallback((clickedStaff: staffDetail) => {
    setStaffDetail(clickedStaff);
    setStaffInfoStatus('basic');
  }, []);

  return (
    <section className={'flex flex-row w-full h-full'}>
      <div
        className={
          'flex flex-col justify-start items-center w-96 border-r-2 border-black bg-gray-200 h-[100%]'
        }>
        <div className={'w-[96%] m-3'}>
          <button className={'btn btn-accent w-full mb-1.5'} onClick={toggleOpen}>
            신규 직원 등록
          </button>
          <SignUpModal open={open}>
            <div className={'bg-gray-200 w-[65%] rounded-lg relative min-w-[830px]'}>
              <SignUpModalContent onCloseIconClicked={toggleOpen} isOpen={open} />
            </div>
          </SignUpModal>

          <div className={'flex flex-row w-full mb-1.5'}>
            <button
              className={'btn w-1/5 bg-blue-700 text-white text-xs'}
              onClick={() => {
                setStaffListStatus('all');
              }}>
              전체
            </button>
            <button
              className={'btn w-1/5 bg-white text-black text-xs'}
              onClick={() => {
                setStaffListStatus('onDuty');
              }}>
              근무
            </button>
            <button
              className={'btn w-1/5 bg-white text-black text-xs'}
              onClick={() => {
                setStaffListStatus('waiting');
              }}>
              대기
            </button>
            <button
              className={'btn w-1/5 bg-white text-black text-xs'}
              onClick={() => {
                setStaffListStatus('break');
              }}>
              휴직
            </button>
            <button
              className={'btn w-1/5 bg-white text-black text-xs'}
              onClick={() => {
                setStaffListStatus('offDuty');
              }}>
              퇴사
            </button>
          </div>
          <div className={'flex flex-row w-full'}>
            <input
              type={'text'}
              className={'w-3/4 input text-white'}
              value={name}
              onChange={changedSearchValue('name')}
            />
            <button
              type={'submit'}
              className={'btn btn-primary w-1/4 ml-0.5'}
              onClick={() => {}}>
              검색
            </button>
          </div>
          <button className={'btn btn-primary mt-4 bg-amber-800'} onClick={() => {}}>
            롱텀 직원정보 동기화
          </button>
        </div>
        <div className={'mt-3.5 w-full'}>
          <h2 className={'text text-black'}>Staff List</h2>
          <StaffList status={staffListStatus} getStaffId={getStaffInfo} />
        </div>
      </div>
      {staffInfoStatus && (
        <div className={'flex flex-col w-[95%] bg-gray-200'}>
          <div className={'flex flex-row items-center justify-between m-1 bg-gray-200'}>
            <div className={''}>
              <button
                className={'btn btn-secondary'}
                onClick={() => {
                  setStaffInfoStatus('basic');
                }}>
                기본정보
              </button>
              <button
                className={'btn btn-secondary'}
                onClick={() => {
                  setStaffInfoStatus('payContract');
                }}>
                급여계약
              </button>
              <button
                className={'btn btn-secondary'}
                onClick={() => {
                  setStaffInfoStatus('attendance');
                }}>
                출근부 관리
              </button>
            </div>
            <button className={'btn btn-primary'}>문서 목록</button>
          </div>
          {staffInfoStatus === 'basic' && staffDetail && (
            <StaffDetailsView staffDetail={staffDetail} />
          )}
        </div>
      )}
    </section>
  );
}
