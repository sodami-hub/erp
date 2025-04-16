import React, {DetailedHTMLProps, FC, HTMLAttributes} from 'react';

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ModalProps = ReactDivProps & {
  open?: boolean;
};
export const SignUpModal: FC<ModalProps> = ({open, className: _className, ...props}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};
export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
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
      {children}
    </div>
  );
};

export type ModalActionProps = ReactDivProps & {};
export const ModalAction: FC<ModalActionProps> = ({className: _className, ...props}) => {
  const className = ['modal-action', _className].join(' ');
  return <div {...props} className={className} />;
};
