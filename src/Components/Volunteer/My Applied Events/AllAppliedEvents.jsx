import React, { useContext, useState,useEffect } from 'react'
import EventCard from './EventCard'
import context from '../../../Context/HarmonyContext'
const AllAppliedEvents = () => {
    const {fetchMyPending,fetchMyApproved}=useContext(context);
    const [events,setEvents]=useState([]);
    const [PendingEvents,setPendingEvents]=useState([]);
    let fetchPending=async()=>{
    try {
        let response=await fetchMyPending();
        if(response.data.status==="success"){
            setPendingEvents(response.data.pending);
        }
    } catch (error) {
        
    }
    }
    let fetchAccepted=async()=>{
    try {
        let response=await fetchMyApproved();
        if(response.data.status==="success"){
            setEvents(response.data.accepted);
        }
    } catch (error) {
        
    }
    }
    useEffect(()  => {
                fetchPending();
                fetchAccepted();
    }, []);
  return (
    <>
{  
    PendingEvents.length>0&& <div className='container mx-auto mt-5'>
    <h1 className="text-3xl font-bold mb-5">Pending Events</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{PendingEvents.length>0 && PendingEvents.map((event, index) =>  (
  <EventCard key={index} event={event} />
))}
</div>
</div>}
    {
        events.length>0 && <div className='container mx-auto mt-5'>
    <h1 className="text-3xl font-bold mb-5">Accepted Events</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{events.length>0 && events.map((event, index) => (
  <EventCard key={index} event={event} />
))}
</div>
</div>}
</>
  )
}

export default AllAppliedEvents