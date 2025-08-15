import {ChangeEvent, useEffect, useState} from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export const Address = ({
  addr02,
  changed,
  initialize
}: {
  addr02: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  initialize: boolean;
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [address01, setAddress01] = useState('');

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        const addr01 = data.address + ' ' + data.zonecode;
        const func = changed('addr01');
        func({target: {value: addr01}} as ChangeEvent<HTMLInputElement>);
        setAddress01(addr01);
        alert('상세 주소를 입력해주세요.');
        console.log('addr01:', addr01);
        document.getElementById('addr02')?.focus();
      }
    }).open();
  };

  useEffect(() => {
    setAddress01('');
  }, [initialize]);

  return (
    <>
      <input
        type={'text'}
        className={'w-[41%] p-2 m-2 input input-primary'}
        id={'addr01'}
        name={'addr01'}
        placeholder={'주소'}
        value={address01}
        readOnly
        onClick={onClickAddr}
      />
      <input
        type={'text'}
        className={'w-[38%] p-2 m-2 input input-primary'}
        id={'addr02'}
        name={'addr02'}
        placeholder={'상세주소'}
        value={addr02}
        onChange={changed('addr02')}
      />
      <button className={'btn btn-primary m-2 p-2 w-[10%]'} onClick={onClickAddr}>
        주소 검색
      </button>
    </>
  );
};
