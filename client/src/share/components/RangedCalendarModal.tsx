import {FC, useState} from 'react';
import {ReactDivProps} from '../types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';
import {changeDateType} from '../utils';

type RangedCalendarModalProps = ReactDivProps & {
  open?: boolean;
};

export const RangedCalendarModal: FC<RangedCalendarModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');

  return <div {...props} className={className} />;
};

export const RangedCalendarComponent = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: (Date | null)[]) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const toggle = () => {
    console.log(changeDateType(startDate ?? new Date()));
    console.log(changeDateType(endDate ?? new Date()));
  };

  return (
    <div className={'bg-gray-200 relative flex flex-col justify-center items-center'}>
      <DatePicker
        locale={ko}
        selected={null}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <button className={'btn btn-primary my-1'} onClick={toggle}>
        확인
      </button>
    </div>
  );
};
