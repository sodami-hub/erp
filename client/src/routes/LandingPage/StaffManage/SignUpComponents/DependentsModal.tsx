import {FC, useState} from 'react';
import {ReactDivProps} from '../../../../components';

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
  setMaterials: (data: FormData[]) => void;
};

export const DependentsModalContents: FC<DependentsContentsProps> = ({
  toggle,
  setNumbers,
  setMaterials
}) => {
  const [dependent, setDependent] = useState<string>('');
  const [fileList, setFileList] = useState<FileList>();

  const onSubmit = (dependent: string) => {
    const formDataArray = fileList
      ? Array.from(fileList).map(file => {
          const formData = new FormData();
          formData.append('file', file);
          return formData;
        })
      : [];

    setNumbers(dependent);
    setMaterials(formDataArray);
    toggle();
  };

  const appendData = (data: FileList) => {
    setFileList(prev => {
      if (!prev) return data;

      // DataTransfer 객체를 사용해서  fileList 상태 업데이트 (fileList 추가)
      const dataTransfer = new DataTransfer();
      Array.from(prev).forEach(file => dataTransfer.items.add(file));
      Array.from(data).forEach(file => dataTransfer.items.add(file));
      return dataTransfer.files;
    });
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
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              appendData(e.target.files);
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
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              appendData(e.target.files);
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
