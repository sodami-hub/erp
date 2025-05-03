import React, {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useAuth} from '../../../context';
import {useToggle} from '../../../hooks';
import {
  CalendarModal,
  CalendarSelect,
  CheckBoxComponent,
  CheckBoxModal,
  ModalProps,
  RadioButtonComponent,
  RadioButtonModal,
  ReactDivProps,
  Value
} from '../../../components';
import moment from 'moment';
import {CommonCode, loadCommonCodeList, staffInfo} from './SignUpComponents';

// ================= 카카오 주소 API ====================
declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

// ==================================================

// ============ 신규 직원 등록 모달 =====================
export const SignUpModal: FC<ModalProps> = ({open, className: _className, ...props}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};
// ====================================================

// ================= 신규 회원 등록을 위한 type 및 초깃값 정의 ============================
type SignupFormType = staffInfo & {
  addr01?: string;
  addr02?: string;
};

// prettier-ignore
const initialFormState: SignupFormType = {
  name: '', gender: '', birth: '', phone: '', password: '', email: '', address: '',
  joinDate: '', contractStatus: '', dependents: '', w4c: '', authId: '',
  possibleWork: '', workType: '', workStatus: '', addr01: '', addr02: ''
};
// =========================================================================

// ================= 공통코드 리스트 초깃값 정의 =============================
const initialCommonCodeList: CommonCode = {
  ok: false,
  authList: [],
  workTypeList: [],
  workList: [],
  workStatusList: []
};
// ====================================================================

export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
};
export const SignUpModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
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

  // ==================== 공통코드 불러오기 =============================
  /*
  어떤 방식으로 불러 올 것인지에 대한 고민이 필요한 내용이다.
   */
  const [commonCodeList, setCommonCodeList] = useState<CommonCode>(initialCommonCodeList);

  //
  // useEffect(() => {
  //   if (!jwt) return;
  //   loadCommonCodeList(jwt).then((data: CommonCode) => {
  //     setCommonCodeList(data);
  //   });
  // }, [jwt]);

  useMemo(() => {
    if (!jwt) return;
    loadCommonCodeList(jwt).then((data: CommonCode) => {
      setCommonCodeList(data);
    });
  }, [jwt]);

  //===================================================

  //============= 직원등록 폼 정보 초깃값 설정 및 변경사항 저장 ==================
  //prettier-ignore
  const [
    {
      name, gender, birth, phone, password, email, address, joinDate, contractStatus,
      dependents, w4c, authId, possibleWork, workType, workStatus, addr01, addr02
    },
    setSignupForm
  ] = useState<SignupFormType>(initialFormState);

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setSignupForm(obj => ({...obj, [key]: e.target.value}));
      console.log(key, e.target.value);
    },
    []
  );
  // ==================================================

  // =================== 주소 검색 API 로드 및 주소 변경사항 저장==========================
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        const addr01 = data.address + ' ' + data.zonecode;
        setSignupForm(obj => ({...obj, addr01: addr01}));
        alert('상세 주소를 입력해주세요.');
        console.log('addr01:', addr01);
        document.getElementById('addr02')?.focus();
      }
    }).open();
  };

  useEffect(() => {
    setSignupForm(obj => ({...obj, address: obj.addr01 + ' ' + obj.addr02}));
  }, [addr01, addr02]);
  //==========================================================

  // ====================== 달력 API 로드 및 생년월일 변경사항 저장 ==========================
  const selectedDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setSignupForm(obj => ({...obj, birth: formattedDate}));
      toggleBirthCalOpen();
    }
  }, []);
  // ====================================================

  // ============================== 회원가입 폼 제출 ========================
  //prettier-ignore
  const signupStaff = useCallback(() => {
    /*
    서버에 staff 정보를 전송하기 전에 address를 합쳐서 전송하기 위한 호출...
    타입에 대해서 공부하기 위해 남겨둔 코드
    */
    // changed('address')({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    const newStaff: SignupFormType = {
      name, gender, birth, phone, password, email, address, joinDate,
      contractStatus, dependents, w4c, authId, possibleWork, workType, workStatus
    };
    signup(newStaff);
  }, [
    name, gender, birth, phone, password, email, address, joinDate,
    contractStatus, dependents, w4c, authId, possibleWork, workType, workStatus,
    signup
  ]);
  // ==============================================================================

  // =================== 체크 박스 / 라디오 버튼 선택값 처리 ================

  const selectWorkType = useCallback((value: string[]) => {
    const val = value.join(',');
    setSignupForm(obj => ({...obj, workType: val}));
  }, []);
  const selectWorkList = useCallback((value: string[]) => {
    const val = value.join(',');
    setSignupForm(obj => ({...obj, possibleWork: val}));
  }, []);
  const selectContractStatus = useCallback((value: string) => {
    setSignupForm(obj => ({...obj, contractStatus: value}));
  }, []);
  const selectWorkStatus = useCallback((value: string) => {
    setSignupForm(obj => ({...obj, workStatus: value}));
  }, []);

  // =======================================================

  // ================================  modal toggle  =========================
  // 1. 생년월일 선택 달력 모달
  const [birthCalOpen, toggleBirthCalOpen] = useToggle(false);
  // 2. 직종 선택 모달
  const [workTypeModalOpen, toggleWorkTypeModal] = useToggle(false);
  // 3. 가능 업무 선택 모달
  const [workListModalOpen, toggleWorkListModal] = useToggle(false);
  // 4. 근무 구분(계약직/정규직) 라디오 버튼 모달
  const [contractStatusModalOpen, toggleContractStatusModal] = useToggle(false);
  // 5. 근무 상태(근무중, 대기, 등) 라디오 버튼 모달
  const [workStatusModalOpen, toggleWorkStatusModal] = useToggle(false);

  // ==================================================================

  if (!showCloseIcon) return <div {...props} className={className} children={children} />;
  return (
    <div {...props} className={className}>
      <div className={'absolute text-2xl text-black cursor-pointer'}>
        <span
          className={closeIconClassName}
          onClick={() => {
            onCloseIconClicked();
            setSignupForm(initialFormState);
          }}>
          close
        </span>
      </div>
      <div className={'text-center text-black text-xl font-bold mb-2'}>직원 등록</div>
      <div className={'flex flex-row flex-wrap justify-center jus w-full'}>
        <input
          type={'text'}
          className={'w-[15%] p-2 m-2 input input-primary'}
          name={'name'}
          placeholder={'이름'}
          value={name}
          onChange={changed('name')}
        />
        <div
          className={
            'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
          }>
          <input
            type={'radio'}
            className={'w-1/2'}
            name={'gender'}
            value={'남'}
            onChange={changed('gender')}
          />
          남
          <input
            type={'radio'}
            className={'w-1/2'}
            name={'gender'}
            value={'여'}
            onChange={changed('gender')}
          />
          여
        </div>
        <input
          type={'button'}
          className={'w-[18%] p-2 m-2 btn text-xs'}
          name={'birth'}
          value={'생년월일 : ' + birth}
          onChange={changed('birth')}
          onClick={toggleBirthCalOpen}
        />
        <div>
          <CalendarModal open={birthCalOpen}>
            <CalendarSelect toggle={toggleBirthCalOpen} onDateChange={selectedDate} />
          </CalendarModal>
        </div>
        <input
          type={'text'}
          className={'w-1/6 p-2 m-2 input input-primary'}
          name={'phone'}
          placeholder={'전화번호(ID)'}
          value={phone}
          onChange={changed('phone')}
        />
        <input
          type={'password'}
          className={'w-[20%] p-2 m-2 input input-primary'}
          name={'password'}
          placeholder={'비밀번호(ID 뒤 4자리)'}
          value={password}
          onChange={changed('password')}
        />
        <input
          type={'text'}
          className={'w-[41%] p-2 m-2 input input-primary'}
          id={'addr01'}
          name={'addr01'}
          placeholder={'주소'}
          value={addr01}
          readOnly
          onClick={onClickAddr}
          onChange={changed('addr01')}
        />
        <input
          type={'text'}
          className={'w-[38%] p-2 m-2 input input-primary'}
          id={'addr02'}
          name={'addr02'}
          placeholder={'상세주소'}
          value={addr02}
          onChange={changed('addr02')}
        />
        <button className={'btn btn-primary m-2 p-2 w-[10%]'} onClick={onClickAddr}>
          주소 검색
        </button>

        <input
          type={'email'}
          className={'w-[20%] p-2 m-2 input input-primary'}
          id={'email'}
          name={'email'}
          placeholder={'Email'}
          value={email}
          onChange={changed('email')}
        />

        <button
          className={'btn btn-primary m-2 p-2 w-[6%] text-md'}
          onClick={toggleWorkTypeModal}>
          직 종
        </button>
        <span
          className={
            'border-2 border-black w-[35%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
          }>
          {workType}
        </span>
        <div>
          <CheckBoxModal open={workTypeModalOpen}>
            <CheckBoxComponent
              toggle={toggleWorkTypeModal}
              checkList={commonCodeList.workTypeList}
              sendValue={selectWorkType}
            />
          </CheckBoxModal>
        </div>

        <button
          className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
          onClick={toggleWorkListModal}>
          가능 업무
        </button>
        <span
          className={
            'border-2 border-black w-[18%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
          }>
          {possibleWork}
        </span>
        <div>
          <CheckBoxModal open={workListModalOpen}>
            <CheckBoxComponent
              toggle={toggleWorkListModal}
              checkList={commonCodeList.workList}
              sendValue={selectWorkList}
            />
          </CheckBoxModal>
        </div>

        <button
          className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
          onClick={toggleContractStatusModal}>
          근무 구분
        </button>
        <span
          className={
            'border-2 border-black w-[8%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
          }>
          {contractStatus}
        </span>
        <div>
          <RadioButtonModal open={contractStatusModalOpen}>
            <RadioButtonComponent
              name={'contract'}
              toggle={toggleContractStatusModal}
              buttonList={['계약직', '정규직']}
              sendValue={selectContractStatus}
            />
          </RadioButtonModal>
        </div>

        <button
          className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
          onClick={toggleWorkStatusModal}>
          근무 상태
        </button>
        <span
          className={
            'border-2 border-black w-[8%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
          }>
          {workStatus}
        </span>
        <div>
          <RadioButtonModal open={workStatusModalOpen}>
            <RadioButtonComponent
              name={'contract'}
              toggle={toggleWorkStatusModal}
              buttonList={commonCodeList.workStatusList}
              sendValue={selectWorkStatus}
            />
          </RadioButtonModal>
        </div>

        {/*  회원가입 폼 컨텐츠 부분*/}
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

export type ModalActionProps = ReactDivProps & {};
export const ModalAction: FC<ModalActionProps> = ({className: _className, ...props}) => {
  const className = ['modal-action', _className].join(' ');
  return <div {...props} className={className} />;
};
