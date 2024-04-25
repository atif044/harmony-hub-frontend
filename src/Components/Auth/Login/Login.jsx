import React,{useState} from 'react'
import { Link } from 'react-router-dom';
const Login = ({darkMode}) => {
     const [credentials,setCredentials]=useState({email:"",password:""});
      const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className="p-10">
    <h1 className={`mb-8 font-bold text-4xl text-black  `}>Login - User</h1>
    
    <div className=''>
        <form >
            <div className="mt-4">
                <label className={`block font-semibold ${darkMode==="dark"?"text-white":"text-black"}`} htmlFor="email">Email</label>
                <input className={`w-full shadow-inner  bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1 ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}`} id="email" onChange={onChange} value={credentials.email} type="email" name="email"  required autoComplete='off'/>
            </div>

            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Password</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600 text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} onChange={onChange} value={credentials.password} id="password" type="password" name="password"  required autoComplete="off"/>
            </div>

            <div className="flex items-center justify-between mt-8">
                <button type="submit" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10">Login</button>
                <Link className={`${darkMode==="dark"?"text-white":"text-black"} font-semibold`} to="/signupuser">
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