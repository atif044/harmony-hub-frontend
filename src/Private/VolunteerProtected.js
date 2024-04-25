import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const VolunteerProtected = () => {
    const {volunteertoken,isVerified}=useContext(context);
  return (
    !volunteertoken?<Navigate to='/volunteerlogin'/>:
        isVerified=="true"?
    <Outlet/>:<Navigate to="/volunteerhome"/>
    
  )
}

export default VolunteerProtected