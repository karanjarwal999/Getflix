import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/pages/Home'
import SignUp from '../Component/pages/signup/SignUp'
import Login from '../Component/pages/Login'
import SignupContext from '../Context/SignupContext'
import Step0 from '../Component/pages/signup/Step0'
import Step1 from '../Component/pages/signup/Step1'
import Step2 from '../Component/pages/signup/Step2'
import ChoosePlan from '../Component/pages/signup/ChoosePlan'
import Logoutpage from '../Component/pages/logoutpage'
import PrivateRoute from './PrivateRoute'
import TransferProfile from '../Component/pages/accounts/transferProfile'
import HelpPage from '../Component/pages/accounts/HelpPage'
import EditAccount from '../Component/pages/accounts/EditAccount'


export default function MainRoutes() {
  return (
    <Routes>
        <Route path='/logout' element={<Logoutpage/>}/>
        <Route path='/*' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignupContext><SignUp/></SignupContext>} />
        <Route exact path='/signup/step' element={<SignupContext><Step0/></SignupContext>}/>
        <Route exact path='/signup/step1' element={<SignupContext><Step1/></SignupContext>}/>
        <Route exact path='/signup/step2' element={<SignupContext><Step2/></SignupContext>}/>
        <Route exact path='/signup/plan' element={<SignupContext><ChoosePlan/></SignupContext>}/>
        <Route path='/transferProfile' element={<TransferProfile/>}/>
        <Route path='/help' element={<HelpPage/>}/>
        <Route path='/account' element={<EditAccount/>}/>
    </Routes>
  )
}
