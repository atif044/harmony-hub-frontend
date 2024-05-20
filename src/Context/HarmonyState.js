import Cookies from 'js-cookie';
import { useState,useEffect} from "react";
import context from './HarmonyContext.js';
import api from '../api/api';
// =================Changes start=================
import Web3Modal from 'web3modal';
import {Contract, Wallet, providers,utils} from "ethers"
// =============Changes End=====================
import {marketAbi,marketAddress, pvk} from "../contract/constant.js";
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
// const [currentAccount,setCurrentAccount]=useState("");
const checkIfWalletConnected=async (set)=>
{
    if(!window.ethereum)return alert("Please install metamask")
    const accounts= await window.ethereum.request({method:'eth_accounts'})

    if(accounts.length)
    {
        set(accounts[0])
    }
    else{
        console.log('No Account Found')
    }
}
// useEffect(() => {
// checkIfWalletConnected()
// }, [])

const connectWallet =async (set)=>
{
    if(!window.ethereum)return alert("Please install metamask")
    const accounts= await window.ethereum.request({method:'eth_requestAccounts'})
    set(accounts[0]);
        window.location.reload();
}

const getMyContractDetails = async (email) => {
  try {
    // Initialize provider
    const provider = new providers.JsonRpcProvider("https://sepolia.infura.io/v3/58dc0e5e86294f12911d6e509c9985a6");

    // Fetch contract details
    const contract = fetchContract(provider);
    // Call contract function to get certifications
    const certifications = await contract.getCertificationsByEmail(email);
    return certifications;
  } catch (error) {
    return error;
  }
};
const checkCertificteExistOrNot = async (email,eid) => {
  try {
    // Initialize provider
    const provider = new providers.JsonRpcProvider("https://sepolia.infura.io/v3/58dc0e5e86294f12911d6e509c9985a6");
    // Fetch contract details
    const contract = fetchContract(provider);
    // Call contract function to get certifications
    const certifications = await contract.getCertificationsByEventAndEmail(eid,email);
    return certifications
  } catch (error) {
    return error
  }
};


const addCertificationDetails=async(acc,email,name,link,eventId,walletAdd)=>{
  const web3Modal=new Web3Modal();
  const connection = await web3Modal.connect();
  const provider=new providers.Web3Provider(connection);
  const signer =provider.getSigner();
  if (!utils.isAddress(acc)) {
    console.error("Invalid Ethereum account address");
    return;
  }
  const contract=fetchContract(signer);
  try {
    const certifications = await contract.addCertification("email","name","hhmjm",1,walletAdd);
    await certifications.wait()
    return certifications
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
const createEvent=async(image,body,eventLocationEmbededLink,eventLocationLink,eventLocationName,long,lat)=>{
  const {eventName,eventDescription,volunteersRequired,country,city,eventDurationInDays,eventStartDate,eventEndDate,eventStartTime,eventEndTime,universityId}=body;

  const formData=new FormData();
     formData.append("image", image);
     formData.append("EventName",eventName);
     formData.append("EventDescription",eventDescription);
     formData.append("VolunteersRequired",volunteersRequired);
     formData.append("eventLocationLink",eventLocationLink);
     formData.append("eventLocationName",eventLocationName);
     formData.append("eventLocationEmbededLink",eventLocationEmbededLink);
     formData.append("eventDurationInDays",eventDurationInDays);
     formData.append("eventStartDate",eventStartDate);
     formData.append("eventEndDate",eventEndDate);
     formData.append("eventStartTime",eventStartTime);
     formData.append("eventEndTime",eventEndTime);
     formData.append("universityId",universityId);
     formData.append("country",country)
     formData.append("city",city)
     formData.append("longitude",long);
     formData.append("latitude",lat);
     
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
const alleventsstarted=async()=>{
  try {
    let response=api.get('/organization/alleventsStarted');
    return response;
  } catch (error) {
    return error
    
  }
}
const alleventsended=async()=>{
  try {
    let response=api.get('/organization/alleventsEnded');
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
const updateEvents=async(image,data,id,eventLocationName,eventLocationLink,eventLocationEmbededLink,lat,long)=>{
  const {eventName,eventDescription,volunteersRequired,eventDurationInDays,eventStartDate,eventEndDate,eventStartTime,eventEndTime,universityId}=data;
  const formData=new FormData();
     formData.append("image", image);
     formData.append("EventName",eventName);
     formData.append("EventDescription",eventDescription);
     formData.append("VolunteersRequired",volunteersRequired);
     formData.append("eventLocationLink",eventLocationLink);
     formData.append("eventLocationName",eventLocationName);
     formData.append("eventLocationEmbededLink",eventLocationEmbededLink);
     formData.append("eventDurationInDays",eventDurationInDays);
     formData.append("eventStartDate",eventStartDate);
     formData.append("eventEndDate",eventEndDate);
     formData.append("eventStartTime",eventStartTime);
     formData.append("eventEndTime",eventEndTime);
     formData.append("universityId",universityId);
     formData.append("longitude",long);
     formData.append("latitude",lat);
     console.log(formData)
     
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
const getAttendance=async(id)=>{
  try {
    const response=api.get(`organization/getAttendance/${id}`);
    return response;
    
  } catch (error) {
   return error 
  }
}

const getAttendeesByDate=async(id,date)=>{
  try {
    let response=api.post(`/organization/getAttendeesByDate/${id}`,{date:date})
    return response
  } catch (error) {
    return error;
  }
}
const editAttendance=async(id,date,users)=>{
  try {
    console.log(users)
    let response=api.post(`/organization/editAttendanceByDate/${id}`,{date:date,users:users})
    return response;
  } catch (error) {
    return error;
  }
}
const checkTheStatusOfEvent=async(id)=>{
  try {
    let response=api.get(`/organization/checkTheStatusOfEvent/${id}`);
    return response;
    
  } catch (error) {
    return error;
  }
}
const changeEventStatus=async(id)=>{
  try {
    let response=api.get(`/organization/changeTheStatusOfEvent/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}
const endEvent=async(id)=>{
  try {
    const response=api.post(`/organization/endEvent/${id}`)
    return response
    
  } catch (error) {
    return error;
  }
}
const getAllVolunteer=async(id)=>{
  try {
    let response=api.get(`/organization/getAllVolunteer/${id}`)
    return response;
  } catch (error) {
    return error;
  }
}
const reviewTheVolunteer=async(eventId,userId,rating)=>{
  try {
    let response=api.post(`/organization/reviewVolunteer/${eventId}`,{
      userId:userId,
      rating:rating
    })
    return response;
    
  } catch (error) {
    return error;
  }
}
const getMyOrgProfile=async()=>{
  try {
    let response=api.get(`/organization/getMyProfile`)
    return response;
    
  } catch (error) {
    return error
  }
}
const getMyOrgPublicProfile=async(id)=>{
  try {
    let response=api.get(`/organization/getMyPublicProfile/${id}`)
    return response;
    
  } catch (error) {
    return error
  }
}
const addBioOrg=async(about)=>{
  try {
    let response=api.post('/organization/addBio',{about:about})
    return response
  } catch (error) {
    return error;
  }
    
}
const addProfilePic=async(img)=>{
  const form= new FormData();
  form.append("image",img);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    let response=api.post('/organization/addPP',form,config);
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
const getAllStudents=async()=>{
  try {
    let response=api.get('/university/getAllStudents');
    return response;
    
  } catch (error) {
    return error
  }
}
let userProfileForUniversity=async(id)=>{
  try {
    let response=api.get(`/university/getUserProfile/${id}`);
  return response;
  } catch (error) {
    return error;
  }
}
let approveTheStudent=async(id)=>{
  try {
    let response=api.post(`/university/approveTheStudent/${id}`);
      return response;
    
  } catch (error) {
    return error;
  }
}
let rejectTheStudent=async(id)=>{
  try {
    let response=api.post(`/university/rejectTheStudent/${id}`);
      return response;
    
  } catch (error) {
    return error;
  }
}
let approveToRejectTheStudent=async(id)=>{
  try {
    let response=api.post(`/university/approveToRejectTheStudent/${id}`);
      return response;
    
  } catch (error) {
    return error;
  }
}
let rejectToApproveTheStudent=async(id)=>{
  try {
    let response=api.post(`/university/rejectToApproveTheStudent/${id}`);
      return response;
    
  } catch (error) {
    return error;
  }
}

const getMyUniProfile=async()=>{
  try {
    let response=api.get(`/university/getMyProfile`)
    return response;
    
  } catch (error) {
    return error
  }
}
const getMyUniPublicProfile=async(id)=>{
  try {
    let response=api.get(`/university/getMyPublicProfile/${id}`)
    return response;
    
  } catch (error) {
    return error
  }
}
const addBioUni=async(about)=>{
  try {
    let response=api.post('/university/addBio',{about:about})
    return response
  } catch (error) {
    return error;
  }
    
}
const addProfilePicUni=async(img)=>{
  const form= new FormData();
  form.append("image",img);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    let response=api.post('/university/uploadPP',form,config);
    return response;
  } catch (error) {
    return error
  }
}
const getAllStudentsProfiles=async()=>{
  try {
    let response=api.get('/university/allStudents');
    return response;
    
  } catch (error) {
    return error
  }
}
// =======================================Volunteer
const volunteerSignup=async(data,pp,nicb,nicf,stback)=>{
  const {email,password,name,dob,gender,country,city,university,enrollmentNo}=data
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
    formData.append("photos",stback);
    formData.append("enrollmentNo",enrollmentNo)
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
const myAttendance=async(id)=>{
  try {
    let response=api.get(`/user/getMyAttendance/${id}`);
    return response;
    
  } catch (error) {
    return error;
  }
}
const requestCertificate=async(id)=>{
 try {
  let response=api.post(`/user/requestCertificate/${id}`)
  return response;
 } catch (error) {
  return error;
 }
}
const checkIfAlreadyRequested=async(id)=>{
  try {
    let response=api.get(`/user/checkIfRequested/${id}`)
    return response;
    
  } catch (error) {
    return error;
  }
}

const myProfile=async()=>{
  try {
    let response=api.get('/user/myProfile')
    return response;
  } catch (error) {
    return error;
  }
}
const addAboutMe=async(data)=>{
  try {
    let response=api.post('/user/addBio',{about:data})
    return response
    
  } catch (error) {
    return error
  }
}

const userPublicProfile=async(id)=>{
  try {
    let response=api.get(`/user/userProfile/${id}`);
    return response;
    
  } catch (error) {
    
  }
}
const checkIfEventReviewed=async(id)=>{
  try {
    let response=api.get(`/usert/checkIfAlreadyReviewed/${id}`);
    return response;
    
  } catch (error) {
    return error;
  }
}
const reviewTheEvent=async(eventId,rating)=>{
  try {
    let response=api.post(`/user/reviewEvent/${eventId}`,{
      rating:rating
    })
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
let getAllRequests=async()=>{
  try {
    let response=api.get(`/admin/getAllRequests`);
  return response;
  } catch (error) {
    return error;
  }
}
let changeRequestType=async(id,eventId)=>{
  try {
    let response=api.post(`/admin/changeRequestToCompleted/${id}/${eventId}`);
    return response;
    
  } catch (error) {
    return error
  }
}
let eventsByLocation=async(location)=>{
  try {
    let response=api.post('/user/eventsByLocation',{location:location})
    return response;
  } catch (error) {
    return error
  }
}

//  ======================FORGOT PASSWORD
const sendResetLink=async({email,type})=>{
  try {
    let response=api.post('/user/send-reset-request',{email:email,type:type});
    return response;
    
  } catch (error) {
    return error;
  }
}
const checkValidityOfToken=async(token)=>{
  try {
    let response=api.get(`/user/verifyToken/${token}`);
    return response;
    
  } catch (error) {
    return error;
  }
}
const updatePassword=async(pwd,token)=>{
  try {
    let response=api.post('/user/updatePassword',{password:pwd,token:token})
    return response;
  } catch (error) {
    return error
  }
}

const countForVolunteersAndOrg=async()=>{
  try {
    let response=api.get('/user/getVolunteerCountAndOrganizationCountAndEventCount');
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
          addCertificationDetails,
          markAttendance,
          getAttendance,
          getAttendeesByDate,
          editAttendance,
          myAttendance,
          requestCertificate,
          checkIfAlreadyRequested,
          checkIfWalletConnected,
          getAllRequests,
          checkCertificteExistOrNot,
          changeRequestType,
          myProfile,
          addAboutMe,
          getAllStudents,
          approveTheStudent,
          rejectTheStudent,
          userProfileForUniversity,
          approveToRejectTheStudent,
          rejectToApproveTheStudent,
          alleventsstarted,
          alleventsended,
          checkTheStatusOfEvent,
          userPublicProfile,
          eventsByLocation,
          changeEventStatus,
          endEvent,
          getAllVolunteer,
          reviewTheVolunteer,
          checkIfEventReviewed,
          reviewTheEvent,
          getMyOrgProfile,
          getMyOrgPublicProfile,
          addBioOrg,
          addProfilePic,
          getMyUniProfile,
          getMyUniPublicProfile,
          addBioUni,
          addProfilePicUni,
          getAllStudentsProfiles,
          sendResetLink,
          checkValidityOfToken,
          updatePassword,
          countForVolunteersAndOrg
        }}>
      {props.children}
    </context.Provider>
  )
}
export default HarmonyState;