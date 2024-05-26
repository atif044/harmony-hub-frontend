import React,{useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';

const SignupOrganization = ({darkMode}) => {
    const {SignupOrganization,setToken}=useContext(context);
    const navigate=useNavigate();
        const [credentials,setCredentials]=useState({organizationName:"",organizationEmail:"",organizationPassword:"",organizationSize:"",organizationPhoneNo:"",organizationWebsiteLink:""});
        const onChange=(e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
            console.log(credentials)
        }

        const onSubmit=async(e)=>{
            e.preventDefault();
            try {
                let response=await SignupOrganization(credentials);
                if(response.data?.status==="success"){
                    response.data?.message.map((msg)=>
                    {
                        toast.success(msg);
                    })
                    setToken(response.data.body);
                    navigate("/verifyOtp");
                }
                
            } catch (error) {
                toast.error(error.response?.data.message)
            }
        }
  return (
    <div className="p-10">

    <h1 className={`mb-8 font-bold text-4xl ${darkMode==="dark"?"text-white":"text-black"}`}>Register - Organization</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <form onSubmit={onSubmit} >
            <div>
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="name">Name</label>
                <input className={`${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"} w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1`} id="name" type="text" name="organizationName" value={credentials.organizationName} onChange={onChange} min={3} max={50} required  autoComplete='off'/>
            </div>
            <div className="mt-4">
                <label className={`block font-semibold ${darkMode==="dark"?"text-white":"text-black"}`} htmlFor="email">Email</label>
                <input className={`w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1 ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}`} id="email" type="email" name="organizationEmail" value={credentials.organizationEmail} onChange={onChange} required autoComplete='off'/>
            </div>

            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Password</label>
                <input pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              title="Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="password" name="organizationPassword" value={credentials.organizationPassword} onChange={onChange} required autoComplete="off"/>
            </div>
            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Phone Number</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="text" name="organizationPhoneNo" value={credentials.organizationPhoneNo} onChange={onChange} required autoComplete="off"/>
            </div>
            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Organization Size</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="number" name="organizationSize" value={credentials.organizationSize} onChange={onChange} required autoComplete="off"/>
            </div>
            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Website Link</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="text" name="organizationWebsiteLink" value={credentials.organizationWebsiteLink} onChange={onChange} required autoComplete="off"/>
            </div>

            <div className="flex items-center justify-between mt-8">
                <button type="submit" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10">Register</button>
                <Link className={`${darkMode==="dark"?"text-white":"text-black"} font-semibold`} to="/loginorganization">
                    Already registered?
                </Link>
            </div>
        </form>

        <aside className="">
            <div className={`${darkMode==="dark"?"bg-zinc-600":"bg-gray-100"} p-8 rounded`}>
                <h2 className={`font-bold text-2xl ${darkMode==="dark"?"text-white":"text-black"}`}>Instructions</h2>
                <ul className={`${darkMode==="dark"?"text-white":"text-black"} list-disc mt-4 list-inside`}>
                    <li>All users must provide a valid email address and password to create an account.</li>
                    <li>Users must not use offensive, vulgar, or otherwise inappropriate language in their Name or profile information</li>
                    <li>Users must not create multiple accounts for the same person.</li>
                    <li>Password must be alteast 8 characters and must contain atleast 1 uppercase, 1 lowercase 1 special character and 1 number
                    </li>
                </ul>
            </div>
        </aside>

    </div>
</div>
  )
}

export default SignupOrganization