import {Routes, Route} from 'react-router-dom'
import NoMatch from './NoMatch'
import Layout from './Layout/MainFrame'
import LandingPage from "./LandingPage";

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<LandingPage/>}/>
        <Route path="*" element={<NoMatch/>} />
      </Route>
    </Routes>
  )
}
