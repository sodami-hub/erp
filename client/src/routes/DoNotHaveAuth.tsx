import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react';

export default function DoNotHaveAuth() {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);
  return (
    <div className={'flex flex-col justify-center items-center p-4'}>
      <p className={'text-xl p-4 mt-6 alert alert-info'}>
        해당 메뉴를 사용할 수 없습니다.
      </p>
      <button className={'btn btn-primary btn-xs mt-4'} onClick={goBack}>
        go back
      </button>
    </div>
  );
}
