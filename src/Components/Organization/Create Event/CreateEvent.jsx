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
    const [eventLocationName,setEventLocationName]=useState('')
    const [eventLocationLink,setEventLocationLink]=useState('')
    const [eventLocationEmbededLink,seteventLocationEmbededLink]=useState('');
    const [long,setLong]=useState('');
    const [lat,setLat]=useState('');
    const date=new Date();
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    volunteersRequired: '',
    eventDurationInDays: '',
    eventStartDate: '',
    eventEndDate: '',
    eventStartTime: '',
    eventEndTime: '',
    universityId:'',
    country:"",
    city:""
  });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChangeLocation = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    
    // Call the LocationIQ API for autocomplete suggestions
    if (inputValue.trim() === '') {
      setResults([]);
      return;
    }

    fetch(`https://us1.locationiq.com/v1/autocomplete.php?key=pk.2c4f94512b9b8161910660ec686d8a27&q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        if (data?.error) {
          setResults([]);
          return;
        }
        setResults(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const handleSelectLocation = (result) => {
    setQuery(result.display_name);
    setEventLocationName(result.display_name);
      const mapUrl = `https://maps.locationiq.com/v2/staticmap?key=pk.2c4f94512b9b8161910660ec686d8a27&center=${result.lat},${result.lon}&zoom=15&size=600x450&markers=${result.lat},${result.lon}`;
  // Create the Google Maps URL to open on click
  const googleMapsUrl = `https://www.google.com/maps?q=${result.lat},${result.lon}`;
  setEventLocationLink(googleMapsUrl);
  setLong(result.lon)
  setLat(result.lat)
  const embdLink=`<a href=${googleMapsUrl} target="_blank" rel="noopener noreferrer">
  <img src=${mapUrl}  alt="Map" width="450" height="450" />
  </a>`
  seteventLocationEmbededLink(embdLink);
  
    setResults([]);
  };

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.eventStartDate>formData.eventEndDate){
      return toast.error("End Date cant be less than Start Date");
    }
    let todaysDate=(date.getFullYear()+"-"+((date.getMonth()+1)>=10?(date.getMonth() +1):"0"+(date.getMonth() +1)) +"-"+(date.getDate()<=9?"0"+date.getDate():date.getDate()));
    if(formData.eventStartDate< todaysDate){
      return toast.error("Start date must be greater or equal to todays date");
    }
        try {
          
            let response=await createEvent(selectedFile,formData,eventLocationEmbededLink,eventLocationLink,eventLocationName,long,lat);
            if(response.data.status==="success"){
              navigate("/manageevents")
                return toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error)
            return toast.error(error.response?.data.message);
        }
    
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
          
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationLink" className="block mb-1 font-medium">
            Event Location  <span className="text-red-500">*</span>
          </label>
          <div className="dropdown">
      <input
        type="text"
        className='w-full border rounded px-3 py-2'
        value={query}
        onChange={handleChangeLocation}
        placeholder="Enter location..."
      />
      <ul className="dropdown-content">
        {results.map((result, index) => (
          <li className='border-b-2' key={index} onClick={() => handleSelectLocation(result)}>
            {result.display_name}
          </li>
        ))}
      </ul>
    </div>
        </div>
        <div className="mb-4">
          <label htmlFor="eventDurationInDays" className="block mb-1 font-medium">
            CSP Hours (total for the event) <span className="text-red-500">*</span>
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
              required
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
              required
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
