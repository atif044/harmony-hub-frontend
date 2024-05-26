import React, { useContext, useState, useEffect } from 'react';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = ({ darkMode }) => {
  const navigate = useNavigate();
  const { createEvent, getalluniversities } = useContext(context);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [selectedCountryISO, setSelectedCountryISO] = useState("gb");
  const [university, setUniversity] = useState([]);
  const [eventLocationName, setEventLocationName] = useState('');
  const [eventLocationLink, setEventLocationLink] = useState('');
  const [eventLocationEmbededLink, seteventLocationEmbededLink] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const date = new Date();
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    volunteersRequired: '',
    eventDurationInDays: '',
    eventStartDate: '',
    eventEndDate: '',
    eventStartTime: '',
    eventEndTime: '',
    universityId: '',
    country: "",
    city: ""
  });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChangeLocation = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

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
    const googleMapsUrl = `https://www.google.com/maps?q=${result.lat},${result.lon}`;
    setEventLocationLink(googleMapsUrl);
    setLong(result.lon);
    setLat(result.lat);
    const embdLink = `<a href=${googleMapsUrl} target="_blank" rel="noopener noreferrer">
      <img src=${mapUrl} alt="Map" width="450" height="450" />
    </a>`;
    seteventLocationEmbededLink(embdLink);
    setResults([]);
  };

  const handleUnivChange = (e) => {
    setFormData({ ...formData, universityId: e.target.value });
  };

  const allUniversities = async () => {
    try {
      let response = await getalluniversities();
      setUniversity(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

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
    setFormData({ ...formData, country: country });
    setSelectedCountryISO(`${filterIso[0].Iso2}`.toLowerCase());
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", { country: country })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
    setCity("");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCity(city);
    setFormData({ ...formData, city: city });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.eventStartDate > formData.eventEndDate) {
      return toast.error("End Date can't be less than Start Date");
    }
    let todaysDate = (date.getFullYear() + "-" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()));
    if (formData.eventStartDate < todaysDate) {
      return toast.error("Start date must be greater or equal to today's date");
    }
    try {
      let response = await createEvent(selectedFile, formData, eventLocationEmbededLink, eventLocationLink, eventLocationName, long, lat);
      if (response.data.status === "success") {
        navigate("/manageevents");
        return toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.response?.data.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 mt-8 bg-white dark:bg-gray-500 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor="eventImage" className="block mb-2 font-medium dark:text-white">Event Image <span className="text-red-500">*</span></label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div className="mb-4">
          <label htmlFor="eventName" className="block mb-2 font-medium dark:text-white">Event Name <span className="text-red-500">*</span></label>
          <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block mb-2 font-medium dark:text-white">Event Description <span className="text-red-500">*</span></label>
          <textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="volunteersRequired" className="block mb-2 font-medium dark:text-white">Volunteers Required <span className="text-red-500">*</span></label>
          <input type="number" id="volunteersRequired" name="volunteersRequired" value={formData.volunteersRequired} onChange={handleChange} min={2} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationLink" className="block mb-2 font-medium dark:text-white">Event Location <span className="text-red-500">*</span></label>
          <div className="relative">
            <input type="text" className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={query} onChange={handleChangeLocation} placeholder="Enter location..." />
            <ul className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 w-full mt-1 max-h-40 overflow-y-auto rounded-lg shadow-lg z-10">
              {results.map((result, index) => (
                <li className="p-2 cursor-pointer text-white hover:bg-gray-200 dark:hover:bg-gray-700" key={index} onClick={() => handleSelectLocation(result)}>
                  {result.display_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="eventDurationInDays" className="block mb-2 font-medium dark:text-white">CSP Hours (total for the event) <span className="text-red-500">*</span></label>
          <input type="number" id="eventDurationInDays" name="eventDurationInDays" value={formData.eventDurationInDays} onChange={handleChange} min={5} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="eventStartDate" className="block mb-2 font-medium dark:text-white">Event Start Date <span className="text-red-500">*</span></label>
            <input type="date" id="eventStartDate" name="eventStartDate" value={formData.eventStartDate} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="eventEndDate" className="block mb-2 font-medium dark:text-white">Event End Date <span className="text-red-500">*</span></label>
            <input type="date" id="eventEndDate" name="eventEndDate" value={formData.eventEndDate} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="eventStartTime" className="block mb-2 font-medium dark:text-white">Event Start Time <span className="text-red-500">*</span></label>
            <input type="time" id="eventStartTime" name="eventStartTime" value={formData.eventStartTime} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="eventEndTime" className="block mb-2 font-medium dark:text-white">Event End Time <span className="text-red-500">*</span></label>
            <input type="time" id="eventEndTime" name="eventEndTime" value={formData.eventEndTime} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className='mb-4'>
          {university.length === 0 && <h1 className="text-center text-red-500 dark:text-red-400">No Universities Found For Collaboration</h1>}
          {university.length > 0 &&
            <div>
              <label htmlFor="university" className="block mb-2 font-medium dark:text-white">University</label>
              <select id="university" value={formData.universityId} onChange={handleUnivChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option className='bg-gray-100 dark:bg-gray-700' value="">Select University</option>
                {university.map((univ) => (
                  <option className='bg-gray-100 dark:bg-gray-700' key={univ._id} value={univ._id}>
                    {univ.universityName} - {univ.city}, {univ.country}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="country" className="block mb-2 font-medium dark:text-white">Country</label>
            <select id="country" value={country} onChange={handleCountryChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option className='bg-gray-100 dark:bg-gray-700' value="">Select Country</option>
              {countries.map((country) => (
                <option className='bg-gray-100 dark:bg-gray-700' key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block mb-2 font-medium dark:text-white">City</label>
            <select id="city" value={city} onChange={handleCityChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option className='bg-gray-100 dark:bg-gray-700' value="">Select City</option>
              {cities.map((city) => (
                <option className='bg-gray-100 dark:bg-gray-700' key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
