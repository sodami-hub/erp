import {ChangeEvent} from 'react';

export const Phone = ({
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
      type={'text'}
      className={_className}
      name={'phone'}
      placeholder={'전화번호(ID)'}
      value={value}
      onChange={changed('phone')}
    />
  );
};
