import React, {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useAuth} from '../../../context';
import * as C from '../../../components';
import * as SI from './SignupInputComponents';

// ============ 신규 직원 등록 모달 =====================
export const SignUpModal: FC<C.ModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};
// ====================================================

// ================= 신규 회원 등록을 위한 type 및 초깃값 정의 ============================
type SignupFormType = SI.signupStaffInfo & {
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
const initialCommonCodeList: SI.CommonCode = {
  ok: false,
  authList: [],
  workTypeList: [],
  workList: [],
  workStatusList: []
};
// ====================================================================

export type ModalContentProps = C.ReactDivProps & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
  isOpen: boolean;
};
export const SignUpModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
  isOpen,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const showCloseIcon = !!onCloseIconClicked;
  const className = [showCloseIcon && 'relative', _className].join(' ');
  const closeIconClassName =
    _closeIconClassName ?? 'btn-primary btn-outline material-icons';

  const {signup, jwt} = useAuth();

  // form 정보 리셋을 위한 값
  const [reset, setReset] = useState(false);

  // ==================== 공통코드 불러오기 =============================
  /*
  어떤 방식으로 불러 올 것인지에 대한 고민이 필요한 내용이다.
   */
  const [commonCodeList, setCommonCodeList] =
    useState<SI.CommonCode>(initialCommonCodeList);

  useEffect(() => {
    if (!jwt) return;
    SI.loadCommonCodeList(jwt).then((data: SI.CommonCode) => {
      setCommonCodeList(data);
    });
  }, [jwt]);

  const memoizedCommonCodeList = useMemo(() => commonCodeList, [commonCodeList]);
  //===================================================

  //============= 직원등록 폼 정보 초깃값 설정 및 변경사항 저장 ==================
  //prettier-ignore
  const [
    {
      name, gender, birth, phone, password, email, address, joinDate, contractStatus,
      dependents, w4c, possibleWork, workType, workStatus, addr01, addr02
    },
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
    const newStaff: SignupFormType = {
      name, gender, birth, phone, password, email, address, joinDate,
      contractStatus, dependents, w4c, possibleWork, workType, workStatus
    };

    if (newStaff.birth === '' || newStaff.birth === undefined) {
      alert('생년월일을 입력해주세요.');
      document.getElementById('birth')?.focus();
      return;
    }
    if (newStaff.joinDate === '' || newStaff.joinDate === undefined) {
      alert('입사일을 입력해주세요.');
      document.getElementById('joinDate')?.focus();
      return;
    }

    if (jwt) {
      signup(newStaff, jwt, material);
    } else {
      alert('인증 토큰이 유효하지 않습니다. 다시 로그인해주세요.');
    }
    setSignupForm(initialFormState);
    setReset(prev => !prev);
  }, [
    name, gender, birth, phone, password, email, address, joinDate,
    contractStatus, dependents, w4c, possibleWork, workType, workStatus,
    signup
  ]);
  // ==============================================================================

  if (!showCloseIcon) return <div {...props} className={className} children={children} />;
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
      <div className={'flex flex-row flex-wrap justify-center jus w-full'}>
        <SI.Name changed={changed} value={name} />

        <SI.Gender value01={'남'} value02={'여'} changed={changed} reset={reset} />

        <SI.Birth value={birth} changed={changed} />

        <SI.Phone changed={changed} value={phone} />

        <SI.Password changed={changed} value={password} />

        <SI.Address addr02={addr02 ?? ''} changed={changed} initialize={reset} />

        <SI.Email value={email} changed={changed} />

        <SI.WorkType
          reset={reset}
          value={workType}
          workTypeList={memoizedCommonCodeList.workTypeList}
          changed={changed}
        />

        <SI.PossibleWork
          reset={reset}
          value={possibleWork}
          workList={memoizedCommonCodeList.workList}
          changed={changed}
        />

        <SI.ContractStatus value={contractStatus} changed={changed} reset={reset} />

        <SI.WorkStatus
          value={workStatus}
          workStatusList={memoizedCommonCodeList.workStatusList}
          changed={changed}
          reset={reset}
        />

        <SI.Dependents
          value={dependents}
          reset={reset}
          changed={changed}
          saveFile={submitMaterial}
        />

        <SI.W4C value={w4c} changed={changed} />

        <SI.JoinDate value={joinDate} changed={changed} />
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
