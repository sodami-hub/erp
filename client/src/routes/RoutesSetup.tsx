import {Route, Routes} from 'react-router-dom';
import NoMatch from './NoMatch';
import Layout from './Layout/MainFrame';
import LandingPage from './LandingPage';
import Login from './Auth/Login';
import StaffInfo from './LandingPage/StaffManage/StaffInfo';
import BeneficiaryInfo from './LandingPage/BeneficiaryManage/BeneficiaryInfo';

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path="/index" element={<Layout />}>
        <Route index element={<LandingPage />} />
        {/*수급자 관리*/}
        <Route path={'/index/beneficiaryInfo'} element={<BeneficiaryInfo />} />
        {/*직원 관리*/}
        <Route path={'/index/staffInfo'} element={<StaffInfo />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
