import * as SI from './index';
import {ChangeEvent, useCallback} from 'react';
import {useToggle} from '../../hooks';

export const Dependents = ({
  value,
  reset,
  changed,
  saveFile
}: {
  value: string;
  reset: boolean;
  changed: (key: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  saveFile: (data: FormData) => void;
}) => {
  const [dependentsModalOpen, toggleDependentsModal] = useToggle(false);

  const selectDependents = useCallback((value: string) => {
    changed('dependents')({target: {value: value}} as ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <>
      <button
        className={'btn btn-primary m-2 p-2 w-[10%] text-md'}
        onClick={toggleDependentsModal}>
        부양 가족
      </button>
      <span
        className={
          'border-2 border-black w-[11%] p-2 my-2 mr-2 -ml-1 text-black text-sm text-center'
        }>
        {value}명
      </span>
      <div>
        <SI.DependentsModal open={dependentsModalOpen}>
          <SI.DependentsModalContents
            toggle={toggleDependentsModal}
            setNumbers={selectDependents}
            setMaterials={saveFile}
            reset={reset}
          />
        </SI.DependentsModal>
      </div>
    </>
  );
};
