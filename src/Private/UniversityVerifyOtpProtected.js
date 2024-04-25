import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const UniversityVerifyOtpProtected = () => {
    const {universitytoken,isVerified}=useContext(context);
  return (
    !universitytoken?<Navigate to='/loginuniversity'/>:
        isVerified=="true"?
    <Navigate to="/collabEvents"/>:<Outlet/>
    
  )
}

export default UniversityVerifyOtpProtected