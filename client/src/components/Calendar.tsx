import {useCallback, useState} from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSelect = ({onDateChange}: {onDateChange: (date: Value) => void}) => {
  const [calendarValue, setCalendarValue] = useState<Value>(null);

  const onChangeCalendar = useCallback(
    (value: Value) => {
      setCalendarValue(value);
      onDateChange(value);
    },
    [onDateChange]
  );

  return (
    <div>
      <Calendar
        value={calendarValue}
        onChange={onChangeCalendar}
        formatDay={(locale, date) => date.toLocaleString('en', {day: 'numeric'})}
      />
    </div>
  );
};

export default CalendarSelect;
