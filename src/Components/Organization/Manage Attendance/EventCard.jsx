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
      <div>
      <button className='bg-transparent text-green-500  rounded-md p-1 ml-4 mb-4 border-solid border-2' onClick={()=>navigate(`/markAttendance/${event._id}`)}> Mark Attendance </button>
      </div>

      </div>

    </div>
  );
};
export default EventCard;