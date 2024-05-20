import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const OrganizationLoginSignupProtectedRoute = () => {
    const {organizationtoken,isVerified,universitytoken,volunteertoken}=useContext(context);
    console.log(isVerified)
    console.log(organizationtoken,isVerified,universitytoken,volunteertoken)
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
        <Navigate to='/'/>
        ):
        volunteertoken?(
          isVerified=="false"?
          <Navigate to='/verifyOtpVolunteer'/>
          :
          <Navigate to='/'/>
        ):
        <Outlet/>
    
  )
}

export default OrganizationLoginSignupProtectedRoute