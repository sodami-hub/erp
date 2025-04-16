import {ChangeEvent, useCallback, useState} from 'react';

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
  return (
    <section className={'flex flex-col w-80 ml-3 mt-3'}>
      <button className={'btn btn-accent w-full mb-1.5'} onClick={() => {}}>
        신규 직원 등록
      </button>
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
        <button type={'submit'} className={'btn btn-primary w-1/4'} onClick={() => {}}>
          검색
        </button>
      </div>
      <button className={'btn btn-primary mt-4 bg-amber-800'} onClick={() => {}}>
        롱텀 직원정보 동기화
      </button>
    </section>
  );
}
