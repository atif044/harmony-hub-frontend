import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';

const EventCard = ({ event,set,fetchAgain }) => {
  const navigate=useNavigate()
  const {endEvent}=useContext(context);
  const EndEvent=async(id)=>{
    try {
      let response=await endEvent(id);
      if(response.data.status==="success"){
        set(!fetchAgain)
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response.data.message)
    }
  }
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img src={event.EventImage} alt={event.EventName} className="w-full h-32 object-cover" />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-1">{event.EventName}</div>
        <p className="text-gray-700 text-sm">
          Date: {new Date(event.eventStartDate).toLocaleDateString()}, Time: {event.eventStartTime}
        </p>
      </div>
      <div className='flex justify-evenly'>
      <div>
      <button className='bg-transparent text-green-500  rounded-md p-1 ml-4 mb-4 border-solid border-2' title='Mark Attendance' onClick={()=>navigate(`/reviewVolunteer/${event._id}`)}> Review Volunteers  </button>
      </div>
      </div>

    </div>
  );
};
export default EventCard;