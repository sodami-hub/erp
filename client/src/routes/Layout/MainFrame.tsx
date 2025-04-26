import {Outlet} from 'react-router-dom';
import SideMenuBar from './SideMenuBar';
import Top from './Top';

export default function MainFrame() {
  return (
    <div className={'flex w-screen h-screen bg-white p-1 border border-gray-800'}>
      <SideMenuBar />
      <div className={'flex flex-col w-full h-full border-2 border-gray-700'}>
        <Top />
        <Outlet />
      </div>
    </div>
  );
}
