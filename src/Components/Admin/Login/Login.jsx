import React,{useContext, useState} from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
const Login = ({darkMode}) => {
    const {loginAdmin,setadminToken}=useContext(context);
     const [credentials,setCredentials]=useState({email:"",password:""});
      const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const navigate=useNavigate()
    const onSubmit=async(e)=>{
        try {
            e.preventDefault();
            let response=await loginAdmin(credentials);
            if(response.data.status==="success"){
                toast.success(response.data.message);
                setadminToken(response.data.body)
                navigate("/unapprovedOrganization")
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response.data.message||"INternal Server Error");
        }
    }
  return (
    <div className="p-10">
    <h1 className={`mb-8 font-bold text-4xl text-black  `}>Login - Admin</h1>
    
    <div className=''>
        <form onSubmit={onSubmit}>
            <div className="mt-4">
                <label className={`block font-semibold ${darkMode==="dark"?"text-white":"text-black"}`} htmlFor="email">Email</label>
                <input className={`w-full shadow-inner  md:w-6/12 bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1 ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}`} id="email" onChange={onChange} value={credentials.email} type="email" name="email"  required autoComplete='off'/>
            </div>

            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Password</label>
                <input className={`w-full shadow-inner  md:w-6/12 ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} onChange={onChange} value={credentials.password} id="password" type="password" name="password"  required autoComplete="off"/>
            </div>

            <div className="flex items-center  mt-8">
                <button type="submit" className="flex items-center mr-20 justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10">Login</button>
                <Link className={`${darkMode==="dark"?"text-white":"text-black"} font-semibold`} to="/adminsignup">
                    Dont Have an Account?
                </Link>
            </div>
            <div className='text-nude mt-4 text-xl cursor-pointer hover:underline' >
                Forgot Password?
            </div>
        </form>

    </div>
</div>
  )
}

export default Login