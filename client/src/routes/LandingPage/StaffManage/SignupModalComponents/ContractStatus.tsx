import * as C from '../../../../components';
import React, {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../../../hooks';

export const ContractStatus = ({
  value,
  changed,
  reset
}: {
  value: string;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  reset: boolean;
}) => {
  const [contractStatusModalOpen, toggleContractStatusModal] = useToggle(false);

  const selectContractStatus = useCallback((value: string) => {
    const changeFunc = changed('contractStatus');
    changeFunc({target: {value: value}} as ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <>
      <button
        className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
        onClick={toggleContractStatusModal}>
        근무 구분
      </button>
      <span
        className={
          'border-2 border-black w-[10%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
        }>
        {value}
      </span>
      <div>
        <C.RadioButtonModal open={contractStatusModalOpen}>
          <C.RadioButtonComponent
            reset={reset}
            name={'contract'}
            toggle={toggleContractStatusModal}
            buttonList={['계약직', '정규직']}
            sendValue={selectContractStatus}
          />
        </C.RadioButtonModal>
      </div>
    </>
  );
};
