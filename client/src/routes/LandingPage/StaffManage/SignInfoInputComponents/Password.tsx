import React, {ChangeEvent} from 'react';

export const Password = ({
  changed,
  value
}: {
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <input
      type={'password'}
      className={'w-[20%] p-2 m-2 input input-primary'}
      name={'password'}
      placeholder={'비밀번호(ID 뒤 4자리)'}
      value={value}
      onChange={changed('password')}
    />
  );
};
