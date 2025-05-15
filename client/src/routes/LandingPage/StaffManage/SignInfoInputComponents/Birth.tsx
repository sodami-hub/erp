import {CalendarModal, CalendarSelect, Value} from '../../../../components';
import React, {ChangeEvent, useCallback, useState} from 'react';
import {useToggle} from '../../../../hooks';
import moment from 'moment/moment';

export const Birth = ({
  changed
}: {
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [birthCalOpen, toggleBirthCalOpen] = useToggle(false);
  const [birthday, setBirthday] = useState('');

  const selectedBirthDate = useCallback((date: Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setBirthday(formattedDate);
      toggleBirthCalOpen();
    }
  }, []);

  return (
    <>
      <input
        type={'button'}
        className={'w-[18%] p-2 m-2 btn text-xs'}
        name={'birth'}
        value={'생년월일 : ' + birthday}
        onChange={changed('birthday')}
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
