import {MainMenu, SecondaryMenu} from '../../components';

export default function SideMenuBar() {
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
          'flex justify-around text-xs items-center rounded-b w-full h-10 border border-white bg-blue-950'
        }>
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
        <SecondaryMenu buttonName={'- 직원 정보'} />
        <SecondaryMenu buttonName={'- 업무 관리'} />
      </div>
      <MainMenu buttonName={'일정관리'} iconName={'arrow_drop_down'} />
    </div>
  );
}
