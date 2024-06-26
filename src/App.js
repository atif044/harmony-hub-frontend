import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoginOrganization from './Components/Auth_Organization/Login/LoginOrganization.jsx';
import SignupOrganization from './Components/Auth_Organization/Signup/SignupOrganization.jsx';
import { Toaster } from 'react-hot-toast';
import HarmonyState from './Context/HarmonyState.js';
import VerifyOtp from './Components/Auth_Organization/OTP/VerifyOtp.jsx';
import OrganizationLoginSignupProtectedRoute from './Private/OrganizationLoginSignupProtectedRoute.js';
import OrganizationProtected from './Private/OrganizationProtected.js';
import CreateEvent from './Components/Organization/Create Event/CreateEvent.jsx';
import SignupUniversity from './Components/University/Auth/Signup/SignupUniversity.jsx';
import UniversityProtected from './Private/UniversityProtected.js';
import VerifyOTPUniversity from './Components/University/Auth/OTP/VerifyOTPUniversity.jsx';
import LoginUniversity from './Components/University/Auth/Login/LoginUniversity.jsx';
import EventList from './Components/Organization/Manage Event/AllEventsOrganization.jsx';
import EventDetailed from './Components/Organization/Manage Event/EventDetailed.jsx';
import UpdateEvent from './Components/Organization/Update Event/UpdateEvent.jsx';
import Collaboration from './Components/University/Collaboration/Collaboration.jsx';
import EventDetailed1 from './Components/University/Collaboration/EventDetailed.jsx';
import CollaboratedEvents from './Components/University/CollaboratedEvents/CollaboratedEvents.jsx';
import Register from './Components/Volunteer/Signup/Signup.jsx';
import VerifyOtpVolunteer from './Components/Volunteer/Otp/VerifyOtpVolunteer.jsx';
import VolunteerProtected from './Private/VolunteerProtected.js';
import LoginVolunteer from './Components/Volunteer/Login/LoginVolunteer.jsx';
import EventListingPage from './Components/Volunteer/All Events/Finaleventshowcasepage.jsx';
import EventPage from './Components/Volunteer/All Events/finalEventpage.jsx';
import AllAppliedEvents from './Components/Volunteer/My Applied Events/AllAppliedEvents.jsx';
import EventManagementPage from './Components/Organization/Manage Event/eventmanagmentNGOside.jsx';
import OrganizationVerifyOtpProtected from './Private/OrganizationVerifyOtpProtected.js';
import UniversityVerifyOtpProtected from './Private/UniversityVerifyOtpProtected';
import VolunteerVerifyOtpProtected from './Private/VolunteerVerifyOtpProtected.js';
import Signup from './Components/Admin/Signup/Signup.jsx';
import Login from './Components/Admin/Login/Login';
import AllUnApprovedUsers from './Components/Admin/AllUnApprovedUsers/AllUnApprovedUsers.jsx';
import VolunteerProfilePageForApproval from './Components/Admin/VolunteerProfilePage/VolunteerProfilePageForApproval.jsx';
import AllUnApprovedOrg from './Components/Admin/AllUnApprovedOrg/AllUnApprovedOrg.jsx';
import AllUnApprovedUni from './Components/Admin/AllUnApprovedUni/AllUnApprovedUni.jsx';
import OrganizationProfilePage from './Components/Admin/OrganizationProfilePage/OrganizationProfilePage.jsx';
import UniversityProfilePage from './Components/Admin/UniversityProfilePage/UniversityProfilePage.jsx';
import GiveCertificate from './Components/Admin/GiveCertificate/GiveCertificate.jsx';
import MyDetailedEventPage from './Components/Volunteer/My Applied Events/MyAppliedDetailed.jsx';
import AllStartedEvents from './Components/Organization/Manage Attendance/AllStartedEvents.jsx';
import AttendancePage from './Components/Organization/Manage Attendance/Attendancepage.jsx';
import EditAttendanceAll from './Components/Organization/Update Attendance/EditAttendanceAll.jsx';
import AttendancePageForUpdation from './Components/Organization/Update Attendance/AttendancePageForUpdation.jsx';
import MyComponent from './Components/Organization/Create Event/AutoCompleteLocation.jsx';
import CertificateOfParticipation from './Components/Admin/IssueCertificates/Cetrtificate.jsx';
import ProfilePage from './Components/Volunteer/My Profile/profilePage.jsx';
import AllStudentPage from './Components/University/Students/AllStudentPage.jsx';
import StudentProfilePageForApproval from './Components/University/Students/StudentProfilePageForApproval.jsx';
import PublicProfile from './Components/Volunteer/Public Profile/PublicProfile.jsx';
import AllEndedEvents from './Components/Organization/Ended Events/AllEndedEvents.jsx';
import ReviewTable from './Components/Organization/Ended Events/Review Volunteers/ReviewTable.jsx';
import NGOProfilePage from './Components/Organization/My Profile/ngopage.jsx'
import NGOPublicProfilePage from './Components/Organization/My Profile/PublicProfileNgo.jsx';
import UniversityPP from './Components/University/My Profile/UniversityPP.jsx';
import UniversityPublicProfilePage from './Components/University/My Profile/UniversityPublicPP';
import AllProfileTable from './Components/University/All Student Profile/AllProfileTable.jsx';
import ForgotPassword from './Components/Forgot Password/ForgotPassword.jsx';
import ResetPasswordForm from './Components/Forgot Password/ResetPasswordForm.jsx';
import HomePage from './Components/Home/homeshowcasepage.jsx';
import NotFound from './Components/404/Error404.jsx';
import UniversityEvents from './Components/Volunteer/University Events/UniversityAllEvents.jsx';
import Footer from './Components/Home/Footer.jsx';
function App() {
  return (
    <>
    <Router>
    <HarmonyState> 
    <div>
    <Navbar/>
    <Toaster />
    <div className='ml-10 mr-10'>

   
    <Routes>
    {/* ====================================ORGANIZATION */}
    <Route exact path="/loginorganization" element={<OrganizationLoginSignupProtectedRoute/>}>
      <Route exact path='/loginorganization' element={<LoginOrganization/>}/>
    </Route>
    <Route exact path="/signuporganization" element={<OrganizationLoginSignupProtectedRoute/>}>
      <Route exact path="/signuporganization" element={<SignupOrganization/>}/>
    </Route>
    <Route exact path='/verifyOtp' element={<OrganizationVerifyOtpProtected/>}>
      <Route exact path="/verifyOtp" element={<VerifyOtp/>}/>
    </Route>
    <Route exact path="/createEvent" element={<OrganizationProtected/>}>
    <Route exact path="/createEvent" element={<CreateEvent/>}/>
    </Route>
    <Route exact path="/manageevents" element={<OrganizationProtected/>}>
    <Route exact path="/manageevents" element={<EventList/>}/>
    </Route>
    <Route exact path="/detailedevent/:id" element={<OrganizationProtected/>}>
    <Route exact path="/detailedevent/:id" element={<EventDetailed/>}/>
    </Route>
    <Route exact path="/updateEvent" element={<OrganizationProtected/>}>
    <Route exact path="/updateEvent" element={<UpdateEvent/>}/>
    </Route>
    <Route exact path="/approveVolunteers/:id" element={<OrganizationProtected/>}>
    <Route exact path="/approveVolunteers/:id" element={<EventManagementPage/>}/>
    </Route>
    <Route exact path="/markAttendance" element={<OrganizationProtected/>}>
    <Route exact path="/markAttendance" element={<AllStartedEvents/>}/>
    </Route>
    <Route exact path="/markAttendance/:id" element={<OrganizationProtected/>}>
    <Route exact path="/markAttendance/:id" element={<AttendancePage/>}/>
    </Route>
    <Route exact path="/editAttendance/:id" element={<OrganizationProtected/>}>
    <Route exact path="/editAttendance/:id" element={<EditAttendanceAll/>}/>
    </Route>
    <Route exact path="/editAttendance/edit/:id" element={<OrganizationProtected/>}>
    <Route exact path="/editAttendance/edit/:id" element={<AttendancePageForUpdation/>}/>
    </Route>
    <Route exact path='/endedEvents' element={<OrganizationProtected/>} >
    <Route exact path='/endedEvents' element={<AllEndedEvents/>} />
    </Route>
    <Route exact path='/reviewVolunteer/:id' element={<OrganizationProtected/>} >
    <Route exact path='/reviewVolunteer/:id' element={<ReviewTable/>} />
    </Route>
    <Route exact path='/myNgoProfile' element={<OrganizationProtected/>}>
    <Route exact path='/myNgoProfile' element={<NGOProfilePage/>}/>
    </Route>
    <Route exact path='/NgoPublic/:id' element={<NGOPublicProfilePage/>}/>
    {/* ================================UNIVERSITYYYYYYYYY */}
    <Route exact path="/signupuniversity" element={<OrganizationLoginSignupProtectedRoute/>}>
    <Route exact path="/signupuniversity" element={<SignupUniversity/>}/>
    </Route>
    <Route exact path="/loginuniversity" element={<OrganizationLoginSignupProtectedRoute/>}>
    <Route exact path="/loginuniversity" element={<LoginUniversity/>}/>
    </Route>
    <Route exact path='/verifyotpuniv' element={<UniversityVerifyOtpProtected/>}>
      <Route exact path="/verifyotpuniv" element={<VerifyOTPUniversity/>}/>
    </Route>
    <Route exact path='/acceptCollab' element={<UniversityProtected/>}>
    <Route exact path='/acceptCollab' element={<Collaboration/>}/>
    </Route>
    <Route exact path='/detailedeventuniv/:id' element={<UniversityProtected/>}>
    <Route exact path='/detailedeventuniv/:id' element={<EventDetailed1/>}/>
    </Route>
    <Route exact path='/collabEvents' element={<UniversityProtected/>}>
    <Route exact path='/collabEvents' element={<CollaboratedEvents/>}/>
    </Route>
    <Route exact path='/approvestudents' element={<UniversityProtected/>}>
    <Route exact path='/approvestudents' element={<AllStudentPage/>}/>
    </Route>
    <Route exact path="/profileOfStudent/:id" element={<UniversityProtected/>}>
    <Route exact path="/profileOfStudent/:id" element={<StudentProfilePageForApproval/>}/>
      </Route>
    <Route exact path="/universityPP" element={<UniversityProtected/>}>
    <Route exact path="/universityPP" element={<UniversityPP/>}/>
        </Route>
    <Route exact path="/allProfiles" element={<UniversityProtected/>}>
    <Route exact path="/allProfiles" element={<AllProfileTable/>}/>
      </Route>
    <Route exact path="/universityPublicProfile/:id" element={<UniversityPublicProfilePage/>}/>
    {/* =======================================VOLUNTEER */}
    <Route exact path='/volunteersignup' element={<OrganizationLoginSignupProtectedRoute/>} >
    <Route exact path='/volunteersignup' element={<Register/>} />
    </Route>

    <Route exact path='/volunteerlogin' element={<OrganizationLoginSignupProtectedRoute/>}>
    <Route exact path='/volunteerlogin' element={<LoginVolunteer/>}/>
    </Route>
    <Route exact path="/verifyOtpVolunteer" element={<VolunteerVerifyOtpProtected/>}>
    <Route exact path="/verifyOtpVolunteer" element={<VerifyOtpVolunteer/>}/>
    </Route> 
    <Route exact path="/events" element={<VolunteerProtected/>}>
    <Route exact path="/events" element={<EventListingPage/>}/>
    </Route>
    <Route exact path='/event/:id' element={<VolunteerProtected/>}>
    <Route exact path='/event/:id' element={<EventPage/>}/>
    </Route>
    <Route exact path="/myappliedevents" element={<VolunteerProtected/>}>
    <Route exact path="/myappliedevents" element={<AllAppliedEvents/>}/>
    </Route>
    <Route exact path="/myAppliedDetailed/:id" element={<VolunteerProtected/>}>
    <Route exact path="/myAppliedDetailed/:id" element={<MyDetailedEventPage/>}/>
    </Route>

    <Route exact path='/myprofile' element={<VolunteerProtected/>}>
    <Route exact path='/myprofile' element={<ProfilePage/>}/>
    </Route>
    <Route exact path='/uniEvents' element={<VolunteerProtected/>}>
    <Route exact path='/uniEvents' element={<UniversityEvents/>}/>
    </Route>
    {/* ===========================================Admin */}
    <Route exact path="/adminlogin" element={<Login/>}/>
    <Route exact path="/adminsignup" element={<Signup/>}/>
    <Route exact path="/unApprovedVolunteers" element={<AllUnApprovedUsers/>}/>
    <Route exact path="/unApprovedOrganization" element={<AllUnApprovedOrg/>}/>
    <Route exact path="/unApprovedUniversity" element={<AllUnApprovedUni/>}/>
    <Route exact path="/profileOfVolunteer/:id" element={<VolunteerProfilePageForApproval/>}/>
    <Route exact path="/profileOfOrganization/:id" element={<OrganizationProfilePage/>}/>
    <Route exact path="/profileOfTheUniversity/:id" element={<UniversityProfilePage/>}/>
    <Route exact path='/giveCertificate' element={<GiveCertificate/>}/>
    <Route exact path="/issueCertificates" element={<CertificateOfParticipation/>}/>
    <Route exact path='/userPublicProfile/:id' element={<PublicProfile/>} />
    {/*  ===================================FORGOT PASSWORD */}
    <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route exact path='/forgotPassword/:token' element={<ResetPasswordForm/>}/>
     {/* =================================HOME PAGE */}
     <Route exact path='/' element={<HomePage/>}/>
     {/* No Routes Found */}
     <Route exact path='/*' element={<NotFound/>}/>
    </Routes>
    </div>
    </div>      
    </HarmonyState>
    </Router>
    
    </>
  );
}

export default App;
