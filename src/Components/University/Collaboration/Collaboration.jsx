import React, { useContext, useEffect, useState } from 'react'
import context from '../../../Context/HarmonyContext'
import EventCard from './EventCard';
const Collaboration = () => {
    const {getAllPendingEvents}=useContext(context);
    const [events,setEvent]=useState([]);
    const getAllEventes=async()=>{
        try {
            let response=await getAllPendingEvents();
            if(response.data.status==="success"){
                setEvent(response.data.body.pendingCollaborateEvents);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllEventes()
    }, [])
  return (
    <div className='container mx-auto mt-5'>
          <h1 className="text-3xl font-bold mb-5">Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  </div>
  )
}

export default Collaboration