import Cookies from 'js-cookie';
import { useState,useEffect} from "react";
import context from './HarmonyContext.js';
import api from '../api/api';
const HarmonyState = (props) => {
  const[organizationtoken,setToken]=useState(Cookies.get('harmony-hub-organization')); 
  const[universitytoken,setunivToken]=useState(Cookies.get('harmony-hub-university')); 
  const[volunteertoken,setVolunteerToken]=useState(Cookies.get('harmony-hub-volunteer'));
  const[admintoken,setadminToken]=useState(Cookies.get('harmony-hub-admin'));

  const [isVerified,setisVerifed]=useState(Cookies.get('isVerified'));
  useEffect(() => {
  }, [organizationtoken])
    
    //====================================ORGANIZATION
const SignupOrganization=async(data)=>{
    try {
const response =api.post(`/organization/createOrganizationAccount`,{data}); 
    return response
    } catch (error) {  
     return error;   
    }
} 
const loginOrganization=async(data)=>{
    try {
const response =api.post(`/organization/loginOrganizationAccount`,{data}); 
    return response
    } catch (error) {  
     return error;   
    }
} 
const createEvent=async(image,body)=>{
  const {eventName,eventDescription,volunteersRequired,eventLocationLink,eventLocationName,eventLocationEmbeddedLink,country,city,eventDurationInDays,eventStartDate,eventEndDate,eventStartTime,eventEndTime,universityId}=body;

  const formData=new FormData();
     formData.append("image", image);
     formData.append("EventName",eventName);
     formData.append("EventDescription",eventDescription);
     formData.append("VolunteersRequired",volunteersRequired);
     formData.append("eventLocationLink",eventLocationLink);
     formData.append("eventLocationName",eventLocationName);
     formData.append("eventLocationEmbededLink",eventLocationEmbeddedLink);
     formData.append("eventDurationInDays",eventDurationInDays);
     formData.append("eventStartDate",eventStartDate);
     formData.append("eventEndDate",eventEndDate);
     formData.append("eventStartTime",eventStartTime);
     formData.append("eventEndTime",eventEndTime);
     formData.append("universityId",universityId);
     formData.append("country",country)
     formData.append("city",city)
     
     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
     
  try {
    let response=api.post("/organization/createEvent",formData,config)
    return response;
  } catch (error) {
    return error;
  }
}
const verificationOTP=async(token)=>{
  try {
    let response=api.post(`/organization/verifyEmail/${token}`);
    return response;
  } catch (error) {
    return error;
  }
}
const resendOTP=async()=>{
  try {
    let response=api.post("/organization/resendEmail");
    return response;
    
  } catch (error) {
    return error;
  }
}
const getalluniversities=async()=>{
  try { 
    let response=api.get("university/getalluniversities");
    return response;
    
  } catch (error) {
    return error;
  }
}
const logOut=async()=>{
  Cookies.remove('harmony-hub-organization');
  Cookies.remove('harmony-hub-volunteer');
  Cookies.remove('harmony-hub-university');
  Cookies.remove('harmony-hub-admin');
  Cookies.remove('isVerified');
  setToken("")
  setVolunteerToken("")
  setunivToken("")
  setisVerifed(Cookies.get('isVerified'))
}
const allevents=async()=>{
  try {
    let response=api.get('/organization/allevents');
    return response;
  } catch (error) {
    return error
    
  }
}

const eventDetails=async(id)=>{
  try {
    let response=api.get(`/organization/eventdetails/${id}`);
    return response;
  } catch (error) {
    return error;  
  }
}
const updateEvents=async(image,data,id)=>{
  const {eventName,eventDescription,volunteersRequired,eventLocationLink,eventLocationName,eventLocationEmbeddedLink,eventDurationInDays,eventStartDate,eventEndDate,eventStartTime,eventEndTime,universityId}=data;
  const formData=new FormData();
     formData.append("image", image);
     formData.append("EventName",eventName);
     formData.append("EventDescription",eventDescription);
     formData.append("VolunteersRequired",volunteersRequired);
     formData.append("eventLocationLink",eventLocationLink);
     formData.append("eventLocationName",eventLocationName);
     formData.append("eventLocationEmbededLink",eventLocationEmbeddedLink);
     formData.append("eventDurationInDays",eventDurationInDays);
     formData.append("eventStartDate",eventStartDate);
     formData.append("eventEndDate",eventEndDate);
     formData.append("eventStartTime",eventStartTime);
     formData.append("eventEndTime",eventEndTime);
     formData.append("universityId",universityId)
     
     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      let response=api.post(`/organization/eventUpdate/${id}`,formData,config);
      return response;
    } catch (error) {
      return error;
      
    }
}

const checkThePending=async(id,uniId)=>{
  try {
    let response=api.post(`/organization/checkIfpending/${id}`,{uniId});
    return response;
    
  } catch (error) {
    return error
  }
}

const fetchAllVolunteerForSpecificEvent=async(id)=>{
  try {
    let response=api.get(`/organization/fetchVolunteersForApproval/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

const acceptTheVolunteer=async(userId,id)=>{
  try {
    let response=api.post("/organization/acceptTheVolunteer",{eventId:id,id:userId});
    return response;
  } catch (error) {
    return error;
  }
}
const rejectTheVolunteer=async(userId,id)=>{
  try {
    let response=api.post("/organization/rejectTheVolunteer",{eventId:id,id:userId});
    return response;
  } catch (error) {
    return error;
  }
}
const acceptTorejectTheVolunteer=async(userId,id)=>{
  try {
    let response=api.post("/organization/acceptTorejectTheVolunteer",{eventId:id,id:userId});
    return response;
  } catch (error) {
    return error;
  }
}
const rejectToAcceptTheVolunteer=async(userId,id)=>{
  try {
    let response=api.post("/organization/rejectToAcceptTheVolunteer",{eventId:id,id:userId});
    return response;
  } catch (error) {
    return error;
  }
}
//===========================================UNIVERSITY
const signupUniversity=async(body)=>{
  try {
    let response=api.post('/university/createuniversityaccount',body);
    return response;
    
  } catch (error) {
    return error;
  }
}
const loginUniversity=async(body)=>{
  try {
    let response=api.post('/university/loginuniversityaccount',body);
    return response;
    
  } catch (error) {
    return error;
  }
}

const verificationOTPUniversity=async(token)=>{
  try {
    let response=api.post(`/university/verifyotpuniversity/${token}`);
    return response;
  } catch (error) {
    return error;
  }
}
const resendOTPUniversity=async()=>{
  try {
    let response=api.post("/university/resendotpuniversity");
    return response;
    
  } catch (error) {
    return error;
  }
}

const getAllPendingEvents=async()=>{
  try {
    let response=api.get('/university/getAllPendingEvents');
    return response;
  } catch (error) {
    return error;
  }
}

const getDetail=async(id)=>{
  try {
    let response=api.get(`/university/eventDetail/${id}`);
    return response;
  } catch (error) {
   return error 
  }
}

const approveEvent=async(id)=>{
  try {
    let response=api.post(`/university/approveEvent/${id}`);
    return response;
    
  } catch (error) {
    return error
  }
}

const getAllCollab=async()=>{
  try {
    let response=api.get('/university/getAllColloabEvents');
    return response;
  } catch (error) {
    return error;
  }
}

// =======================================Volunteer
const volunteerSignup=async(data,pp,nicb,nicf)=>{
  const {email,password,name,dob,gender,country,city,university}=data
  try {
    const formData=new FormData();
    formData.append("email",email);
    formData.append("password",password);
    formData.append("fullName",name);
    formData.append("dateOfBirth",dob);
    formData.append("gender",gender);
    formData.append("country",country);
    formData.append("city",city);
    formData.append("universityId",university);
    formData.append("photos",pp);
    formData.append("photos",nicf);
    formData.append("photos",nicb);

    
    


    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let response=api.post("/user/register",formData,config);
    return response;
    
  } catch (error) {
    return error
  }
}

const loginVolunteer=async(data)=>{
  try {
    let response=api.post("/user/login",data);
    
    return response
  } catch (error) {
    
    return error
  }
}
const verificationOTPVolunteer=async(token)=>{
  try {
    let response=api.post(`/user/verifyEmail/${token}`);
    return response;
  } catch (error) {
    return error;
  }
}
const resendOTPVolunteer=async()=>{
  try {
    let response=api.post("/user/resendEmail");
    return response;
    
  } catch (error) {
    return error;
  }
}

const eventsForVolunteer=async()=>{
  try {
    let response=api.get('/user/getAllEvents');
    return response
  } catch (error) {
    return error;
  }
}
const detailedEventForVolunteer=async(id)=>{
  try {
    let response=api.get(`/user/getEvent/${id}`);
    return response
  } catch (error) {
    return error;
  }
}

const joinEvent=async(id)=>{
  try {
    console.log(id)
    let response=api.post("/user/joinEvent",{id:id});
    return response;
  } catch (error) {
    return error;
  }
}
const fetchMyPending=async()=>{
  try {
    let response=api.get("/user/getMyPendingEvents");
    return response;
  } catch (error) {
    return error;
  }
}
const fetchMyApproved=async()=>{
  try {
    let response=api.get("/user/getMyAcceptedEvents");
    return response;
  } catch (error) {
    return error;
  }
}

// ===============================================Admin

let signupAdmin=async(data)=>{
  try {
    let response=api.post("/admin/signupAdmin",data);
    return response;
  } catch (error) {
    return error;
  }
}
let loginAdmin=async(data)=>{
  try {
    let response=api.post("/admin/loginAdmin",data);
    return response;
  } catch (error) {
    return error;
  }
}
let getAllUnApprovedVolunteersAccounts=async()=>{
  try {
    let response=api.get("/admin/getAllUnapprovedVolunteerProfiles");
    return response;
  } catch (error) {
    return error;
  }
}
let getAllApprovedVolunteersAccounts=async()=>{
  try {
    let response=api.get("/admin/getAllApprovedVolunteerProfiles");
    return response;
  } catch (error) {
    return error;
  }
}
let userProfile=async(id)=>{
  try {
    let response=api.get(`/admin/getUserProfile/${id}`);
  return response;
  } catch (error) {
    return error;
  }
}
let approveVolunteerAccount=async(id)=>{
  try {
    let response=api.post(`/admin/approveTheUser/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
let disapproveVolunteerAccount=async(id)=>{
  try {
    let response=api.post(`/admin/disapproveTheUser/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
  return (
        <context.Provider value={{
        detailedEventForVolunteer,
        approveEvent,
        eventsForVolunteer,
        volunteerSignup,
        getDetail,
        getAllPendingEvents,
        checkThePending,
        updateEvents,
        eventDetails,
        allevents,
        verificationOTPUniversity,
        getalluniversities,
        resendOTPUniversity,
        verificationOTP,
        setunivToken,
        setisVerifed,
        resendOTP,
        setToken,
        createEvent,
        SignupOrganization,
        loginOrganization,
        setisVerifed,
        organizationtoken,
        isVerified,
        signupUniversity,
        loginUniversity,
        universitytoken,
        volunteertoken,
        setVolunteerToken,
        getAllCollab,
        verificationOTPVolunteer,
        resendOTPVolunteer,
        loginVolunteer,
        joinEvent,
        fetchMyApproved,
        fetchMyPending,
        fetchAllVolunteerForSpecificEvent,
        rejectTheVolunteer,
        acceptTorejectTheVolunteer,
        acceptTheVolunteer,
        rejectToAcceptTheVolunteer,
        logOut,
        admintoken,
        setadminToken,
        signupAdmin,
        getAllUnApprovedVolunteersAccounts,
        getAllApprovedVolunteersAccounts,
        userProfile,
        loginAdmin,
        approveVolunteerAccount,
        disapproveVolunteerAccount
        }}>
      {props.children}
    </context.Provider>
  )
}
export default HarmonyState;