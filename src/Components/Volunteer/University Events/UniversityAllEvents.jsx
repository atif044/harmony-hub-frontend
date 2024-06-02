import React, { useContext, useState,useEffect } from 'react'
import EventCard from './EventCard'
import context from '../../../Context/HarmonyContext'
const UniversityEvents = () => {
    const {getAllUniEvents}=useContext(context);
    const [events,setEvents]=useState([]);
    const [error,setError]=useState('')
    let fetchUniversitiesEvent=async()=>{
    try {
        let response=await getAllUniEvents();
        console.log(response)
        if(response.data.status==="success"){
            setEvents(response.data.body?.currentCollaboratedEvents||[])
        }
    } catch (error) {
        setError(error?.response.data.message)
        console.log(error)
    }
    }
   
    useEffect(()  => {
        fetchUniversitiesEvent()
    }, []);
  return (
    <>
    {
        error.length!=0 && <h1 className='ml-10 mr-10'>{error}</h1>
    }
    {
        error=="" &&
    <div className='container mx-auto mt-5'>
    <h1 className="text-3xl font-bold mb-5">University Events</h1>
    {
        events.length===0 && <h1>
            There is no event your university is collaborating with
        </h1>
    }
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{
    events.length>0 && events.map((event, index) => (
  <EventCard key={index} event={event} />
))
}
</div>
</div>}
</>
  )
}

export default UniversityEvents