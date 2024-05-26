import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser, faClock, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
function EventCard(event,key) {
    const navigate=useNavigate()
    console.log(event.event)
    const { name, eventLocationName, organizer, eventStartDate,eventEndDate, EventImage, _id }=event.event;
    return (
      <div className="bg-white rounded-lg shadow-md w-full px-3 mb-6">
        <img src={EventImage} alt={name} className="rounded-t-lg h-32 object-cover w-full" />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{name}</h2>
          <p className="flex items-center text-gray-700 mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
            {eventLocationName}
          </p>
          
          <p className="flex items-center text-gray-700 mb-2">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
            {new Date(eventStartDate).toDateString() } to {new Date(eventEndDate).toDateString()}
          </p>
          <div className="flex justify-between">
          
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                navigate(`/event/${_id}`);
              }}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default EventCard