import {CalendarModal, CalendarSelect, Value} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';
import moment from 'moment/moment';

export const Birth = ({
  value,
  changed
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
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
        className={'w-[18%] p-2 m-2 btn text-xs'}
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
