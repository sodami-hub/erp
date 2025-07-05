import {CheckBoxComponent, CheckBoxModal} from '../index';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../../hooks';

export const PossibleWork = ({
  value,
  workList,
  changed,
  reset
}: {
  value: string;
  workList: string[];
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
}) => {
  const [workListModalOpen, toggleWorkListModal] = useToggle(false);

  const selectPossibleWork = useCallback((value: string[]) => {
    const val = value.join(',');
    const changeFunc = changed('possibleWork');
    changeFunc({target: {value: val}} as ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <>
      <button
        className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
        onClick={toggleWorkListModal}>
        가능 업무
      </button>
      <span
        className={
          'border-2 border-black w-[18%] p-2 my-2 mr-2 -ml-1 text-black text-sm'
        }>
        {value}
      </span>
      <div>
        <CheckBoxModal open={workListModalOpen}>
          <CheckBoxComponent
            name={'possibleWork'}
            toggle={toggleWorkListModal}
            checkList={workList}
            sendValue={selectPossibleWork}
            reset={reset}
          />
        </CheckBoxModal>
      </div>
    </>
  );
};
