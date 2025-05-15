import React, {ChangeEvent} from 'react';

export const Gender = ({
  value01,
  value02,
  changed
}: {
  value01: string;
  value02: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div
      className={
        'flex justify-center items-center w-[13%] p-2 m-2 bg-black text-md font-bold h-10 border-2 border-gray-700 rounded'
      }>
      <input
        type={'radio'}
        className={'w-1/2'}
        name={'gender'}
        value={value01}
        onChange={changed('gender')}
      />
      남
      <input
        type={'radio'}
        className={'w-1/2'}
        name={'gender'}
        value={value02}
        onChange={changed('gender')}
      />
      여
    </div>
  );
};
