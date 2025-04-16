import React, {DetailedHTMLProps, FC, HTMLAttributes} from 'react';

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

export const ModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const showCloseIcon = !!onCloseIconClicked;
  const className = [showCloseIcon && 'relative', _className].join(' ');
  if (!showCloseIcon) return <div {...props} className={className} children={children} />;

  const closeIconClassName =
    _closeIconClassName ?? 'btn-primary btn-outline material-icons';

  return (
    <div {...props} className={className}>
      <div className={'absolute text-2xl text-black cursor-pointer'}>
        <span className={closeIconClassName} onClick={onCloseIconClicked}>
          close
        </span>
      </div>
      <div className={'text-center text-black text-xl font-bold mb-2'}>직원 등록</div>
      <div className={'flex flex-col w-full'}>
        <input
          type={'text'}
          className={'w-80 p-2 m-2 input input-primary'}
          name={'name'}
          placeholder={'이름'}
        />
        <input
          type={'text'}
          className={'w-80 m-2 p-2 input input-primary'}
          name={'phoneNumber'}
          placeholder={'전화번호'}
        />
        <input
          type={'text'}
          className={'w-80 p-2 m-2 input input-primary'}
          name={'address'}
          placeholder={'주소'}
        />
      </div>
      <div className={'flex flex-row justify-end items-center'}>
        <button type={'submit'} className={'btn btn-accent mb-2 mr-2'} onClick={() => {}}>
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
