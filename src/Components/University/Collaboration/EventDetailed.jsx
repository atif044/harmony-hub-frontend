import React, { useState, useEffect, useContext } from 'react';
import context from '../../../Context/HarmonyContext';
import { MdOutlineDateRange } from 'react-icons/md';
import { CiClock1 } from 'react-icons/ci';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EventDetailed = () => {
  const createMarkup = (html) => {
    return { __html: html };
  };
const navigate=useNavigate();
  
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [status,setStatus]=useState("");
  const { getDetail,approveEvent,rejectEvent } = useContext(context);
  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log(id);
        const response = await getDetail(id);
        setEvent(response.data.body)

      } catch (error) {
        console.log(error);
      }
    };
    getDetails();

  }, [id ]);

    const approveThisEvent=async(id)=>{
        try {
            let response=await approveEvent(id);
            if(response.data.status==="success"){
                toast.success(response.data.message);
                navigate('/collabEvents')

            }

        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }
    const rejectThisEvent=async(id)=>{
        try {
            let response=await rejectEvent(id);
            if(response.data.status==="success"){
                toast.success(response.data.message);
                navigate('/collabEvents')
            }

        } catch (error) {

            toast.error(error?.response?.data.message)
        }
    }
  return (
    <div className="container mx-auto px-4 py-8">
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
      {
        event.eventStatus==="upcoming" &&
        <div className='flex'>
        <button className='bg-green-500 text-white p-1 rounded-md' onClick={()=>approveThisEvent(event._id)}>Accept</button>
        <button className='bg-red-500 text-white rounded-md p-1 ml-2' onClick={()=>rejectThisEvent(event._id)}>Reject</button>
      </div>}
        <h2 className="text-xl font-bold mb-2">Description</h2>
      <div className=''>
        <p className="mb-4 whitespace-pre-wrap break-all">{event.EventDescription}</p>
      </div>
        <h2 className="text-xl font-bold mb-2">Collaborated With</h2>
        {console.log(event)}
        <p><strong>{event.organizationId?.organizationName}</strong>   {status}</p>

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
        <p className="mb-4">{event.eventStatus}</p>
        <h2 className="text-xl font-bold mb-2">Embedded Link</h2>
        <div className='overflow-hidden' dangerouslySetInnerHTML={createMarkup(event.eventLocationEmbededLink)}></div>
        </div>

    </div>
  );
};

export default EventDetailed;
