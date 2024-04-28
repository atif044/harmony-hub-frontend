import Cookies from 'js-cookie';
import { useState,useEffect} from "react";
import context from './HarmonyContext.js';
import api from '../api/api';
import Web3 from 'web3';
// =================Changes start=================
import Web3Modal from 'web3modal';
import {Contract, providers} from "ethers"
// =============Changes End=====================
import {marketAbi,marketAddress} from "../contract/constant.js";
const HarmonyState = (props) => {
  const[organizationtoken,setToken]=useState(Cookies.get('harmony-hub-organization')); 
  const[universitytoken,setunivToken]=useState(Cookies.get('harmony-hub-university')); 
  const[volunteertoken,setVolunteerToken]=useState(Cookies.get('harmony-hub-volunteer'));
  const[admintoken,setadminToken]=useState(Cookies.get('harmony-hub-admin'));

  const [isVerified,setisVerifed]=useState(Cookies.get('isVerified'));
  useEffect(() => {
  }, [organizationtoken])
    
//=========================Changes START

const fetchContract=(signerOrProvider)=>new Contract(marketAddress,marketAbi,signerOrProvider)
const [currentAccount,setCurrentAccount]=useState("");
const checkIfWalletConnected=async ()=>
{
    if(!window.ethereum)return alert("Please install metamask")
    const accounts= await window.ethereum.request({method:'eth_accounts'})

    if(accounts.length)
    {
        setCurrentAccount(accounts[0])
    }
    else{
        console.log('No Account Found')
    }
    console.log({accounts})
}
// useEffect(() => {
// checkIfWalletConnected()
// }, [])

const connectWallet =async ()=>
{
    if(!window.ethereum)return alert("Please install metamask")
    const accounts= await window.ethereum.request({method:'eth_requestAccounts'})
    setCurrentAccount(accounts[0]);
        window.location.reload();
}

const getMyContractDetails=async()=>{
  // const web3Modal=new Web3Modal();
  // const connection = await web3Modal.connect();
  // console.log(connection)
  // const provider=new providers.Web3Provider(connection);
  const newProvider = new providers.Web3Provider(window.ethereum);
  await newProvider.send("eth_requestAccounts", []);
  //  const signer =provider.getSigner();
  const contract=fetchContract(newProvider);
  console.log(contract)
  try {
    const certifications = await contract.getCertificationsByEmail("b");
    console.log(certifications[0].certificationName)
    console.log("done")
  } catch (error) {
    console.log(error)
  }
}

const addCertificationDetails=async()=>{
  const web3Modal=new Web3Modal();
  const connection = await web3Modal.connect();
  const provider=new providers.Web3Provider(window.ethereum);
  const signer =provider.getSigner();
  const contract=fetchContract(signer);
  try {
    const certifications = await contract.addCertification("sjdafdhniudsni.com","b","lsdjfdiojic",39391,"0x2179d1b9e9550e94c4e1c3945b53f917481aa69e");
    console.log(certifications)
  } catch (error) {
    console.log(error)
  }
}


//=========================Changes END



    //==================================== ORGANIZATION
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

const getAttendees=async(id)=>{
  try {
    let response=api.get(`/organization/getEventVolunteers/${id}`);
    return response;
    
  } catch (error) {
   return error; 
  }
}
const markAttendance=async(id,users,eventDate)=>{
  try {
    const response=api.post(`organization/markAttendance/${id}`,{users:users,eventDate:eventDate});
    return response;
    
  } catch (error) {
   return error 
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
let getAllUnapprovedOrganizations=async()=>{
  try {
    let response=api.get("/admin/getAllUnapprovedOrgAccounts");
    return response;
  } catch (error) {
    return error;
  }
}
let getAllApprovedOrganizations=async()=>{
  try {
    let response=api.get("/admin/getAllApprovedOrgAccounts");
    return response;
  } catch (error) {
    return error;
  }
}
let approveOrganizationAccount=async(id)=>{
  try {
    let response=api.post(`/admin/approveTheOrganization/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
let disapproveOrganizationAccount=async(id)=>{
  try {
    let response=api.post(`/admin/disapproveTheOrganization/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
let organizationProfile=async(id)=>{
  try {
    let response=api.get(`/admin/getOrganizationProfile/${id}`);
  return response;
  } catch (error) {
    return error;
  }
}
let getAllUnapprovedUniversities=async()=>{
  try {
    let response=api.get("/admin/getAllUnapprovedUniAccounts");
    return response;
  } catch (error) {
    return error;
  }
}
let getAllApprovedUniversities=async()=>{
  try {
    let response=api.get("/admin/getAllApprovedUniAccounts");
    return response;
  } catch (error) {
    return error;
  }
}

let approveUniversityAccount=async(id)=>{
  try {
    let response=api.post(`/admin/approveTheUniversity/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
let disapproveUniversityAccount=async(id)=>{
  try {
    let response=api.post(`/admin/disapproveTheUniversity/${id}`);
    return response
  } catch (error) {
    return error;
  }
}
let universityProfile=async(id)=>{
  try {
    let response=api.get(`/admin/getUniversityProfile/${id}`);
  return response;
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
        disapproveVolunteerAccount,
        getAllUnapprovedOrganizations,
        getAllApprovedOrganizations,
        approveOrganizationAccount,
        disapproveOrganizationAccount,
        getAllUnapprovedUniversities,
          getAllApprovedUniversities,
          approveUniversityAccount,
          disapproveUniversityAccount,
          universityProfile,
          organizationProfile,
          getAttendees,
          getMyContractDetails,
          connectWallet,
          currentAccount,
          addCertificationDetails,
          markAttendance
        }}>
      {props.children}
    </context.Provider>
  )
}
export default HarmonyState;