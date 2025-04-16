import {MainMenu, SecondaryMenu} from '../../components';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../store';
import * as SM from '../../store/selectedMenu';
import {useCallback} from 'react';

export default function SideMenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedMenu = useSelector<AppState, SM.State>(state => state.selectedMenu);

  const saveMenuName = useCallback(
    (name: string) => {
      dispatch(SM.ChangeMenu(name));
    },
    [dispatch]
  );

  const toggleMenu02 = () => {
    const element = document.getElementById('02');
    if (element) {
      element.classList.toggle('hidden');
    }
  };
  return (
    <div className={'flex flex-col w-40 '}>
      <div
        className={
          'flex justify-around cursor-pointer text-xs items-center rounded-b w-full h-10 border border-white bg-blue-950'
        }
        onClick={() => {
          navigate('/index');
          saveMenuName('메인화면');
        }}>
        <p>요양병원</p>
        <span className={'material-icons'}>menu</span>
      </div>
      <MainMenu buttonName={'수급자관리'} iconName={'arrow_drop_down'} />
      <MainMenu
        buttonName={'직원관리'}
        iconName={'arrow_drop_down'}
        onClick={toggleMenu02}
      />
      <div id={'02'} className={'flex-col flex hidden'}>
        <SecondaryMenu
          buttonName={'- 직원 정보'}
          onClick={() => {
            navigate('/index/staffInfo');
            saveMenuName('직원관리 > 직원정보');
          }}
        />
        <SecondaryMenu buttonName={'- 업무 관리'} />
      </div>
      <MainMenu buttonName={'일정관리'} iconName={'arrow_drop_down'} />
    </div>
  );
}
