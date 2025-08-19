import * as ST from '../../../share/types';
import * as T from '../types';
import {ChangeEvent, FC, useCallback, useState} from 'react';
import * as C from '../../../share/components/EtcComponents';

export const RegisterModal: FC<ST.ModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};

//============= 모달 컨텐츠 ====================================
/*
수급자 정보 : 수급자명 / 성별 / 생년월일 / 연락처 / 주소 / RFID설치 / 수급현황 / 본인부담률 / 기저질환 / 수신방법 /
              인정번호 / 인정시작일 / 인정종료일 / 인정등급 / 계약일 / 계약시작일 / 계약종료일 / 서비스 / 기초평가 /
              당월 일정등록 / 다음월 일정등록 / 급여계시일 / 급여 시작일 / 급여종료일 / 요양 보호사
 */

type RegisterBeneficiaryFormType = T.RegisterBeneficiary & {
  addr01?: string;
  addr02?: string;
};

// prettier-ignore
const initialFormState: RegisterBeneficiaryFormType = {
  addr01: '',
  addr02: '',
  address: '',
  basicEvaluation: '',
  birth: '',
  contractBeginDate: '',
  contractDate: '',
  contractEndDate: '',
  gender: '',
  name: '',
  nextMonthPlan: '',
  nursingCareWorker: '',
  phone: '',
  receiveMethod: '',
  recognitionBeginDate: '',
  recognitionEndDate: '',
  recognitionLevel: '',
  recognitionNumber: '',
  rfid: '',
  selfPaymentRate: '',
  serviceType: '',
  supplyEndDate: '',
  supplyRevelationDate: '',
  supplyStartDate: '',
  supplyStatus: '',
  thisMonthPlan: '',
  underDisease: ''
};

export const RegisterModalContents: FC<ST.ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const className = ['relative', _className].join(' ');
  const closeIconClassName =
    _closeIconClassName ?? 'btn-primary btn-outline material-icons';

  const [registerForm, setRegisterForm] =
    useState<RegisterBeneficiaryFormType>(initialFormState);

  const changeState = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setRegisterForm(value => ({...value, [key]: e.target.value}));
      console.log('신규 수급자 정보 ' + key, e.target.value);
    },
    []
  );

  const [reset, formReset] = useState<boolean>(false);

  return (
    <div {...props} className={className}>
      <div className={'absolute text-2xl text-black cursor-pointer'}>
        <span
          className={closeIconClassName}
          onClick={() => {
            onCloseIconClicked();
            setRegisterForm(initialFormState);
            formReset(value => !value);
          }}>
          close
        </span>
      </div>
      <div className={'text-center text-black text-xl font-bold mb-2'}>수급자 등록</div>
      <div className={'flex flex-row flex-wrap justify-center w-full'}>
        {/* ==================  수급자 등록 폼 ==============*/}
        <C.Name
          changed={changeState}
          value={registerForm.name}
          className={'w-[15%] p-2 m-2 input input-primary'}
        />
        <C.Gender
          value01={'남'}
          value02={'여'}
          changed={changeState}
          reset={reset}
          className={
            'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
          }
        />
        <C.SelectCalender
          value={registerForm.birth}
          changed={changeState}
          name={'birth'}
          valuePrefix={'생년월일'}
          className={'w-[18%] p-2 m-2 btn text-xs'}
        />
        <C.Phone
          changed={changeState}
          value={registerForm.phone}
          className={'w-1/6 p-2 m-2 input input-primary'}
        />
        <button type={'button'} className={'btn btn-accent p-2 m-2'} onClick={() => {}}>
          태그/비콘 조회
        </button>
        <input
          type={'text'}
          placeholder={'RFID'}
          className={'input input-primary w-[10%] py-2 my-2 -ml-2'}
          value={registerForm.rfid}
          onChange={changeState('rfid')}
        />
        <C.Address
          addr02={registerForm.addr02 ?? ''}
          changed={changeState}
          initialize={reset}
        />

        {/* =================== 수급자 등록 영역 =================*/}
      </div>
    </div>
  );
};
