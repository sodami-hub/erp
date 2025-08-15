import {ChangeEvent} from 'react';

export const W4C = ({
  value,
  changed
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={'text'}
      className={'w-[24%] p-2 m-2 input input-primary'}
      id={'w4c'}
      name={'w4c'}
      placeholder={'w4c'}
      value={value}
      onChange={changed('w4c')}
    />
  );
};
