import {ChangeEvent} from 'react';

export const Password = ({
  changed,
  value,
  className: _className
}: {
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className: string;
}) => {
  return (
    <input
      type={'password'}
      className={_className}
      name={'password'}
      placeholder={'비밀번호(ID 뒤 4자리)'}
      value={value}
      onChange={changed('password')}
    />
  );
};
