import {ChangeEvent} from 'react';

export const Name = ({
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
      name={'name'}
      placeholder={'이름'}
      value={value}
      onChange={changed('name')}
    />
  );
};
