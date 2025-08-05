import {CalendarModal, CalendarSelect, Value} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';
import moment from 'moment/moment';

export const SelectCalender = ({
  value,
  changed,
  name,
  valuePrefix,
  className: _className
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  valuePrefix: string;
  className: string;
}) => {
  const [calOpen, toggleCalOpen] = useToggle(false);

  const selectedDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      changed(name)({
        target: {value: formattedDate}
      } as ChangeEvent<HTMLInputElement>);
      toggleCalOpen();
    }
  }, []);

  return (
    <>
      <input
        id={name}
        type={'button'}
        className={_className}
        name={name}
        value={valuePrefix + ' : ' + value}
        onClick={toggleCalOpen}
      />
      <div>
        <CalendarModal open={calOpen}>
          <CalendarSelect toggle={toggleCalOpen} onDateChange={selectedDate} />
        </CalendarModal>
      </div>
    </>
  );
};
