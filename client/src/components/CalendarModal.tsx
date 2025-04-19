import type {FC} from 'react';
import {useCallback, useState} from 'react';
import Calendar from 'react-calendar';
import {ReactDivProps} from './ModalProps';

export type CalendarModalProps = ReactDivProps & {
  open?: boolean;
};

export const CalendarModal: FC<CalendarModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ');

  return <div {...props} className={className} />;
};

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarSelect = ({
  onDateChange,
  toggle
}: {
  onDateChange: (date: Value) => void;
  toggle: () => void;
}) => {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());

  const onChangeCalendar = useCallback(
    (value: Value) => {
      setCalendarValue(value); // 로컬 상태 업데이트
      onDateChange(value); // 부모 컴포넌트에 값 전달
    },
    [onDateChange]
  );

  return (
    <div className={'bg-gray-200 relative flex flex-col justify-center items-center'}>
      <Calendar
        locale={'ko'}
        value={calendarValue} // 현재 선택된 값
        onChange={onChangeCalendar} // 날짜 변경 시 호출
        formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})}
      />
      <button className={'btn btn-primary my-1'} onClick={toggle}>
        취소
      </button>
    </div>
  );
};
