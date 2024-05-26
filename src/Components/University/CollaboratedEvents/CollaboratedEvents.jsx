import React, { useContext, useEffect, useState } from 'react'
import context from '../../../Context/HarmonyContext'
import EventCard from '../Collaboration/EventCard';
const CollaboratedEvents = () => {
const {getAllCollab}=useContext(context);
const [events,setEvent]=useState([]);
const [pastEvents,setpastEvents]=useState([]);
const checkAll=async()=>{
    try {
        let response=await getAllCollab();
        setEvent(response.data.body.currentCollaboratedEvents)
        setpastEvents(response.data.body.pastCollaboratedEvents)
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
checkAll()

}, [])
  return (
    <div className='container ml-10 mr-10 mt-5'>
          <h1 className="text-3xl font-bold mb-5">Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
          <h1 className="text-3xl font-bold mb-5">Past Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pastEvents.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  </div>
  )
}

export default CollaboratedEvents