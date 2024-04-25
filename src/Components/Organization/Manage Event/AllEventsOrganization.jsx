import React, { useContext,useEffect } from 'react';
import EventCard from './EventCard';
import context from '../../../Context/HarmonyContext';
import { useState } from 'react';

const EventList = () => {
  const {allevents}=useContext(context);
  const [events,setEvents]=useState([]);
  const fetchAllEvents=async()=>{
    try {
      let response=await allevents();
      if(response.data.status==="success"){
        setEvents(response.data.body);
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
  fetchAllEvents()
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
  );
};


export default EventList;
