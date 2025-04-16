import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useCallback,
  useState
} from 'react';
import {staffInfo, useAuth} from '../../../context';
import {useToggle} from '../../../hooks';
import CalendarSelect from '../../../components/Calendar';

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ModalProps = ReactDivProps & {
  open?: boolean;
};
export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
};

export const SignUpModal: FC<ModalProps> = ({open, className: _className, ...props}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};

type SignupFormType = staffInfo;
const initialFormState: staffInfo = {
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
  workStatus: ''
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
      workStatus
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

  const onSubmit = useCallback(() => {
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
      <div className={'flex flex-row flew-wrap w-full'}>
        <input
          type={'text'}
          className={'w-1/6 p-2 m-2 input input-primary'}
          name={'name'}
          placeholder={'이름'}
          value={name}
          onChange={changed('name')}
        />
        <div
          className={
            'flex justify-around items-center p-2 m-2 bg-black text-md font-bold mb-2 w-1/6 h-10 border-2 border-gray-700 rounded'
          }>
          <input
            type={'radio'}
            className={'w-1/6'}
            name={'gender'}
            value={'남'}
            onChange={changed('gender')}
          />
          남
          <input
            type={'radio'}
            className={'w-1/6'}
            name={'gender'}
            value={'여'}
            onChange={changed('gender')}
          />
          여
        </div>
        <input
          type={'button'}
          className={'w-1/5 p-2 m-2 btn'}
          name={'birth'}
          value={'생년월일 : ' + birth}
          onChange={changed('birth')}
          onClick={toggleBirthCalOpen}
        />
        {birthCalOpen && (
          <CalendarSelect
            onDateChange={selectedDate => {
              const formattedDate = Array.isArray(selectedDate)
                ? selectedDate[0]?.toISOString().split('T')[0] || ''
                : selectedDate?.toISOString().split('T')[0] || '';
              setSignupForm(obj => ({...obj, birth: formattedDate}));
              toggleBirthCalOpen();
            }}
          />
        )}
      </div>
      <div className={'flex flex-row justify-end items-center'}>
        <button type={'submit'} className={'btn btn-accent mb-2 mr-2'} onClick={onSubmit}>
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
