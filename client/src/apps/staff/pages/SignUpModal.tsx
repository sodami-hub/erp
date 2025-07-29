import React, {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useAuth} from '../../../share/auth/context';
import * as C from '../../../share/components/SignupModalComponents';
import * as T from '../types';
import * as ST from '../../../share/types';
import * as API from '../api';

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

// ================= 공통코드 리스트 초깃값 정의 =============================
const initialCommonCodeList = {
  work_type: [],
  work_list: [],
  work_status: []
};
// ====================================================================

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

  // ==================== 공통코드 불러오기 =============================
  /*
  어떤 방식으로 불러 올 것인지에 대한 고민이 필요한 내용이다.
   */
  const [commonCodeList, setCommonCodeList] = useState(initialCommonCodeList);

  useEffect(() => {
    (async () => {
      const res = await API.loadCommonCode('');
      if (res.ok) {
      } else {
        console.log('CommonCode(Staff) Load Failure');
      }
      console.log('CommonCode(Staff) Load Succeed');
    })();
  });

  const memoizedCommonCodeList = useMemo(() => commonCodeList, [commonCodeList]);
  //===================================================

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
  const [material, setMaterial] = useState<FormData>();

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
        <C.Name
          changed={changed}
          value={signupForm.name}
          className={'w-[15%] p-2 m-2 input input-primary'}
        />

        <C.Gender
          value01={'남'}
          value02={'여'}
          changed={changed}
          reset={reset}
          className={
            'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
          }
        />

        <C.SelectCalender
          value={signupForm.birth}
          changed={changed}
          name={'birth'}
          valuePrefix={'생년월일'}
          className={'w-[18%] p-2 m-2 btn text-xs'}
        />

        <C.Phone
          changed={changed}
          value={signupForm.phone}
          className={'w-1/6 p-2 m-2 input input-primary'}
        />

        <C.Password
          changed={changed}
          value={signupForm.password}
          className={'w-[20%] p-2 m-2 input input-primary'}
        />

        <C.Address
          addr02={signupForm.addr02 ?? ''}
          changed={changed}
          initialize={reset}
        />

        <C.Email
          value={signupForm.email}
          changed={changed}
          className={'w-[20%] p-2 m-2 input input-primary'}
        />

        <C.WorkType
          reset={reset}
          value={signupForm.workType}
          workTypeList={memoizedCommonCodeList.work_type}
          changed={changed}
        />

        <C.PossibleWork
          reset={reset}
          value={signupForm.possibleWork}
          workList={memoizedCommonCodeList.work_list}
          changed={changed}
        />

        <C.ContractStatus
          value={signupForm.contractStatus}
          changed={changed}
          reset={reset}
        />

        <C.WorkStatus
          value={signupForm.workStatus}
          workStatusList={memoizedCommonCodeList.work_status}
          changed={changed}
          reset={reset}
        />

        <C.Dependents
          value={signupForm.dependents}
          reset={reset}
          changed={changed}
          saveFile={submitMaterial}
        />

        <C.W4C value={signupForm.w4c} changed={changed} />

        <C.SelectCalender
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
