import React, { useContext } from "react";
import { Link } from "react-router-dom";
import context from "../../Context/HarmonyContext";
import toast from "react-hot-toast";
import logo from '../../assets/bulc.png'
const Navbar = () => {
  const [navbar,setNavbar]=React.useState(false);
  const {organizationtoken,universitytoken,volunteertoken,admintoken,logOut}=useContext(context);
  const navbarOptionsOrganization=[
    {name:"Create Event",path:"createEvent"},
    {name:"Manage Events",path:"manageevents"},
    {name:"Mark Attendance",path:"markAttendance"},
    {name:"Ended Events",path:"endedEvents"},
    {name:"Profile",path:"myNgoProfile"},
  ]
  const navbarUniversity=[
    {name:"Accept Collaboration",path:"acceptCollab"},
    {name:"Approve Students",path:"approvestudents"},
    {name:"Collaborated Events",path:"collabEvents"},
    {name:"Students",path:"allProfiles"},
    {name:"Profile",path:"universityPP"},
  ]

  const navbarVounteer=[
    {name:"All Events",path:"events"},
    {name:"My Profile",path:"myprofile"},
    {name:"My Applied",path:"myappliedevents"},
    {name:"Univesity Event",path:"uniEvents"},
  ];

  const navbarAdmin=[
    {name:"Certificates",path:"issueCertificates"},
    {name:"UnApproved Volunteers",path:"unapprovedVolunteers"},
    {name:"UnApproved Org.",path:"unapprovedOrganization"},
    {name:"UnApproved Uni.",path:"unapprovedUniversity"},
  ]
  const navbarOptions=organizationtoken?navbarOptionsOrganization:universitytoken?navbarUniversity:volunteertoken?navbarVounteer:admintoken?navbarAdmin:[
    {name:"Login - User",path:"volunteerlogin"},
    {name:"Login - Organization",path:"loginorganization"},
    {name:"Login - University",path:"loginuniversity"},
    {name:"Login - Admin",path:"adminlogin"},
  ];
  return <>
          <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to={'/'}>
                        <img src={logo} className="h-14"/>
                    
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                           { navbarOptions.map((item)=>{
                            return <li onClick={()=>setNavbar(!navbar)} className="text-gray-600 hover:text-blue-600">
                                <Link to={`/${item.path}`}>{item.name}</Link>
                            </li>
                           })}                    
                           {
                            (organizationtoken||volunteertoken||universitytoken||admintoken )&&
                            <li className="text-gray-600 hover:text-blue-600" onClick={()=>{
                                logOut()
                                toast.success("Logged Out Successfully")
                                }}>Log Out</li>}
                            {/* <li className="text-gray-600 hover:text-blue-600">
                                <Link to='/loginorganization'>Login - Organization</Link>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <Link to='/'>Login - University</Link>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <Link to='/'>Login - Admin</Link>
                            </li> */}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

  </>;
};

export default Navbar;
