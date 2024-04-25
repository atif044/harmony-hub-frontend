import React, { useContext, useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser, faClock, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';
import context from '../../../Context/HarmonyContext';
import { useNavigate } from 'react-router-dom';

// EventCard component
function EventCard({ name, location, organizer, duration, attendees, bannerImage,navigate,id }) {
  return (
    <div className="bg-white rounded-lg shadow-md w-full  px-3 mb-6">
      <img src={bannerImage} alt={name}  className="rounded-t-lg h-32 object-cover w-full" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="flex items-center text-gray-700 mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
          {location}
        </p>
        <p className="flex items-center text-gray-700 mb-2">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2" />
          {organizer}
        </p>
        <p className="flex items-center text-gray-700 mb-2">
          <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
          {duration}
        </p>
        <p className="flex items-center text-gray-700 mb-2">
          <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-2" />
          Total Attendees: {attendees}
        </p>
        <div className="flex justify-between">
          <button className="bg-transparent hover:bg-transparent text-gray-700 font-bold py-2 px-4 rounded" onClick={() => toggleHeart()}>
            <FontAwesomeIcon icon={faHeart} className="w-6 h-6 heart" />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            navigate(`/event/${id}`)
          }}>Join Now</button>
        </div>
      </div>
    </div>
  );
}

// EventListingPage component
function EventListingPage() {
  // State to track the number of attendees  
  const navigate=useNavigate();
  const {eventsForVolunteer}=useContext(context);
  const [events,setEvents]=useState([]);
  let findAll=async()=>{
    try {
      let response=await eventsForVolunteer();
      console.log(response)
      if(response.data.status==="success"){
        setEvents(response.data.body);
      }  
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {
findAll()
}, [])

  return (
    <div className=" mt-8 font-sans leading-normal tracking-normal">
      {/* Event Card Section */}
      {events.length ===0 && <h1 className='text-black ml-8 mt-8 text-center font-bold text-2xl'> No Events Yet</h1>}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
        {
          events.length>0 && events.map((event)=>{
            return <EventCard
            name={event.EventName}
            bannerImage={event.EventImage}
            location={event.eventLocationName}
            organizer={event.organizationId.organizationName}
            duration={new Date(event.eventStartDate).toLocaleDateString() + " - "+ new Date(event.eventEndDate).toLocaleDateString()}
            attendees={event.VolunteersIdApplied.length +` / ${event.VolunteersRequired}`}
            navigate={navigate}
            id={event._id}
             />
          })
        }
      </div>      
    </div>
  );
}

// Function to handle toggling heart icon
function toggleHeart() {
  // Implementation for toggling heart icon
  console.log("Heart toggled");
}

export default EventListingPage;
