import {ChangeEvent, useEffect} from 'react';

export const Gender = ({
  name,
  changed,
  reset,
  className: _className
}: {
  name:string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
  className: string;
}) => {
  useEffect(() => {
    const radios = document.getElementsByName(name) as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => (radio.checked = false));
  }, [reset]);

  return (
    <div className={_className}>
      <input
        type={'radio'}
        className={'w-1/2'}
        name={name}
        value={'남'}
        onChange={changed(name)}
      />
      남
      <input
        type={'radio'}
        className={'w-1/2'}
        name={name}
        value={'여'}
        onChange={changed(name)}
      />
      여
    </div>
  );
};
