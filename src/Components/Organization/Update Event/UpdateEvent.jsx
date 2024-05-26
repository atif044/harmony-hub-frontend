import React, { useContext, useState, useEffect } from 'react';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateEvent = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateEvents, getalluniversities } = useContext(context);
  const [university, setUniversity] = useState([]);
  const [formData, setFormData] = useState({
    eventName: location.state?.event.EventName || '',
    eventDescription: location.state?.event.EventDescription || '',
    volunteersRequired: location.state?.event.VolunteersRequired || '',
    eventLocationLink: location.state?.event.eventLocationLink || '',
    eventLocationName: location.state?.event.eventLocationName || '',
    eventLocationEmbeddedLink: location.state?.event.eventLocationEmbededLink || '',
    eventDurationInDays: Number(location.state?.event.eventDurationInDays) || '',
    eventStartDate: new Date(location.state?.event.eventStartDate).toISOString().split('T')[0] || '',
    eventEndDate: new Date(location.state?.event.eventEndDate).toISOString().split('T')[0],
    eventStartTime: location.state?.event.eventStartTime || '',
    eventEndTime: location.state?.event.eventEndTime || '',
    universityId: location.state?.event.universityId._id || ''
  });
  const [eventLocationName, setEventLocationName] = useState('');
  const [eventLocationLink, setEventLocationLink] = useState('');
  const [eventLocationEmbededLink, setEventLocationEmbededLink] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleUnivChange = (e) => {
    setFormData({ ...formData, universityId: e.target.value });
  };

  const allUniversities = async () => {
    try {
      let response = await getalluniversities();
      setUniversity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!location.state?.event) {
      return navigate("/manageevents");
    }
    setQuery(location.state?.event.eventLocationName || '');
    setEventLocationName(location.state?.event.eventLocationName || '');
    setEventLocationEmbededLink(location.state?.event.eventLocationEmbededLink || '');
    setEventLocationLink(location.state?.event.eventLocationLink || '');
  }, []);

  useEffect(() => {
    allUniversities();
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await updateEvents(selectedFile, formData, location.state?.event._id, eventLocationName, eventLocationLink, eventLocationEmbededLink, lat, long);
      if (response.data.status === "success") {
        navigate(`/detailedevent/${location.state?.event._id}`);
        return toast.success(response.data.message);
      }
    } catch (error) {
      return toast.error(error.response?.data.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChangeLocation = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setEventLocationName(inputValue);

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
    setEventLocationEmbededLink(embdLink);
    setResults([]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Update Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="eventImage" className="block mb-2 font-medium dark:text-white">
            Event Image
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="mb-4">
          <label htmlFor="eventName" className="block mb-2 font-medium dark:text-white">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.eventName && (
            <p className="text-red-500 mt-1">{errors.eventName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block mb-2 font-medium dark:text-white">
            Event Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          ></textarea>
          {errors.eventDescription && (
            <p className="text-red-500 mt-1">{errors.eventDescription}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="volunteersRequired" className="block mb-2 font-medium dark:text-white">
            Volunteers Required <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="volunteersRequired"
            name="volunteersRequired"
            value={formData.volunteersRequired}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.volunteersRequired && (
            <p className="text-red-500 mt-1">{errors.volunteersRequired}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocationLink" className="block mb-2 font-medium dark:text-white">
            Event Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              value={query}
              onChange={handleChangeLocation}
              placeholder="Enter location..."
            />
            <ul className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 w-full mt-1 max-h-40 overflow-y-auto rounded-lg shadow-lg z-10">
              {results.map((result, index) => (
                <li className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" key={index} onClick={() => handleSelectLocation(result)}>
                  {result.display_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="eventDurationInDays" className="block mb-2 font-medium dark:text-white">
            CSp Hours (total) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="eventDurationInDays"
            name="eventDurationInDays"
            value={formData.eventDurationInDays}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.eventDurationInDays && (
            <p className="text-red-500 mt-1">{errors.eventDurationInDays}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventStartDate" className="block mb-2 font-medium dark:text-white">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="eventStartDate"
            name="eventStartDate"
            value={formData.eventStartDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.eventStartDate && (
            <p className="text-red-500 mt-1">{errors.eventStartDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventEndDate" className="block mb-2 font-medium dark:text-white">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="eventEndDate"
            name="eventEndDate"
            value={formData.eventEndDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.eventEndDate && (
            <p className="text-red-500 mt-1">{errors.eventEndDate}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventStartTime" className="block mb-2 font-medium dark:text-white">
            Event Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            timeFormat="HH:mm"
            id="eventStartTime"
            name="eventStartTime"
            value={formData.eventStartTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            required
          />
          {errors.eventStartTime && (
            <p className="text-red-500 mt-1">{errors.eventStartTime}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="eventEndTime" className="block mb-2 font-medium dark:text-white">
            Event End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="eventEndTime"
            name="eventEndTime"
            value={formData.eventEndTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            timeFormat="HH:mm"
            required
          />
          {errors.eventEndTime && (
            <p className="text-red-500 mt-1">{errors.eventEndTime}</p>
          )}
        </div>
        <div className="mb-4">
          {
            university.length === 0 && <h1 className="text-red-500">No Universities Found For Collaboration</h1>
          }

          {
            university.length > 0 &&
            <div>
              <label htmlFor="university" className="block mb-2 font-medium dark:text-white">University</label>
              <select
                id="university"
                value={formData.universityId}
                onChange={handleUnivChange}
                className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white`}
              >
                <option className="bg-gray-50 dark:bg-gray-700" value="">Select University</option>
                {university.map((univ) => (
                  <option className="bg-gray-50 dark:bg-gray-700" key={univ._id} value={univ._id}>
                    {univ.universityName} - {univ.city}, {univ.country}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
