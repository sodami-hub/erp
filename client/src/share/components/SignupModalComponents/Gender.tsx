import {ChangeEvent, useEffect} from 'react';

export const Gender = ({
  value01,
  value02,
  changed,
  reset,
  className: _className
}: {
  value01: string;
  value02: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
  className: string;
}) => {
  useEffect(() => {
    const radios = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => (radio.checked = false));
  }, [reset]);

  return (
    <div className={_className}>
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
