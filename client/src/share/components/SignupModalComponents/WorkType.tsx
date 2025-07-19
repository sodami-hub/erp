import {CheckBoxComponent, CheckBoxModal} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';

export const WorkType = ({
  value,
  workTypeList,
  changed,
  reset
}: {
  value: string;
  workTypeList: string[];
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
}) => {
  const [workTypeModalOpen, toggleWorkTypeModal] = useToggle(false);

  const selectWorkType = useCallback((value: string[]) => {
    const val = value.join(',');
    const changeFunc = changed('workType');
    changeFunc({target: {value: val}} as ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <>
      <button
        className={'btn btn-primary m-2 p-2 w-[6%] text-md'}
        onClick={toggleWorkTypeModal}>
        직 종
      </button>
      <span
        className={
          'border-2 border-black w-[35%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
        }>
        {value}
      </span>
      <div>
        <CheckBoxModal open={workTypeModalOpen}>
          <CheckBoxComponent
            name={'workType'}
            toggle={toggleWorkTypeModal}
            checkList={workTypeList}
            sendValue={selectWorkType}
            reset={reset}
          />
        </CheckBoxModal>
      </div>
    </>
  );
};
