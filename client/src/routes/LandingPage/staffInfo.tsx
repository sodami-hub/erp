import {ChangeEvent, useCallback, useState} from 'react';
import {useToggle} from '../../hooks';
import {ModalAction, ModalContent, SignUpModal} from '../../components';

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

  const [open, toggleOpen] = useToggle(false);
  const onAccept = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  return (
    <section className={'flex flex-col w-80 ml-3 mt-3'}>
      <button className={'btn btn-accent w-full mb-1.5'} onClick={toggleOpen}>
        신규 직원 등록
      </button>
      <SignUpModal open={open}>
        <div className={'bg-gray-500 w-3/4 rounded-xl relative'}>
          <ModalContent
            className={'full'}
            onCloseIconClicked={toggleOpen}
            closeIconClassName={'btn-primary btn-outline btn-sm material-icons'}>
            <div className={'text-center text-black text-xl font-bold mb-2'}>
              직원 등록
            </div>
            <div className={'flex flex-col w-full'}>
              <input
                type={'text'}
                className={'w-full p-3 mb-4 input input-primary'}
                name={'name'}
                placeholder={'이름'}
              />
              <input
                type={'text'}
                className={'w-full p-3 mb-4 input input-primary'}
                name={'phoneNumber'}
                placeholder={'전화번호'}
              />
              <input
                type={'text'}
                className={'w-full p-3 mb-4 input input-primary'}
                name={'address'}
                placeholder={'주소'}
              />
            </div>
          </ModalContent>
          <ModalAction>
            <button className={'btn btn-accent mb-1 mr-1'} onClick={onAccept}>
              등록
            </button>
          </ModalAction>
        </div>
      </SignUpModal>

      <div className={'flex flex-row w-full mb-1.5'}>
        <button className={'btn w-1/5 bg-blue-700 text-white'} onClick={() => {}}>
          전체
        </button>
        <button className={'btn w-1/5 bg-white text-black'} onClick={() => {}}>
          근무
        </button>
        <button className={'btn w-1/5 bg-white text-black'} onClick={() => {}}>
          대기
        </button>
        <button className={'btn w-1/5 bg-white text-black'} onClick={() => {}}>
          휴직
        </button>
        <button className={'btn w-1/5 bg-white text-black'} onClick={() => {}}>
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
    </section>
  );
}
