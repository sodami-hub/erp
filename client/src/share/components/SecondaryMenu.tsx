import {FC, PropsWithChildren} from 'react';
import type {ButtonProps} from './MainMenu';

export const SecondaryMenu: FC<PropsWithChildren<ButtonProps>> = ({
  className: _className,
  buttonName,
  ...buttonProps
}) => {
  const className = [
    'btn',
    'btn-secondary',
    'text-sm',
    'h-8',
    'border',
    'border-white',
    _className
  ].join(' ');
  return (
    <button className={className} {...buttonProps}>
      {buttonName}
    </button>
  );
};
