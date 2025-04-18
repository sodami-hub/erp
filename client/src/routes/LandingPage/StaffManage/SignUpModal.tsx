import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import {staffInfo, useAuth} from '../../../context';
import {useToggle} from '../../../hooks';
import type {Value} from '../../../components';
import {
  CalendarModal,
  CalendarSelect,
  ModalProps,
  ReactDivProps
} from '../../../components';
import moment from 'moment';

declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export const SignUpModal: FC<ModalProps> = ({open, className: _className, ...props}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};

type SignupFormType = staffInfo & {
  addr01?: string;
  addr02?: string;
};
const initialFormState: SignupFormType = {
  name: '',
  gender: '',
  birth: '',
  phone: '',
  password: '',
  email: '',
  address: '',
  joinDate: '',
  contractStatus: '',
  dependents: '',
  w4c: '',
  authId: '',
  possibleWork: '',
  workType: '',
  workStatus: '',
  addr01: '',
  addr02: ''
};

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

  const {signup} = useAuth();

  const [
    {
      name,
      gender,
      birth,
      phone,
      password,
      email,
      address,
      joinDate,
      contractStatus,
      dependents,
      w4c,
      authId,
      possibleWork,
      workType,
      workStatus,
      addr01,
      addr02
    },
    setSignupForm
  ] = useState<SignupFormType>(initialFormState);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setSignupForm(obj => ({...obj, [key]: e.target.value}));
      console.log(key, e.target.value);
    },
    []
  );

  useEffect(() => {
    setSignupForm(obj => ({...obj, address: obj.addr01 + ' ' + obj.addr02}));
  }, [addr01, addr02]);

  const signupStaff = useCallback(() => {
    const newStaff: SignupFormType = {
      name,
      gender,
      birth,
      phone,
      password,
      email,
      address,
      joinDate,
      contractStatus,
      dependents,
      w4c,
      authId,
      possibleWork,
      workType,
      workStatus
    };
    signup(newStaff);
  }, [
    name,
    gender,
    birth,
    phone,
    password,
    email,
    address,
    joinDate,
    contractStatus,
    dependents,
    w4c,
    authId,
    possibleWork,
    workType,
    workStatus,
    signup
  ]);

  const [birthCalOpen, toggleBirthCalOpen] = useToggle(false);

  const selectedDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setSignupForm(obj => ({...obj, birth: formattedDate}));
      toggleBirthCalOpen();
    }
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

  const closeIconClassName =
    _closeIconClassName ?? 'btn-primary btn-outline material-icons';
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
          className={'w-[40%] p-2 m-2 input input-primary'}
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
        <button className={'btn btn-primary m-2 p-2'} onClick={onClickAddr}>
          주소 검색
        </button>

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
