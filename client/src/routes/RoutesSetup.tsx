import {Route, Routes} from 'react-router-dom';
import NoMatch from './NoMatch';
import Layout from '../share/layout/MainFrame';
import LandingPage from './index';
import Login from '../share/auth/pages/Login';
import StaffInfo from '../apps/staff/pages/StaffInfo';
import BeneficiaryInfo from '../apps/beneficiary/pages/BeneficiaryInfo';

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
