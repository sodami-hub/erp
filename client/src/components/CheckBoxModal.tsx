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
  workTypeList: string[];
  sendValue: (value: string[]) => void;
};

const initialWorkTypeValue: string[] = [];

export const CheckBoxComponent: FC<CheckBoxProps> = ({
  toggle,
  workTypeList,
  sendValue
}) => {
  const [workTypeValue, setWorkTypeValue] = useState<string[]>(initialWorkTypeValue);

  const onSubmit = (value: string, checked: boolean) => {
    if (checked) {
      const newVal = [...workTypeValue, value];
      const set = new Set(newVal);
      setWorkTypeValue(Array.from(set));
    } else {
      const newVal = workTypeValue.filter(v => v !== value);
      setWorkTypeValue(newVal);
    }
  };

  const checkBoxes = workTypeList.map((value, index) => (
    <label key={index} className="flex items-center space-x-2">
      <input
        type="checkbox"
        value={value}
        onChange={e => {
          console.log(e.target.value, e.target.checked);
          onSubmit(e.target.value, e.target.checked);
        }}
        className="checkbox-neutral"
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
          className={'btn btn-primary mr-2'}
          onClick={() => {
            console.log(workTypeValue);
            sendValue(workTypeValue);
            toggle();
          }}>
          확 인
        </button>
      </div>
    </div>
  );
};
