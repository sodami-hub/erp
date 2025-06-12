import * as C from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';

export const WorkStatus = ({
  value,
  workStatusList,
  changed,
  reset
}: {
  value: string;
  workStatusList: string[];
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
}) => {
  const [workStatusModalOpen, toggleWorkStatusModal] = useToggle(false);

  const selectWorkStatus = useCallback((value: string) => {
    changed('workStatus')({target: {value: value}} as ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <>
      <button
        className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
        onClick={toggleWorkStatusModal}>
        근무 상태
      </button>
      <span
        className={
          'border-2 border-black w-[10%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
        }>
        {value}
      </span>
      <div>
        <C.RadioButtonModal open={workStatusModalOpen}>
          <C.RadioButtonComponent
            reset={reset}
            name={'contract'}
            toggle={toggleWorkStatusModal}
            buttonList={workStatusList}
            sendValue={selectWorkStatus}
          />
        </C.RadioButtonModal>
      </div>
    </>
  );
};
