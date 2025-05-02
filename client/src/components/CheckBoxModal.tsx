import {FC, useState} from 'react';
import {ReactDivProps} from './ModalProps';

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
  toggle: () => void;
  checkList: string[];
  sendValue: (value: string[]) => void;
};

const initialValue: string[] = [];

export const CheckBoxComponent: FC<CheckBoxProps> = ({toggle, checkList, sendValue}) => {
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

  const checkBoxes = checkList?.map((value, index) => (
    <label key={index} className="flex items-center space-x-2">
      <input
        type="checkbox"
        value={value}
        onChange={e => {
          console.log(e.target.value, e.target.checked);
          onSubmit(e.target.value, e.target.checked);
        }}
        className="checkbox-neutral my-2"
      />
      <span>{value}</span>
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
