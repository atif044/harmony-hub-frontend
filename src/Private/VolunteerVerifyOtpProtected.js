import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const VolunteerVerifyOtpProtected = () => {
    const {volunteertoken,isVerified}=useContext(context);
  return (
    !volunteertoken?<Navigate to='/loginvolunteer'/>:
        isVerified=="true"?
    <Navigate to="/events"/>:<Outlet/>
  )
}

export default VolunteerVerifyOtpProtected