import {
  ChangeEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {CertificateInfo} from '../../../../types';
import {fileUpload, post} from '../../../../server';
import {useAuth} from '../../../../share/auth/context';
import {useToggle} from '../../../../hooks';
import {CalendarModal, CalendarSelect, Value} from '../../../../share/components';
import moment from 'moment/moment';

export const AddCertModal = ({open, children}: PropsWithChildren<{open: boolean}>) => {
  const className = ['modal', open ? 'modal-open' : ''].join(' ');

  return <div className={className}>{children}</div>;
};

type addCertInfo = CertificateInfo & {};

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

  const {jwt} = useAuth();
  const clickSave = () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    if (jwt) {
      post('/staff/saveCertificate', certInfo, jwt)
        .then(res => res.json())
        .then((result: {ok: boolean; certificateId: string; errorMessage?: string}) => {
          const {ok, certificateId, errorMessage} = result;
          if (ok) {
            if (formData) {
              fileUpload(`/staff/saveCertFile/${certificateId}`, formData, jwt)
                .then(res => res.json())
                .then((result: {ok: boolean; errorMessage?: string}) => {
                  const {ok, errorMessage} = result;
                  if (!ok) {
                    alert('첨부자료 저장 실패 : ' + errorMessage);
                  } else {
                    alert('첨부자료 저장 성공');
                    return;
                  }
                });
            } else {
              return;
            }
            alert('자격증 정보 저장 성공');
          } else {
            alert('error : ' + errorMessage);
          }
        });
    } else {
      alert('인증 정보가 없습니다. 다시 로그인해주세요.');
      // 로그아웃 로직
      // 로그인 화면으로
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
