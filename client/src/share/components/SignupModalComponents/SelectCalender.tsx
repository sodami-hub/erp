import {CalendarModal, CalendarSelect, Value} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../../hooks';
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
  const [birthCalOpen, toggleBirthCalOpen] = useToggle(false);

  const selectedBirthDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      changed(name)({
        target: {value: formattedDate}
      } as ChangeEvent<HTMLInputElement>);
      toggleBirthCalOpen();
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
        onClick={toggleBirthCalOpen}
      />
      <div>
        <CalendarModal open={birthCalOpen}>
          <CalendarSelect toggle={toggleBirthCalOpen} onDateChange={selectedBirthDate} />
        </CalendarModal>
      </div>
    </>
  );
};
