import {PropsWithChildren} from 'react';

export const AddCertModal = ({open, children}: PropsWithChildren<{open: boolean}>) => {
  const className = ['modal', open ? 'modal-open' : ''].join(' ');

  return <div className={className}>{children}</div>;
};

export const AddCerModalContents = ({modalToggle}: {modalToggle: () => void}) => {
  return (
    <div
      className={
        'bg-white text-black p-2 flex flex-col justify-center items-start rounded-box'
      }>
      <h2 className={'text text-black bold '}>자격증 정보를 입력하세요</h2>
      <input
        type={'text'}
        className={'input input-primary mt-2'}
        placeholder={'자격증명을 입력하세요.'}
        onChange={() => {}}
      />
      <input
        type={'text'}
        className={'input input-primary mt-2'}
        placeholder={'발급기관을 입력하세요.'}
        onChange={() => {}}
      />
      <button className={'btn btn-primary bg-black text-white mt-2'} onClick={() => {}}>
        발급일 :
      </button>
      <input type={'file'} accept={'image/*'} className={'file-input mt-2 text-white'} />
      <div className={'flex justify-end items-end w-full'}>
        <button className={'btn btn-primary mt-2'} onClick={() => modalToggle()}>
          저장
        </button>
        <button className={'btn btn-primary mt-2 ml-1'} onClick={() => modalToggle()}>
          취소
        </button>
      </div>
    </div>
  );
};
