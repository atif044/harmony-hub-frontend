import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import context from '../Context/HarmonyContext'
const OrganizationProtected = () => {
    const {organizationtoken,isVerified}=useContext(context);
  return (
    !organizationtoken?<Navigate to='/loginorganization'/>:
        isVerified=="true"?
    <Outlet/>:<Navigate to="/home"/>
  );
}
export default OrganizationProtected