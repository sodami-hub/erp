import React, {ChangeEvent} from 'react';

export const Phone = ({
  changed,
  value
}: {
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <input
      type={'text'}
      className={'w-1/6 p-2 m-2 input input-primary'}
      name={'phone'}
      placeholder={'전화번호(ID)'}
      value={value}
      onChange={changed('phone')}
    />
  );
};
