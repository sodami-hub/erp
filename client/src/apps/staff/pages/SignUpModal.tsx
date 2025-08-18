import {ChangeEvent, FC, useCallback, useState} from 'react';
import {useAuth} from '../../../share/auth/context';
import * as SC from '../../../share/components/SignupModalComponents';
import * as C from '../../../share/components';
import * as T from '../types';
import * as ST from '../../../share/types';
import * as U from '../../../share/utils';
import {useToggle} from "../../../share/hooks";

// ============ 신규 직원 등록 모달 =====================
export const SignUpModal: FC<ST.ModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};
// ====================================================

// ================= 신규 회원 등록을 위한 type 및 초깃값 정의 ============================
type SignupFormType = T.SignupStaffInfo & {
  addr01?: string;
  addr02?: string;
};

// prettier-ignore
const initialFormState: SignupFormType = {
  name: '', gender: '', birth: '', phone: '', password: '', email: '', address: '',
  joinDate: '', contractStatus: '', dependents: '', w4c: '',
  possibleWork: '', workType: '', workStatus: '', addr01: '', addr02: ''
};
// =========================================================================

export const SignUpModalContent: FC<ST.ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const className = ['relative', _className].join(' ');
  const closeIconClassName =
    _closeIconClassName ?? 'btn-primary btn-outline material-icons';

  const {signup} = useAuth();

  // form 정보 리셋을 위한 값
  const [reset, setReset] = useState(false);

  const CommonCode: ST.CommonCodeListType = U.readObject('commonCode');

  //============= 직원등록 폼 정보 초깃값 설정 및 변경사항 저장 ==================
  //prettier-ignore
  const [
    signupForm,
    setSignupForm
  ] = useState<SignupFormType>(initialFormState);

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setSignupForm(obj => ({...obj, [key]: e.target.value}));
      if (key === 'addr01' || key === 'addr02') {
        console.log('주소 변경');
        setSignupForm(obj => ({...obj, address: obj.addr01 + ' ' + obj.addr02}));
      }
      console.log(key, e.target.value);
    },
    []
  );
  // ==================================================

  // ============= 부양가족 첨부서류 업로드 ================
  const [material, setMaterial] = useState<FormData | undefined>(undefined);

  const submitMaterial = useCallback((data: FormData) => {
    setMaterial(data);
    console.log(data.get('file01'));
    console.log(data.get('file02'));
  }, []);
  // ====================================================

  // ============================== 회원가입 폼 제출 ========================
  //prettier-ignore
  const signupStaff = useCallback(() => {
    if (signupForm.birth === '' || signupForm.birth === undefined) {
      alert('생년월일을 입력해주세요.');
      document.getElementById('birth')?.focus();
      return;
    }
    if (signupForm.joinDate === '' || signupForm.joinDate === undefined) {
      alert('입사일을 입력해주세요.');
      document.getElementById('joinDate')?.focus();
      return;
    }

    signup(signupForm, material);

    setSignupForm(initialFormState);
    setReset(prev => !prev);
  }, [
    signupForm, signup, material
  ]);
  // ==============================================================================

  // ============ 모달 토글 ====
  const [workTypeModalOpen, toggleWorkTypeModal] = useToggle(false);
  const [workListModalOpen, toggleWorkListModal] = useToggle(false);

  // ================
  return (
    <div {...props} className={className}>
      <div className={'absolute text-2xl text-black cursor-pointer'}>
        <span
          className={closeIconClassName}
          onClick={() => {
            onCloseIconClicked();
            setReset(prev => !prev);
            setSignupForm(initialFormState);
          }}>
          close
        </span>
      </div>
      <div className={'text-center text-black text-xl font-bold mb-2'}>직원 등록</div>
      <div className={'flex flex-row flex-wrap justify-center w-full'}>


        <C.InputComponent onChange={changed('name')} name={'name'} type={'text'} value={signupForm.name}
        className={'w-[15%] p-2 m-2 input input-primary'} required={true} placeholder={'이름'}/>

        <SC.Gender
          value01={'남'}
          value02={'여'}
          changed={changed}
          reset={reset}
          className={
            'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
          }
        />

        <SC.SelectCalender
          value={signupForm.birth}
          changed={changed}
          name={'birth'}
          valuePrefix={'생년월일'}
          className={'w-[20%] p-2 m-2 btn text-xs'}
        />

        <C.InputComponent name={'phone'} type={'text'} value={signupForm.phone} onChange={changed('phone')}
        className={'w-[19%] p-2 m-2 input input-primary'} placeholder={'전화번호(ID)'} required={true}/>

        <C.InputComponent name={'password'} type={'password'} value={signupForm.password} onChange={changed('password')}
        className={'w-[19%] p-2 m-2 input input-primary'} placeholder={'비밀번호(ID 뒤 4자리)'} required={true}/>

        <SC.Address
          addr02={signupForm.addr02 ?? ''}
          changed={changed}
          initialize={reset}
        />


        <button
            className={'btn btn-primary m-2 p-2 w-[8%] text-md'}
            onClick={toggleWorkTypeModal}>
          직 종
        </button>
        <span
            className={
              'border-2 border-black w-[42%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
            }>
        {CommonCode.work_type
        .filter(item => signupForm.workType.split(',').includes(item.subCode))
        .map(item => item.codeName)
        .join(', ')}
        </span>
        <C.CheckBoxModal open={workTypeModalOpen}>
          <C.CheckBoxComponent name={'workType'} toggle={toggleWorkTypeModal} checkList={CommonCode.work_type} changed={changed} reset={reset}/>
        </C.CheckBoxModal>


        <button
            className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
            onClick={toggleWorkListModal}>
          가능 업무
        </button>
        <span
            className={
              'border-2 border-black w-[31%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
            }>
        {CommonCode.work_list
        .filter(item => signupForm.possibleWork.split(',').includes(item.subCode))
        .map(item => item.codeName)
        .join(', ')}
        </span>
        <C.CheckBoxModal open={workListModalOpen}>
          <C.CheckBoxComponent name={'possibleWork'} toggle={toggleWorkListModal} checkList={CommonCode.work_list} changed={changed} reset={reset}/>
        </C.CheckBoxModal>


        <SC.ContractStatus
          value={signupForm.contractStatus}
          changed={changed}
          reset={reset}
        />

        <SC.WorkStatus
          value={signupForm.workStatus}
          workStatusList={CommonCode.work_status}
          changed={changed}
          reset={reset}
        />

        <SC.Dependents
          value={signupForm.dependents}
          reset={reset}
          changed={changed}
          saveFile={submitMaterial}
        />

        <C.InputComponent name={'w4c'} type={'text'} value={signupForm.w4c} onChange={changed('w4c')}
        className={'w-[24%] p-2 m-2 input input-primary'} placeholder={'w4c'}/>

        <C.InputComponent name={'email'} type={'email'} value={signupForm.email} onChange={changed('email')}
                          className={'w-[20%] p-2 m-2 input input-primary'} placeholder={'Email'}/>

        <SC.SelectCalender
          value={signupForm.joinDate}
          changed={changed}
          name={'joinDate'}
          valuePrefix={'입사일'}
          className={'w-[18%] p-2 m-2 btn text-xs'}
        />
      </div>

      <div className={'flex flex-row justify-end items-center'}>
        <button
          type={'submit'}
          className={'btn btn-accent mb-2 mr-2'}
          onClick={signupStaff}>
          등록
        </button>
      </div>
    </div>
  );
};
