import React, { useContext, useState,useEffect } from 'react';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = ({darkMode}) => {
  const navigate=useNavigate();
    const {createEvent,getalluniversities}=useContext(context);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [selectedCountryISO, setSelectedCountryISO] = useState("gb");
    const [university,setUniversity]=useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    volunteersRequired: '',
    eventLocationLink: '',
    eventLocationName: '',
    eventLocationEmbeddedLink: '',
    eventDurationInDays: '',
    eventStartDate: '',
    eventEndDate: '',
    eventStartTime: '',
    eventEndTime: '',
    universityId:'',
    country:"",
    city:""
  });
  

 const handleUnivChange=(e)=>{
  setFormData({...formData,universityId:e.target.value})
 }
  const allUniversities=async()=>{
    try {
      let response=await getalluniversities();
      setUniversity(response.data)
    } catch (error) {
    }
  }
  useEffect(() => {
  allUniversities();
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
    setFormData({...formData,country:country});
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
    setFormData({...formData,city:city});
  };  


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    console.log(formData);
    if (Object.keys(errors).length === 0) {
        try {
            let response=await createEvent(selectedFile,formData);
            if(response.data.status==="success"){
              navigate("/manageevents")
                return toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error)
            return toast.error(error.response?.data.message);
        }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    // Validate required fields
    const requiredFields = [
      'eventName',
      'eventDescription',
      'volunteersRequired',
      'eventLocationLink',
      'eventLocationName',
      'eventLocationEmbeddedLink',
      'eventDurationInDays',
      'eventStartDate',
      'eventEndDate',
      'eventStartTime',
      'eventEndTime',
    ];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        errors[field] = `${field} is required`;
      }
    });

    return errors;
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="max-w-md mx-auto ml-10 mr-10 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
       <div className='mb-4'>
       <label htmlFor="eventImage" className="block mb-1 font-medium">
            Event Image <span className="text-red-500">*</span>
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />

       </div>
        <div className="mb-4">
        
          <label htmlFor="eventName" className="block mb-1 font-medium">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventName && (
            <p className="text-red-500 mt-1">{errors.eventName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block mb-1 font-medium">
            Event Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
          {errors.eventDescription && (
            <p className="text-red-500 mt-1">{errors.eventDescription}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="volunteersRequired" className="block mb-1 font-medium">
            Volunteers Required <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="volunteersRequired"
            name="volunteersRequired"
            value={formData.volunteersRequired}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.volunteersRequired && (
            <p className="text-red-500 mt-1">{errors.volunteersRequired}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationLink" className="block mb-1 font-medium">
            Event Location Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventLocationLink"
            name="eventLocationLink"
            value={formData.eventLocationLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventLocationLink && (
            <p className="text-red-500 mt-1">{errors.eventLocationLink}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationName" className="block mb-1 font-medium">
            Event Location Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventLocationName"
            name="eventLocationName"
            value={formData.eventLocationName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventLocationName && (
            <p className="text-red-500 mt-1">{errors.eventLocationName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationEmbeddedLink" className="block mb-1 font-medium">
            Event Location Embedded Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventLocationEmbeddedLink"
            name="eventLocationEmbeddedLink"
            value={formData.eventLocationEmbeddedLink}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventLocationEmbeddedLink && (
            <p className="text-red-500 mt-1">{errors.eventLocationEmbeddedLink}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventDurationInDays" className="block mb-1 font-medium">
            Event Duration (in days) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eventDurationInDays"
            name="eventDurationInDays"
            value={formData.eventDurationInDays}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventDurationInDays && (
            <p className="text-red-500 mt-1">{errors.eventDurationInDays}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventStartDate" className="block mb-1 font-medium">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="eventStartDate"
            name="eventStartDate"
            value={formData.eventStartDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventStartDate && (
            <p className="text-red-500 mt-1">{errors.eventStartDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventEndDate" className="block mb-1 font-medium">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="eventEndDate"
            name="eventEndDate"
            value={formData.eventEndDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventEndDate && (
            <p className="text-red-500 mt-1">{errors.eventEndDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventStartTime" className="block mb-1 font-medium">
            Event Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            timeFormat="HH:mm"
            id="eventStartTime"
            name="eventStartTime"
            value={formData.eventStartTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.eventStartTime && (
            <p className="text-red-500 mt-1">{errors.eventStartTime}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventEndTime" className="block mb-1 font-medium">
            Event End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="eventEndTime"
            name="eventEndTime"
            value={formData.eventEndTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            timeFormat="HH:mm"
            required
          />
          {errors.eventEndTime && (
            <p className="text-red-500 mt-1">{errors.eventEndTime}</p>
          )}
        </div>
        <div className='mt-4'>
          {
            university.length===0 &&<h1>No Universities Found For Collaboration</h1>
          }

          {
            university.length>0
            && 
            <div>
            <select
              id="country"
              value={formData.universityId}
              onChange={handleUnivChange}
              className={`w-full ${
                darkMode === "dark" ? "text-white bg-gray-600" : "text-black"
              } p-2 border bg-gray-100 rounded-md focus:outline-none focus:border-blue-500`}
            >
              <option className='bg-gray-100' value="">Select University</option>
              {university.map((univ) => (
                <option className='bg-gray-100' key={univ._id} value={univ._id}>
                  {univ.universityName} - {univ.city}, {univ.country}
                </option>
              ))}
            </select>
            </div>
          }
        </div>
        <div className="mb-4">
                <label className="block mb-2" htmlFor="country">Country</label>
                <select
              id="country"
              value={country}
              onChange={handleCountryChange}
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
              onChange={handleCityChange}
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

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
