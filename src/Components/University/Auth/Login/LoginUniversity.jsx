import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import context from '../../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
const LoginUniversity = ({darkMode}) => {
    const {loginUniversity,setisVerifed,setunivToken}=useContext(context);
    const navigate=useNavigate()
     const [credentials,setCredentials]=useState({universityEmail:"",universityPassword:""});
      const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const onSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await loginUniversity(credentials);
            if(response.data.status==="success"){
                toast.success(response.data.message);
                setunivToken(response.data.body)
                setisVerifed(`${response.data.isVerified}`);
                console.log(response.data.isVerified)
                response.data.isVerified==true ? navigate("/approvestudents"):navigate("/verifyotpuniv")
            }
            
        } catch (error) {
         return toast.error(error.response?.data.message)   
        }
    }
  return (
    <div className="p-10">
    <h1 className={`mb-8 font-bold text-4xl text-black  `}>Login - University</h1>
    
    <div className=''>
        <form onSubmit={onSubmit}>
            <div className="mt-4">
                <label className={`block font-semibold ${darkMode==="dark"?"text-white":"text-black"}`} htmlFor="email">Email</label>
                <input className={`w-full shadow-inner  bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1 ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}`} id="email" onChange={onChange} value={credentials.organizationEmail} type="email" name="universityEmail"  required autoComplete='off'/>
            </div>

            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Password</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} onChange={onChange} value={credentials.organizationPassword} id="password" type="password" name="universityPassword"  required autoComplete="off"/>
            </div>

            <div className="flex items-center justify-between mt-8">
                <button type="submit" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10">Login</button>
                <Link className={`${darkMode==="dark"?"text-white":"text-black"} font-semibold`} to="/signupuniversity">
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

export default LoginUniversity