import React, { useState, useEffect, useContext } from 'react';
import context from '../../../Context/HarmonyContext';
import { MdOutlineDateRange } from 'react-icons/md';
import { CiClock1 } from 'react-icons/ci';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import toast from 'react-hot-toast';

const EventDetailed = () => {
  const createMarkup = (html) => {
    return { __html: html };
  };
const navigate=useNavigate();
  
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [status,setStatus]=useState("");
  const { eventDetails,checkThePending,changeEventStatus,deleteEvent } = useContext(context);
  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log(id);
        const response = await eventDetails(id);
        setEvent(response.data.body);
        let response1=await checkThePending(response.data.body._id,response.data.body.universityId?._id);
      if(response1.data.status==="success"){
        setStatus(response1.data.body);
      }      

      } catch (error) {
        console.log(error);
      }
    };
    getDetails();

  }, [id, eventDetails]);
  const changeTheStatus=async()=>{
    try {
      let response=await changeEventStatus(id);
      if(response.data.status==="success"){
        toast.success(response.data.message);
        return navigate("/markAttendance")
      }
      
    } catch (error) {
      return toast.error(error?.response?.data.message)
    }
  }

  const checkTheCollobaration=async()=>{
    try {
      
      let response=await checkThePending(event._id,event.universityId?._id);
      if(response.data.status==="success"){
        setStatus(response.data.body);
      }      
      
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete=async()=>{
    try {
      let response=await deleteEvent(id);
      if(response.data.status==="success"){
        navigate('/manageevents')
        return toast.success(response.data.message);
      }
      
    } catch (error) {
      return toast.error(error.response.data.message)
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
    {
      <div className=' flex'>
      <h1 className="text-3xl font-bold mb-6">{event.EventName}</h1>
      <FaPencilAlt className='ml-3 mt-3' title='Edit Details' cursor={"pointer"} onClick={()=>navigate("/updateEvent",{state:{event}})}/>
      </div>
    }
    <div className='mt-4 mb-4'>
{     
 event?.eventStatus==="upcoming"&&  <button className='bg-green-500 text-white p-1 rounded-md' onClick={changeTheStatus}>Start Event</button>
}   
 </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center">
          <MdOutlineDateRange className="text-gray-500 mr-2" />
          <p><span className="font-semibold mr-2">Start Date:</span> {new Date(event.eventStartDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center">
          <MdOutlineDateRange className="text-gray-500 mr-2" />
          <p><span className="font-semibold mr-2">End Date:</span> {new Date(event.eventEndDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center">
          <CiClock1 className="text-gray-500 mr-2" />
          <p><span className="font-semibold mr-2">Start Time:</span> {event.eventStartTime}</p>
        </div>
        <div className="flex items-center">
          <CiClock1 className="text-gray-500 mr-2" />
          <p><span className="font-semibold mr-2">End Time:</span> {event.eventEndTime}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Description</h2>
      <div className=''>
        <p className="mb-4 whitespace-pre-wrap break-all">{event.EventDescription}</p>
      </div>
        <h2 className="text-xl font-bold mb-2">Collaborated With</h2>
        {console.log(event)}
        <p><strong>{event.universityId?.universityName}</strong>   {status}</p>

        <h2 className="text-xl font-bold mb-2">Volunteers Required</h2>
        <p className="mb-4">{event.VolunteersRequired}</p>
        <h2 className="text-xl font-bold mb-2">Event Location Name</h2>
        <p className="mb-4">{event.eventLocationName}</p>
        <h2 className="text-xl font-bold mb-2">Event Location Link</h2>
        <div className="mb-4 overflow-hidden">
          <a href={event.eventLocationLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{event.eventLocationLink}</a>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Status</h2>
        <p className="mb-4">Upcoming</p>
        <h2 className="text-xl font-bold mb-2">Embedded Link</h2>
        <div className='overflow-hidden' dangerouslySetInnerHTML={createMarkup(event.eventLocationEmbededLink)}></div>
        </div>
        {
          event.eventStatus==="upcoming" &&
          <div className='flex mt-6 justify-center'>
          <button onClick={()=>handleDelete()} className='bg-red-500 text-white rounded-md p-1'>Delete</button>
        </div>
        }

    </div>
  );
};

export default EventDetailed;
