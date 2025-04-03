import {Link} from 'react-router-dom'
import {Outlet} from "react-router-dom";
import {SideBarButton} from "../../components";

export default function MainFrame() {
  return (
    <div className={'flex w-screen h-screen bg-white p-1 border border-gray-800'}>
      <div className={'flex flex-col w-40 '}>
        <div className={'flex justify-around text-xs items-center rounded-b w-full h-10 border border-white bg-blue-950'}>
          <p>요양병원</p>
          <span className={'material-icons'}>menu</span>
        </div>
        <SideBarButton buttonName={'수급자관리'} iconName={'arrow_drop_down'}/>
        <SideBarButton buttonName={'직원관리'} iconName={'arrow_drop_down'}/>
        <SideBarButton buttonName={'일정관리'} iconName={'arrow_drop_down'}/>
      </div>
      <div className={'flex flex-col w-full h-full border-2 border-gray-700'}>
        <div className={'flex justify-around items-center h-10 border border-gray-800'}>
        {/*현재 메뉴 ,  현재 시간*/}
        </div>
        <Outlet/>
      </div>
    </div>
  )
}
