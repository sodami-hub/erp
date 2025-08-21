import * as ST from '../../../share/types';
import * as T from '../types';
import {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import * as EC from '../../../share/components/EtcComponents';
import * as SC from '../../../share/components';
import * as C from '../../../share/components';
import {useToggle} from "../../../share/hooks";
import * as U from '../../../share/utils';
import * as API from '../api'

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
  institutionId:'',
  address: '',
  birth: '',
  contractBeginDate: '',
  contractDate: '',
  contractEndDate: '',
  gender: '',
  name: '',
  phone: '',
  counselMemo:'',
  recognitionBeginDate: '',
  recognitionEndDate: '',
  recognitionLevel: '',
  recognitionNumber: '',
  rfid: '',
  selfPaymentRate: '',  // 본인부담율
  serviceType: '',
  supplyStatus: '',
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
  const user:ST.LoggedUserInfo = U.readObject('user');
  const [reset, formReset] = useState<boolean>(false);
  const [attachment,setAttachment] = useState<FormData | undefined>(undefined)
  const [attachmentInfo, setAttachmentInfo] = useState<string>('서류없음')

  useEffect(() => {
    const info = () => {
      if (attachment) {
        const count = Array.from(attachment.keys()).length;
        let name = '서류없음'
        for (const [_, value] of attachment.entries()) {
          if( value instanceof File) {
            name= value.name ?? '서류 없음';
            break;
          }
        }
        if(count >1) {
          return name+' 외 '+(count-1).toString()+'건';
        } else {
          return name;
        }
      } else {
        return '서류 없음'
      }
    }
    setAttachmentInfo(info);
  }, [attachment,reset]);


  // ================= 모달 토글
  const [serviceTypeModalOpen, toggleServiceTypeModal] = useToggle(false)
  const [selfPaymentRateModalOpen, toggleSelfPaymentRateModal] = useToggle(false)
  const [recognitionLevelModalOpen,toggleRecognitionLevelModal]=useToggle(false)
  const [fileAttachmentModalOpen,toggleFileAttachmentModal]=useToggle(false)

  // ================================

  const registerBeneficiary= async () => {
    const updatedForm = {...registerForm, institutionId: user.institutionId, supplyStatus: '상담중'};
    setRegisterForm(updatedForm);
    const res01 = await API.registerBeneficiary(updatedForm);
    if(!res01.ok) {
      alert('신규 수급자 등록 에러' + res01.message)
      return;
    }
    // else {
    //   if(attachment) {
    //     const res02 = await API.saveBeneficiaryAttachment(attachment);
    //     if(!res02.ok) {
    //       alert('신규 수급자 첨부 서류 저장 실패' + res02.message);
    //       return
    //     }
    //   }
    // }
    setRegisterForm(initialFormState)
    formReset(value =>!value)
    alert('신규 수급자 저장 성공')
  }

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

        <SC.InputComponent name={'name'} type={'text'} value={registerForm.name} onChange={changeState('name')}
          className={'w-[15%] p-2 m-2 input input-primary'} required={true} placeholder={'이름'}/>

        <EC.Gender
          name={'gender'}
          changed={changeState}
          reset={reset}
          className={
            'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
          }
        />

        <EC.SelectCalender
          value={registerForm.birth}
          changed={changeState}
          name={'birth'}
          valuePrefix={'생년월일'}
          className={'w-[20%] p-2 m-2 btn btn-primary text-xs'}
        />

        <SC.InputComponent name={'phone'} type={'text'} value={registerForm.phone} onChange={changeState('phone')}
          className={'w-[19%] p-2 m-2 input input-primary'} required={true} placeholder={'전화번호'}/>

        <button type={'button'} className={'btn btn-primary p-2 m-2'} onClick={() => {}}>
          태그/비콘 조회
        </button>
        <SC.InputComponent name={'rfid'} type={'text'} value={registerForm.rfid} onChange={changeState('rfid')}
          placeholder={'RFID'} className={'input input-primary w-[10%] py-2 my-2 -ml-1'}/>

        <EC.Address
          addr02={registerForm.addr02 ?? ''}
          changed={changeState}
          initialize={reset}
        />

        <button className={'btn btn-primary m-2 p-2 w-[8%] text-md'} onClick={toggleServiceTypeModal}>
          서비스
        </button>
        <span className={'border-2 border-black w-[23%] p-2 my-2 mr-2 -ml-1 text-black text-sm'}>
          {registerForm.serviceType}
        </span>
        <SC.CheckBoxModal open={serviceTypeModalOpen}>
          <SC.CheckBoxComponent name={'serviceType'} toggle={toggleServiceTypeModal} checkList={['방문요양','방문목욕','방문간호']} changed={changeState} reset={reset}/>
        </SC.CheckBoxModal>

        <button
            className={'btn btn-primary m-2 p-2 w-[12%] text-md'}
            onClick={toggleSelfPaymentRateModal}>
          본인 부담율
        </button>
        <span
            className={
              'border-2 border-black w-[11%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
            }>
          {registerForm.selfPaymentRate}
        </span>
        <C.RadioButtonModal open={selfPaymentRateModalOpen}>
          <C.RadioButtonComponent changed={changeState} name={'selfPaymentRate'} toggle={toggleSelfPaymentRateModal} buttonList={['15%(일반)', '9%(감경40%)','6%(감경60%)','0%(기초)']} reset={reset}/>
        </C.RadioButtonModal>

        <SC.InputComponent name={'underDisease'} type={'text'} value={registerForm.counselMemo} onChange={changeState('counselMemo')}
          className={'w-[39%] p-2 m-2 input input-primary'} placeholder={'상담메모'}/>

        <SC.InputComponent name={'recognitionNumber'} type={'text'} value={registerForm.recognitionNumber} onChange={changeState('recognitionNumber')}
                           className={'w-[20%] p-2 m-2 input input-primary'} placeholder={'인정번호'}/>

        <button
            className={'btn btn-primary m-2 p-2 w-[12%] text-md'}
            onClick={toggleRecognitionLevelModal}>
          인정 등급
        </button>
        <span
            className={
              'border-2 border-black w-[13%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
            }>
          {registerForm.recognitionLevel}
        </span>
        <C.RadioButtonModal open={recognitionLevelModalOpen}>
          <C.RadioButtonComponent changed={changeState} name={'recognitionLevel'} toggle={toggleRecognitionLevelModal} buttonList={['1등급','2등급','3등급','4등급','5등급','인지지원등급']} reset={reset}/>
        </C.RadioButtonModal>

        <EC.SelectCalender
            value={registerForm.recognitionBeginDate}
            changed={changeState}
            name={'recognitionBeginDate'}
            valuePrefix={'인정 시작일'}
            className={'w-[23%] p-2 m-2 btn btn-primary text-sm'}
        />

        <EC.SelectCalender
            value={registerForm.recognitionEndDate}
            changed={changeState}
            name={'recognitionEndDate'}
            valuePrefix={'인정 종료일'}
            className={'w-[23%] p-2 m-2 btn btn-primary text-sm'}
        />

        <EC.SelectCalender
            value={registerForm.contractDate}
            changed={changeState}
            name={'contractDate'}
            valuePrefix={'계약일'}
            className={'w-[23%] p-2 m-2 btn btn-primary text-sm'}
        />
        <EC.SelectCalender
            value={registerForm.contractBeginDate}
            changed={changeState}
            name={'contractBeginDate'}
            valuePrefix={'계약시작일'}
            className={'w-[23%] p-2 m-2 btn btn-primary text-sm'}
        />
        <EC.SelectCalender
            value={registerForm.contractEndDate}
            changed={changeState}
            name={'contractEndDate'}
            valuePrefix={'계약종료일'}
            className={'w-[23%] p-2 m-2 btn btn-primary text-sm'}
        />


        <button
            className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
            onClick={toggleFileAttachmentModal}>
          서류 추가
        </button>
        <span
            className={
              'border-2 border-black w-[12%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
            }>
          {attachmentInfo}
        </span>
        <C.FileAttachmentModal open={fileAttachmentModalOpen}>
          <C.FileAttachmentContents componentName={'인정서류추가'} toggle={toggleFileAttachmentModal} setMaterials={setAttachment} reset={reset}/>
        </C.FileAttachmentModal>



        {/* =================== 수급자 등록 영역 =================*/}
      </div>
      <div className={'flex flex-row justify-end items-center'}>
        <button
            type={'submit'}
            className={'btn btn-secondary m-4'}
            onClick={registerBeneficiary}>
          신규 수급자 등록
        </button>
      </div>
    </div>
  );
};
