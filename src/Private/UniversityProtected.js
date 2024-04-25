import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const UniversityProtected = () => {
    const {universitytoken,isVerified}=useContext(context);
  return (
    !universitytoken?<Navigate to='/loginuniversity'/>:
        isVerified=="true"?
    <Outlet/>:<Navigate to="/univhome"/>
    
  )
}

export default UniversityProtected