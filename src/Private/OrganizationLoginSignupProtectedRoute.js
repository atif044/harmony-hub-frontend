import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const OrganizationLoginSignupProtectedRoute = () => {
    const {organizationtoken,isVerified,universitytoken}=useContext(context);
    console.log(isVerified)
  return (
    organizationtoken?
    (
        isVerified=="false"?
    <Navigate to='/verifyOtp'/>:
    <Navigate to='/' />
  )  :
      universitytoken?(
        isVerified=="false"?
        <Navigate to='/verifyotpuniv'/>
        :
        <Navigate to='/univhome'/>
        ):
        <Outlet/>
    
  )
}

export default OrganizationLoginSignupProtectedRoute