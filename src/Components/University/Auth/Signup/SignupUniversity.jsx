import React,{useState,useContext,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import context from '../../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
import axios from 'axios';
const SignupUniversity = ({darkMode}) => {
    const {signupUniversity,setunivToken}=useContext(context);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryISO, setSelectedCountryISO] = useState("gb");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((response) => {
        setCountries(response.data.data.map((country) => country));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    const filterIso = countries.filter((countr) => countr.name === country);
    setCredentials({...credentials,country:country});
    setSelectedCountryISO(`${filterIso[0].Iso2}`.toLowerCase());
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: country,
      })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));

    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    // setSelectedCity(city);
    setCredentials({...credentials,city:city});

  };




    const navigate=useNavigate();
        const [credentials,setCredentials]=useState({universityName:"",universityEmail:"",universityPassword:"",campus:"",country:"",city:""});
        const onChange=(e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
        const onSubmit=async(e)=>{
            e.preventDefault();
            console.log(credentials)
            try {
                let response=await signupUniversity(credentials);
                if(response.data?.status==="success"){
                    response.data?.message.map((msg)=>
                    {
                        toast.success(msg);
                    })
                    setunivToken(response.data.body);
                    navigate("/verifyotpuniv");
                }
                
            } catch (error) {
                toast.error(error.response?.data.message)
            }
        }
  return (
    <div className="p-10">
    <h1 className={`mb-8 font-bold text-4xl ${darkMode==="dark"?"text-white":"text-black"}`}>Register - University</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <form onSubmit={onSubmit} >
            <div>
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="name">Name</label>
                <input className={`${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"} w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1`} id="name" type="text" name="universityName" value={credentials.universityName} onChange={onChange} min={3} max={50} required  autoComplete='off'/>
            </div>
            <div className="mt-4">
                <label className={`block font-semibold ${darkMode==="dark"?"text-white":"text-black"}`} htmlFor="email">Email</label>
                <input className={`w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl pl-2 border-none block mt-1 ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}`} id="email" type="email" name="universityEmail" value={credentials.universityEmail} onChange={onChange} required autoComplete='off'/>
            </div>

            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Password</label>
                <input  pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              title="Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long" className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="password" name="universityPassword" value={credentials.universityPassword} onChange={onChange} required autoComplete="off"/>
            </div>
            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Campus</label>
                <input className={`w-full shadow-inner ${darkMode==="dark"?"bg-zinc-600  text-white":"bg-gray-100"}  rounded-lg placeholder-black text-2xl pl-2  border-none block mt-1`} id="password" type="text" name="campus" value={credentials.campus} onChange={onChange} required autoComplete="off"/>
            </div>
            <div className="mt-4">
                <label className={`${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">Country</label>
                <select
              id="country"
              value={credentials.country}
              onChange={handleCountryChange}
              className={`w-full ${
                darkMode === "dark" ? "text-white bg-gray-600" : "text-black"
              } p-2 border bg-gray-100 rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select Country</option>
              {countries.map((country) => (
                <option className='bg-gray-100' key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            </div>
            <div className="mt-4">
                <label className={` ${darkMode==="dark"?"text-white":"text-black"} block font-semibold`} htmlFor="password">City</label>
                <select
              id="city"
              value={credentials.city}
              onChange={handleCityChange}
              className={`w-full p-2 ${
                darkMode === "dark" ? "text-white bg-gray-600" : "text-black"
              } bg-gray-100 border rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select City</option>
              {cities.map((city) => (
                <option className='bg-gray-100' key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            </div>

            <div className="flex items-center justify-between mt-8">
                <button type="submit" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10">Register</button>
                <Link className={`${darkMode==="dark"?"text-white":"text-black"} font-semibold`} to="/loginuniversity">
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

export default SignupUniversity;