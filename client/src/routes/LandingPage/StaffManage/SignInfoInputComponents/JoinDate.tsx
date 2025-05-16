import * as C from '../../../../components';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../../../hooks';
import moment from 'moment/moment';

export const JoinDate = ({
  value,
  changed
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [joinDateCalOpen, toggleJoinDateCalOpen] = useToggle(false);

  const selectedJoinDate = useCallback((date: C.Value) => {
    if (date && date instanceof Date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      changed('joinDate')({
        target: {value: formattedDate}
      } as ChangeEvent<HTMLInputElement>);
      toggleJoinDateCalOpen();
    }
  }, []);

  return (
    <>
      <input
        type={'button'}
        className={'w-[18%] p-2 m-2 btn text-xs'}
        name={'joinDate'}
        value={'입사일 : ' + value}
        //onChange={changed('joinDate')}
        onClick={toggleJoinDateCalOpen}
      />
      <div>
        <C.CalendarModal open={joinDateCalOpen}>
          <C.CalendarSelect
            toggle={toggleJoinDateCalOpen}
            onDateChange={selectedJoinDate}
            keyProp={'joinDate'}
          />
        </C.CalendarModal>
      </div>
    </>
  );
};
