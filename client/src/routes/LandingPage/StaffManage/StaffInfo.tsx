import {ChangeEvent, useCallback, useState} from 'react';
import {useToggle} from '../../../hooks';
import {SignUpModal, SignUpModalContent} from './SignUpModal';

type NameSearch = Record<'name', string>;
const initialSearchState = {name: ''};

export default function StaffInfo() {
  const [{name}, setName] = useState<NameSearch>(initialSearchState);

  const changedSearchValue = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setName(obj => ({...obj, [key]: e.target.value}));
    },
    []
  );

  const [staffListStatus, setStaffListStatus] = useState<
    'all' | 'onDuty' | 'offDuty' | 'break' | 'waiting'
  >('all');

  const [open, toggleOpen] = useToggle(false);

  return (
    <section className={'flex flex-row w-full ml-3 mt-3'}>
      <div
        className={
          'flex flex-col justify-center items-center w-96 p-1 border-r-2 border-black'
        }>
        <div className={'w-[96%]'}>
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
              className={'btn w-1/5 bg-blue-700 text-white'}
              onClick={() => {
                setStaffListStatus('all');
              }}>
              전체
            </button>
            <button
              className={'btn w-1/5 bg-white text-black'}
              onClick={() => {
                setStaffListStatus('onDuty');
              }}>
              근무
            </button>
            <button
              className={'btn w-1/5 bg-white text-black'}
              onClick={() => {
                setStaffListStatus('waiting');
              }}>
              대기
            </button>
            <button
              className={'btn w-1/5 bg-white text-black'}
              onClick={() => {
                setStaffListStatus('break');
              }}>
              휴직
            </button>
            <button
              className={'btn w-1/5 bg-white text-black'}
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
        <hr className={'w-[396px] border-2 border-gray-600 mt-2 -ml-12 -mr-9'} />
        <div className={'mt-3.5'}>
          <h2 className={'text text-black'}>Staff List</h2>
          {/*  스탭 리스트*/}
        </div>
      </div>
    </section>
  );
}
