import axios from "axios";
import React, { useState,useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import context from "../../../Context/HarmonyContext";
import toast from "react-hot-toast";
const Step1 = ({ onNext, email, password,setProfilePhoto,profilePhoto, confirmPassword, setEmail, setPassword, setConfirmPassword }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input required className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="password">Password</label>
                <input required className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="confirmPassword">Confirm Password</label>
                <input required className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-4">
            <label className="block mb-2" htmlFor="confirmPassword">Profile Photo</label>

                <input type="file" accept="image/*" required onChange={(e)=>setProfilePhoto(e.target.files[0])}/>
            </div>
            <hr className="my-8" />
            <p className="mb-4">Already a member? <Link to={'/volunteerlogin'} className="text-blue-500">LOGIN!</Link></p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Next</button>
        </form>
    );
};

const Step2 = ({ onNext, name, dob, nicFront,nicBack, contact, gender, setName, setDob, setNicFront,setNicBack, setContact, setGender }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">Name</label>
                    <input className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="dob">Date of Birth</label>
                    <input className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="nicNumber">NIC Front</label>
                    <input type="file" onChange={(e)=>setNicFront(e.target.files[0])} />
                    {/* <input className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="text" id="nicNumber" name="nicNumber" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} /> */}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="nicNumber">NIC Back</label>
                    <input type="file" onChange={(e)=>setNicBack(e.target.files[0])} />
                    {/* <input className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="text" id="nicNumber" name="nicNumber" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} /> */}
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="contact">Contact Detail</label>
                    <input className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="gender">Gender</label>
                    <select 
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                    className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Next</button>
        </form>
    );
};

const Step3 = ({enrollmentNo,setEnrollmentNo,setStudentCardPic, onSubmit,universities,university,setUniversity, country, city, countries,cities,countryChange,cityChange, setCity }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ country, city });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="country">Country</label>
                <select
              id="country"
              value={country}
              onChange={countryChange}
              className={`w-full  p-2 border bg-gray-100 rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select Country</option>
              {countries.map((country) => (
                <option className='bg-gray-100' key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>


                
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="city">City</label>
                <select
              id="city"
              value={city}
              onChange={cityChange}
              className={`w-full p-2  bg-gray-100 border rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select City</option>
              {cities.map((city) => (
                <option className='bg-gray-100' key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            </div>
            <div className="mb-4">
            <select
              id="country"
              value={university}
           onChange={(e)=>setUniversity(e.target.value)}
              className={`w-full  p-2 border bg-gray-100 rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select University</option>
              {universities.map((univ) => (
                <option className='bg-gray-100' key={univ._id} value={univ._id}>
                  {univ.universityName} - {univ.city}, {univ.country}
                </option>
              ))}
            </select>
            </div>
            {
                university!=="" &&
                <div className="mb-4">
                <label className="block mb-2" htmlFor="gender">Student Card Pic</label>
                <input onChange={(e)=>setStudentCardPic(e.target.files[0])} type="file" required={university!=""?true:false} />
                <label className="block mb-2" htmlFor="enrollment">Enrollment</label>
                <input  className="block w-full p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500" type="text" id="enrollment" value={enrollmentNo} onChange={(e)=>setEnrollmentNo(e.target.value)} minLength={4} required={university!=""?true:false}  />
                </div>
            }
            <button className="w-full bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
        </form>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePhoto,setProfilePhoto]=useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [nicFront, setNicFront] = useState("");
    const [nicBack, setNicBack] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("male");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [enrollmentNo,setEnrollmentNo]=useState('');
    const [studentCardPic,setStudentCardPic]=useState(null)
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountryISO, setSelectedCountryISO] = useState("gb");
    const [universities,setUniversities]=useState([]);
    const [university,setUniversity]=useState("")
    const {getalluniversities,volunteerSignup,setVolunteerToken}=useContext(context);
    const alluniv=async()=>{
        let response=await getalluniversities();
         setUniversities(response.data);   
    }
    useEffect(() => {
        alluniv()
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
        setCountry(country);
        setSelectedCountryISO(`${filterIso[0].Iso2}`.toLowerCase());
        axios
          .post("https://countriesnow.space/api/v0.1/countries/cities", {
            country: country,
          })
          .then((response) => {
            setCities(response.data.data);
          })
          .catch((error) => console.error("Error fetching cities:", error));
    
        setCity("");
      };
    
      const handleCityChange = (e) => {
        const city = e.target.value;
        setCity(city)
      };  
  

    const handleNext = (data) => {
        setStep(step + 1);
    };

    const handlePrevious = (data) => {
        if (step !== 1) {
            setStep(step - 1);
        }
    };

    const handleRegister = async() => {

      let response=  await volunteerSignup({email,password,name,dob,gender,country,city,university,enrollmentNo},profilePhoto,nicBack,nicFront,studentCardPic);
        if(response.data.status==="success"){
          toast.success(response.data.message);
          setVolunteerToken(response.data.body);
          navigate("/verifyOtpVolunteer")
        }
    };

    return (
        <div className="flex h-screen items-center justify-center my-16">
            <div className="flex flex-col border border-solid p-14 rounded-2xl w-[400px] h-fit  relative">
                <div onClick={handlePrevious}>
                    {step !== 1 && <button className="bg-green-600 text-black p-1 rounded-md">back</button>}
                </div>
                <center><h2 className="text-2xl mb-4">REGISTER NOW!</h2></center>
                {step === 1 && <Step1 onNext={handleNext} profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} email={email} password={password} confirmPassword={confirmPassword} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />}
                {step === 2 && <Step2 onNext={handleNext} name={name} dob={dob} nicFront={nicFront} nicBack={nicBack}contact={contact} gender={gender} setName={setName} setDob={setDob} setNicFront={setNicFront}  setNicBack={setNicBack} setContact={setContact} setGender={setGender} />}
                {step === 3 && <Step3 onSubmit={handleRegister} universities={universities} university={university} setUniversity={setUniversity} countries={countries} cities={cities} countryChange={handleCountryChange} cityChange={handleCityChange} country={country} city={city} setCountry={setCountry} setCity={setCity} enrollmentNo={enrollmentNo} setEnrollmentNo={setEnrollmentNo} setStudentCardPic={setStudentCardPic} />}
                <div className="absolute bottom-4 right-4">{step}/3</div>
            </div>
        </div>
    );
};

export default Register;
