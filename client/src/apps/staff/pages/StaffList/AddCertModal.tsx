import {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {SaveCertInfoRequest} from '../../types';
import {useToggle} from '../../../../share/hooks';
import {CalendarModal, CalendarSelect, Value} from '../../../../share/components';
import * as API from '../../api';
import moment from 'moment/moment';

export const AddCertModal = ({open, children}: PropsWithChildren<{open: boolean}>) => {
  const className = ['modal', open ? 'modal-open' : ''].join(' ');

  return <div className={className}>{children}</div>;
};

type addCertInfo = SaveCertInfoRequest & {};

const initAddCertInfo: addCertInfo = {
  staffId: '',
  certificateName: '',
  organization: '',
  issueDate: ''
};

export const AddCertModalContents = ({
  modalToggle,
  id
}: {
  modalToggle: () => void;
  id: string;
}) => {
  const [certInfo, setCertInfo] = useState<addCertInfo>(initAddCertInfo);

  useEffect(() => {
    setCertInfo(obj => ({...obj, staffId: id}));
  }, [certInfo.staffId]);

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCertInfo(obj => ({...obj, [key]: e.target.value}));
      console.log(key, e.target.value);
    },
    []
  );

  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clickSave = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    const saveInfo = await API.saveCertInfo(certInfo);
    const id = saveInfo.data.certificateId;
    if (saveInfo.ok) {
      console.log('직원 자격증 정보 저장 성공');
      if (formData) {
        const saveFile = await API.saveCertFile(formData, id);
        if (!saveFile.ok) {
          alert(saveFile.message ?? '자격증 첨부문서 저장 에러');
        }
      }
    } else {
      alert(saveInfo.message ?? '자격증 정보 저장 에러');
    }
    modalToggle();
    setCertInfo(initAddCertInfo);
    setFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clickCancel = () => {
    modalToggle();
    setFile(undefined);
    setCertInfo(initAddCertInfo);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const [calendarOpen, toggleCalendar] = useToggle();
  const selectIssueDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      changed('issueDate')({
        target: {value: formattedDate}
      } as ChangeEvent<HTMLInputElement>);
    }
    toggleCalendar();
  }, []);

  return (
    <div
      className={
        'bg-white text-black p-2 flex flex-col justify-center items-start rounded-box'
      }>
      <h2 className={'text text-black bold '}>자격증 정보를 입력하세요</h2>
      <input
        type={'text'}
        className={'input input-primary mt-2 text-white'}
        value={certInfo.certificateName}
        placeholder={'자격증명을 입력하세요.'}
        onChange={changed('certificateName')}
      />
      <input
        type={'text'}
        className={'input input-primary mt-2 text-white'}
        value={certInfo.organization}
        placeholder={'발급기관을 입력하세요.'}
        onChange={changed('organization')}
      />
      <input
        type={'button'}
        className={'btn btn-primary bg-black text-white mt-2'}
        onClick={toggleCalendar}
        value={'발급일 : ' + certInfo.issueDate}
      />
      <CalendarModal open={calendarOpen}>
        <CalendarSelect onDateChange={selectIssueDate} toggle={toggleCalendar} />
      </CalendarModal>
      <input
        type={'file'}
        ref={fileInputRef}
        accept={'image/*'}
        className={'file-input mt-2 text-white'}
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <div className={'flex justify-end items-end w-full'}>
        <button className={'btn btn-primary mt-2'} onClick={() => clickSave()}>
          저장
        </button>
        <button className={'btn btn-primary mt-2 ml-1'} onClick={() => clickCancel()}>
          취소
        </button>
      </div>
    </div>
  );
};
