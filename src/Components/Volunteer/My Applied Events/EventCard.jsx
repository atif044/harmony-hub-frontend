import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate=useNavigate()
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img src={event.EventImage} alt={event.EventName} className="w-full h-32 object-cover" />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-1">{event.EventName}</div>
        <p className="text-gray-700 text-sm">
          Date: {new Date(event.eventStartDate).toLocaleDateString()}, Time: {event.eventStartTime}
        </p>
      </div>
      <button className='bg-zinc-600 ml-2 mb-4 text-white p-1 rounded-md' onClick={()=>navigate(`/myAppliedDetailed/${event._id}`)}>More Details</button>
    </div>
  );
};
export default EventCard;