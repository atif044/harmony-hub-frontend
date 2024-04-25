import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const OrganizationVerifyOtpProtected = () => {
    const {organizationtoken,isVerified}=useContext(context);
  return (
    !organizationtoken?<Navigate to='/loginorganization'/>:
        isVerified=="true"?
        <Navigate to="/manageevents"/>:<Outlet/>
  );
}
export default OrganizationVerifyOtpProtected;