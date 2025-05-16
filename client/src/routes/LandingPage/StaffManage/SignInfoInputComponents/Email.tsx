import React, {ChangeEvent} from 'react';

export const Email = ({
  value,
  changed
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={'email'}
      className={'w-[20%] p-2 m-2 input input-primary'}
      id={'email'}
      name={'email'}
      placeholder={'Email'}
      value={value}
      onChange={changed('email')}
    />
  );
};
