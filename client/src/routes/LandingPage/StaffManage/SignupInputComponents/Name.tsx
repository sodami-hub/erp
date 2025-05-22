import {ChangeEvent} from 'react';

export const Name = ({
  changed,
  value
}: {
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  return (
    <input
      type={'text'}
      className={'w-[15%] p-2 m-2 input input-primary'}
      name={'name'}
      placeholder={'이름'}
      value={value}
      onChange={changed('name')}
    />
  );
};
