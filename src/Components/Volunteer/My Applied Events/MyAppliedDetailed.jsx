import React, { useContext, useState,useEffect } from "react";
import context from "../../../Context/HarmonyContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "./Modal";
const OtherEvent = ({ eventName, date }) => {
  return (
    <div className="flex items-center mb-4">
      {/* Event Cover Photo */}
      <img
        src="https://via.placeholder.com/150"
        alt="Event Cover"
        className="w-16 h-16 rounded-md mr-4"
      />
      {/* Event Details */}
      <div>
        <p className="font-semibold">{eventName}</p>
        <p className="text-gray-600">{date}</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  // Sample data for other events
  const otherEvents = [
    { eventName: "Event 1", date: "March 10, 2024" },
    { eventName: "Event 2", date: "March 15, 2024" },
    { eventName: "Event 3", date: "March 20, 2024" },
    { eventName: "Event 4", date: "March 25, 2024" },
  ];

  // Sample data for recent events
  const recentEvents = [
    { eventName: "Recent Event 1", date: "March 5, 2024" },
    { eventName: "Recent Event 2", date: "March 8, 2024" },
  ];

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Other Events</h2>
      {/* Display other events */}
      {otherEvents.map((event, index) => (
        <OtherEvent key={index} eventName={event.eventName} date={event.date} />
      ))}
      {/* Recent Events */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        {recentEvents.map((event, index) => (
          <OtherEvent key={index} eventName={event.eventName} date={event.date} />
        ))}
      </div>
      {/* Advertisement */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">Advertisement</p>
        {/* Add your advertisement here */}
      </div>
    </div>
  );
};
const MyDetailedEventPage = () => {
  const {id}=useParams()
  // State to track the number of attendees
  const [attendeesApplied, setAttendeesApplied] = useState(50);
  const attendeesRequired = 100;
  const {detailedEventForVolunteer,joinEvent,reviewTheEvent,myAttendance,requestCertificate,getMyContractDetails,checkIfAlreadyRequested,checkCertificteExistOrNot}=useContext(context);
  const [event,setEvent]=useState();
  const [requested,setRequested]=useState(false);
  const [myEventAttendance,setMyAttendance]=useState('');
  const [certification,setCertification]=useState('');
  const [email,setEmail]=useState('')
  const reviewEvent=async(rating)=>{
    try {
      const response=await reviewTheEvent(id,rating);
      if(response.data.status==="success"){
        return toast.success(response.data.message)
      }
    } catch (error) {
      return toast.error(error?.response.data.message)
    }
  }
  
  let checkRequest=async()=>{
    try {
      let response=await checkIfAlreadyRequested(id);
      if(response.data.status==="success"){
        setRequested(response.data.body)
      }
    } catch (error) {
      console.log(error)
    }
  }
  let fetchAttendance=async()=>{
    try {
      let response= await myAttendance(id);
      if(response.data.status==="success"){
          setMyAttendance(response.data.body);
          setEmail(response.data.email);
          
      }
    } catch (error) {
      console.log(error)
    }
  }
  let fetchDetails=async()=>{
      try {
        let response=await detailedEventForVolunteer(id);
        setEvent(response.data.body);
      } catch (error) {
        console.log(error)
      }
  }
  let clickToJoin=async()=>{
    try {
  let response=await joinEvent(event?._id);
    if(response.data.status==="success"){
      return toast.success(response.data.message);
    }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data.message);
    }
  }
  useEffect(() => {
    fetchDetails();
    fetchAttendance()
    getMyContractDetails()
    checkRequest()
  }, []);

  const checkForCertificate=async()=>{
    try {
      
        let res=await checkCertificteExistOrNot(email,id);
        setCertification(res)
          

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    
    if(email!==""){
      checkForCertificate()
    }
  }, [email])

  // Function to handle joining the event
  const handleJoinEvent = () => {
    // Increment the number of attendees when someone joins the event
    setAttendeesApplied(attendeesApplied + 1);
  };
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const createMarkup = (html) => {
    return { __html: html };
  };
  const getMyCertificate=async()=>{
    try {
      await getMyContractDetails()
      let response=await requestCertificate(id);
      if(response.data.status==="success"){
        return toast.success(response.data.message);
      }
      
    } catch (error) {
     toast.error(error.response.data.message) 
    }
  }
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 font-sans">
      <div className="flex flex-wrap justify-center lg:justify-start">
        {/* Event Details */}
        <div className="lg:w-3/4 pr-8"> {/* Add right padding */}
          {/* Event Name */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{event?.EventName}</h1>
          {/* Organizer and Date/Time */}
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700">Organized by:<strong>{event?.organizationId.organizationName}</strong></p>
          </div>
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700">Date :  {daysOfWeek[new Date(event?.eventStartDate).getDay()]}, {months[new Date(event?.eventStartDate).getMonth()]} {new Date(event?.eventStartDate).getDate()}, {new Date(event?.eventStartDate).getFullYear()}  -  {daysOfWeek[new Date(event?.eventEndDate).getDay()]}, {months[new Date(event?.eventEndDate).getMonth()]} {new Date(event?.eventEndDate).getDate()}, {new Date(event?.eventEndDate).getFullYear()}   </p>
          </div>
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700">Time: {event?.eventStartTime} - {event?.eventEndTime}</p>
          </div>
          <div className="flex items-center mb-8">
            <svg
              className="w-8 h-8 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 9v6m0 0v6m0-6h12m-12 0h12m-6-6v6"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700">Vounteers Required: {event?.VolunteersIdApplied.length +` / ${event?.VolunteersRequired}`}</p>
          </div>
          <p className="text-xl font-semibold text-gray-600">Attendance: {myEventAttendance} </p>
{      
  (certification!==""&&certification.length!==0)?
  (
    <div>
    <button onClick={openModal} className="p-1 bg-green-500 rounded-md text-white">View</button>
{    modalOpen && <Modal imageUrl={certification[0][2]} onClose={closeModal} />
}
    </div>  
  )
  
  :
   requested? "Already Requested":   <button className="bg-black text-white p-1 rounded-md hover:bg-slate-600" onClick={getMyCertificate}>Request Certificate</button>
}          {/* Event Banner */}
          <img
            src={`${event?.EventImage}`}
            alt="Event Banner"
            className="mt-8 rounded-lg w-full"
          />

          {/* Event Description */}
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Event Description</h2>
            <p className="text-gray-700">
              {event?.EventDescription}
            </p>
          </div>

          {/* Location Map */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="relative w-full h-80" dangerouslySetInnerHTML={createMarkup(event?.eventLocationEmbededLink)}>
              {/* Embedded Map */}
              
            </div>
          </div>

          {/* Certification */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Certification by</h2>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Organizer Signature"
                className="w-24 h-24 rounded-full mr-4"
              />
              <p>{event?.organizationId.organizationName}</p>
            </div>
          </div>

          {/* Reward Section */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Rewards</h2>
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-xl font-semibold text-gray-700">Certificate of Attendance</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-8 h-8 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <p className="text-xl font-semibold text-gray-700">{event?.eventDurationInDays} Credit Hours Added to Profile</p>
            </div>
          </div>

          {event?.eventStatus==="upcoming"&&
          <div className="flex justify-center mt-8">
            <button disabled onClick={clickToJoin} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Withdraw
            </button>
          </div>
          }
        
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Give Rating</h1>
            <button className="text-green-600 p-1 rounded-md border-s-2 border-r-2 hover:text-green-900 mr-2" onClick={()=>reviewEvent("p")} >
                    👍
                  </button>
                  <button className="text-red-600 p-1 rounded-md border-r-2 border-s-2 ml-2 hover:text-red-900" onClick={()=>reviewEvent("n")} >
                    👎
                  </button>
          </div>
        
        </div>

       {/* Sidebar */}
<div className="lg:w-1/4 lg:pl-0 mt-8 lg:mt-0"> {/* Adjust the padding value here */}
  <Sidebar />

        </div>
      </div>
    </div>
  );
};

export default MyDetailedEventPage;
