import {CalendarModal, CalendarSelect, Value} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';
import moment from 'moment/moment';

export const Birth = ({
  value,
  changed,
  className: _className
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}) => {
  const [birthCalOpen, toggleBirthCalOpen] = useToggle(false);

  const selectedBirthDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      changed('birth')({
        target: {value: formattedDate}
      } as ChangeEvent<HTMLInputElement>);
      toggleBirthCalOpen();
    }
  }, []);

  return (
    <>
      <input
        id={'birth'}
        type={'button'}
        className={_className}
        name={'birth'}
        value={'생년월일 : ' + value}
        onClick={toggleBirthCalOpen}
      />
      <div>
        <CalendarModal open={birthCalOpen}>
          <CalendarSelect
            toggle={toggleBirthCalOpen}
            onDateChange={selectedBirthDate}
            keyProp={'birth'}
          />
        </CalendarModal>
      </div>
    </>
  );
};
