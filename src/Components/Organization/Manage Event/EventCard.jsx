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
      <div className='flex justify-between'>
      <button className='bg-zinc-600 ml-2 mb-4 text-white p-1 rounded-md' onClick={()=>navigate(`/detailedevent/${event._id}`)}>More Details</button>
      <div>
      <button onClick={()=>navigate(`/approveVolunteers/${event._id}`)} className='p-1  rounded-md mr-8 mb-4 relative outline bg-transparent text-green-500'>Approve   {event.VolunteersIdAppliedRequested.length>0 &&<span class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>}
 </button>
      </div>
      </div>

    </div>
  );
};
export default EventCard;