import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import type {AppState} from '../../store';
import * as SM from '../../store/selectedMenu';

export default function Top() {
  const selectedMenu = useSelector<AppState, SM.State>(state => state.selectedMenu);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, [() => setDate(new Date()), 1000]);

  return (
    <div className={'flex justify-between items-center h-10 border border-gray-800'}>
      <p className={'text-lg text-gray-900 ml-4 font-bold'}>{selectedMenu}</p>
      <div className={'flex justify-center font-bold'}>
        <p className={'text-sm text-gray-900 mr-4'}>{date.toLocaleDateString()}</p>
        <p className={'text-sm text-gray-900 mr-4'}>{date.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
