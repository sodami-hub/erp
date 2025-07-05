import {FC, useEffect, useRef, useState} from 'react';
import {ReactDivProps} from '../../../types';

export type DependentsModalProps = ReactDivProps & {
  open?: boolean;
};

export const DependentsModal: FC<DependentsModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');

  return <div {...props} className={className} />;
};

export type DependentsContentsProps = ReactDivProps & {
  toggle: () => void;
  setNumbers: (value: string) => void;
  setMaterials: (data: FormData) => void;
  reset: boolean;
};

export const DependentsModalContents: FC<DependentsContentsProps> = ({
  toggle,
  setNumbers,
  setMaterials,
  reset
}) => {
  const [dependent, setDependent] = useState<string>('');
  const [file01, setFile01] = useState<File>();
  const [file02, setFile02] = useState<File>();

  /*
  <input type="file" />의 값은 React 상태를 통해 초기화할 수 없습니다.
  이는 보안상의 이유로 브라우저가 파일 입력 필드의 값을 직접 조작하는 것을 허용하지 않기 때문입니다.
  useRef를 사용한다.
   */
  const file01Ref = useRef<HTMLInputElement>(null);
  const file02Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFile01(undefined);
    setFile02(undefined);
    if (file01Ref.current) file01Ref.current.value = '';
    if (file02Ref.current) file02Ref.current.value = '';
  }, [reset]);

  const onSubmit = (dependent: string) => {
    const formData = new FormData();
    if (file01) {
      formData.append('file01', file01);
    }
    if (file02) {
      formData.append('file02', file02);
    }
    setNumbers(dependent);
    setMaterials(formData);
    setDependent('');
    toggle();
  };

  return (
    <div
      className={
        'flex flex-col justify-center items-center bg-white text-black w-1/3 h-1/3 rounded-box'
      }>
      <input
        type={'number'}
        className={'input input-primary text-white text-center'}
        placeholder={'부양가족 수를 입력하세요.(0~9) 숫자로 입력하세요.'}
        value={dependent}
        onChange={e => {
          setDependent(e.target.value);
        }}
      />
      <div className={'flex flex-col justify-center items-start'}>
        <span className={'text-black -mb-2 mt-2'}>주민등록등본</span>
        <input
          type={'file'}
          className={'file-input mt-2 text-white'}
          accept={'image/*'}
          ref={file01Ref}
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setFile01(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className={'flex flex-col justify-center items-start'}>
        <span className={'text-black -mb-2 mt-2'}>가족관계증명서</span>
        <input
          type={'file'}
          className={'file-input mt-2 text-white'}
          accept={'image/*'}
          ref={file02Ref}
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setFile02(e.target.files[0]);
            }
          }}
        />
      </div>
      <button className={'btn btn-primary mt-2'} onClick={() => onSubmit(dependent)}>
        확인
      </button>
    </div>
  );
};
