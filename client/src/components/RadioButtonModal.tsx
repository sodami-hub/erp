import {FC, useEffect, useState} from 'react';
import {ReactDivProps} from '../types';

export type RadioButtonModalProps = ReactDivProps & {
  open?: boolean;
};

export const RadioButtonModal: FC<RadioButtonModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');
  return <div {...props} className={className} />;
};

export type RadioButtonProps = ReactDivProps & {
  name: string;
  toggle: () => void;
  buttonList: string[];
  sendValue: (value: string) => void;
  reset: boolean;
};

const initialValue: string = '';

export const RadioButtonComponent: FC<RadioButtonProps> = ({
  name,
  toggle,
  buttonList,
  sendValue,
  reset
}) => {
  const [checkedValue, setCheckedValue] = useState<string>(initialValue);

  const onSubmit = (value: string) => {
    setCheckedValue(value);
  };

  useEffect(() => {
    const radios = document.getElementsByName(name) as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => (radio.checked = false));
    setCheckedValue('');
  }, [reset]);

  const radioButton = buttonList?.map((value, index) => (
    <label key={index} className={'flex items-center space-x-2'}>
      <input
        name={name}
        type={'radio'}
        value={value}
        onClick={() => {
          onSubmit(value);
        }}
        className={'radio radio-neutral my-1'}
      />
      <span>{value}</span>
    </label>
  ));
  return (
    <div
      className={
        'bg-white text-black w-1/4 flex flex-col justify-center items-center rounded-box'
      }>
      <div>{radioButton}</div>
      <div className={'flex flex-row justify-center items-center'}>
        <button
          className={'btn btn-primary'}
          onClick={() => {
            console.log(checkedValue);
            sendValue(checkedValue);
            toggle();
          }}>
          확 인
        </button>
      </div>
    </div>
  );
};
