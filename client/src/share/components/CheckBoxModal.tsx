import {FC, useEffect, useState} from 'react';
import {ReactDivProps} from '../types';
import * as ST from '../../share/types';

export type CheckBoxModalProps = ReactDivProps & {
  open?: boolean;
};

export const CheckBoxModal: FC<CheckBoxModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');

  return <div {...props} className={className} />;
};

export type CheckBoxProps = ReactDivProps & {
  name: string;
  toggle: () => void;
  checkList: ST.commonCodeResp[];
  sendValue: (value: string[]) => void;
  reset: boolean;
};

const initialValue: string[] = [];

export const CheckBoxComponent: FC<CheckBoxProps> = ({
  name,
  toggle,
  checkList,
  sendValue,
  reset
}) => {
  const [checkedValue, setCheckedValue] = useState<string[]>(initialValue);

  const onSubmit = (value: string, checked: boolean) => {
    if (checked) {
      const newVal = [...checkedValue, value];
      const set = new Set(newVal);
      setCheckedValue(Array.from(set));
    } else {
      const newVal = checkedValue.filter(v => v !== value);
      setCheckedValue(newVal);
    }
  };

  useEffect(() => {
    setCheckedValue([]);
    const inputs = document.getElementsByName(name);
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        input.checked = false;
      }
    });
  }, [reset]);

  const checkBoxes = checkList?.map((value, index) => (
    <label key={index} className="flex items-center space-x-2">
      <input
        name={name}
        type="checkbox"
        value={value.subCode}
        onChange={e => {
          console.log(e.target.value, e.target.checked);
          onSubmit(e.target.value, e.target.checked);
        }}
        className="checkbox-neutral my-2"
      />
      <span>{value.codeName}</span>
    </label>
  ));
  return (
    <div
      className={
        'bg-white text-black w-1/4  flex flex-col justify-center items-center rounded-box'
      }>
      <div>{checkBoxes}</div>
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
