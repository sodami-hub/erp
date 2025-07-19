import React, {ChangeEvent} from 'react';

export const Email = ({
  value,
  changed,
  className: _className
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}) => {
  return (
    <input
      type={'email'}
      className={_className}
      id={'email'}
      name={'email'}
      placeholder={'Email'}
      value={value}
      onChange={changed('email')}
    />
  );
};
