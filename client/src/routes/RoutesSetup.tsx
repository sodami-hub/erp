import {Route, Routes} from 'react-router-dom';
import NoMatch from './NoMatch';
import Layout from './Layout/MainFrame';
import LandingPage from './LandingPage';
import Login from './Auth/Login';
import NewStaff from './LandingPage/StaffManage/NewStaff';

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path="/index" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path={'/index/staffInfo'} element={<NewStaff />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
