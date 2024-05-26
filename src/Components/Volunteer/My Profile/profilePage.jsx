
import React, { useState, useEffect, useContext,useRef } from 'react';
import context from '../../../Context/HarmonyContext';
import { FaPencilAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    location: "City, State",
    bio: "Software Developer with 10+ years of experience in a variety of industries. Proven ability to design, develop, and deliver high-quality software solutions. Expertise in a wide range of technologies, including Mern stack , react native , Flutter , AWS ,.NET much more. Strong problem-solving and analytical skills. Excellent communication and teamwork skills..",
    education: [
      {
        university: "Another University",
        major: "Volunteer Management",
        academicYear: "2018-2022",
      },
      {
        university: "Another University",
        major: "Volunteer Management",
        academicYear: "2018-2022",
      },
      {
        university: "Another University",
        major: "Volunteer Management",
        academicYear: "2018-2022",
      },
      {
        university: "Another University",
        major: "Volunteer Management",
        academicYear: "2018-2022",
      },
    ],
    stats: {
      CSPRsCompleted: 108,
      eventsAttended: 27,
      badgesObtained: 10,
      certificationsObtained: 5,
    },
    skillsAndInterests: [
      "Teaching", "Event Planning", "Fundraising", "Public Speaking", "Social Media",
      "Arab", "Jhahsh", "Jhshjhjsdhashahd", "Jdshsdhsdhsdsdhlssdh"
    ],
    experience: [
      {
        organization: "HR Manager",
        role: "Ali  studio",
        duration: "Jan 2013 - Present",
        location: "ISLAMABAD"
      },
      {
        organization: "HR Manager",
        role: "Ali  studio",
        duration: "Jan 2013 - Present",
        location: "ISLAMABAD"
      },
      {
        organization: "HR Manager",
        role: "Ali  studio",
        duration: "Jan 2013 - Present",
        location: "ISLAMABAD"
      },
      {
        organization: "HR Manager",
        role: "Ali  studio",
        duration: "Jan 2013 - Present",
        location: "ISLAMABAD"
      },
    ],
    achievements: ["Volunteer of the Year 2020"],
    volunteerActivities: [
      {
        name: "Community Cleanup Day",
        date: "January 15, 2023",
        description: "Helped clean up local parks and streets.",
      },
      {
        name: "Community Cleanup Day",
        date: "January 15, 2023",
        description: "Helped clean up local parks and streets.",
      },
      {
        name: "Community Cleanup Day",
        date: "January 15, 2023",
        description: "Helped clean up local parks and streets.",
      },
      {
        name: "Community Cleanup Day",
        date: "January 15, 2023",
        description: "Helped clean up local parks and streets.",
      },
    ],
    hoursLogged: 500,
    certifications: [
      {
        title: "First Aid Certification",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "First Aid Certification",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "First Aid Certification",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "First Aid Certification",
        image: "https://via.placeholder.com/500x300",
      },
    ],
    badges: [
      {
        title: "Community Engagement Badge",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "Community Engagement Badge",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "Community Engagement Badge",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "Community Engagement Badge",
        image: "https://via.placeholder.com/500x300",
      },
      {
        title: "Community Engagement Badge",
        image: "https://via.placeholder.com/500x300",
      },
    ],
    feedbackAndReviews: [
      {
        rating: 5,
        comment: "Ali done it as need and was very good in doing it so.",
        photo: "https://via.placeholder.com/150",
        organizerName: "shokat khanam 1"
      },
      {
        rating: 5,
        comment: "Ali done it as need and was very good in doing it so.",
        photo: "https://via.placeholder.com/150",
        organizerName: "shokat khanam 1"
      },
      {
        rating: 2,
        comment: "Ali done it as need and was very good in doing it so.",
        photo: "https://via.placeholder.com/150",
        organizerName: "shokat khanam 1"
      },
      {
        rating: 1,
        comment: "Ali done it as need and was very good in doing it so.",
        photo: "https://via.placeholder.com/150",
        organizerName: "shokat khanam 1"
      },
      {
        rating: 4,
        comment: "Ali done it as need and was very good in doing it so.",
        photo: "https://via.placeholder.com/150",
        organizerName: "shokat khanam 1"
      },
    ],
    socialMediaLinks: {
      linkedIn: "https://www.linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  });

  // State variables for toggling sections
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImagecert, setFullscreenImagecert] = useState(null);

  const [showAllVolunteerActivities, setShowAllVolunteerActivities] = useState(false);

  const toggleVolunteerActivities = () => setShowAllVolunteerActivities(!showAllVolunteerActivities);

  // Functions for handling fullscreen image
  const openFullscreenImage = (image) => setFullscreenImage(image);
  const closeFullscreenImage = () => setFullscreenImage(null);
  const openFullscreenImagecert = (image) => setFullscreenImagecert(image);
  const closeFullscreenImagecert = () => setFullscreenImagecert(null);

  // State variables for window width and number of columns
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const {myProfile,getMyContractDetails,addAboutMe,getRating,addThePhoto}=useContext(context);
  const [details,setDetails]=useState('');
  const [certifications,setCertifications]=useState([])
  const [university,setuniversity]=useState('')
  let fetchMyProifleDetails=async()=>{
    try {
      let response=await myProfile();
      console.log(response)
      if(response.data.status==="success"){
          let cert=await getMyContractDetails(response.data.body.email);
          console.log(cert)
          setCertifications(cert);
          setDetails(response.data.body)
          setuniversity(response.data.university)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const [fetch,setfetch]=useState(false)
  const [rating,setRating]=useState(5);
  const Rating=async()=>{
      try {
        
        let response=await getRating();
        console.log(response)
        if(response.data.status==="success"){
          setRating(response.data.rating)
        }
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
      fetchMyProifleDetails();
      Rating()
  }, [fetch])  
  const [bio,setbio]=useState('');
  const [enableEditBio,setEnableEditBio]=useState(false);
  const addDetails=async()=>{
    try {
      let response=await addAboutMe(bio);
      setEnableEditBio(false)
      if(response.data.status==="success"){
        setbio('')
        setfetch(!fetch)
        return toast.success(response.data.message)
      }
    } catch (error) {
      return toast.error(error?.response?.data.message)
    }
  }
  const ref=useRef(null)
  const [image,setImage]=useState(null);
  const handleFileChange = (e) => {
      setImage(e.target.files[0]);
    };
  const submitPhoto=async()=>{
      try {
          let response=await addThePhoto(image);
          if(response.data.status==="success"){
              setfetch(!fetch)
              setImage(null);
              toast.success("Image Successfully uploaded")
          }
          
      } catch (error) {
          return toast.error(error.response.data.message)
      }
  }
  return (
    
    <div className="container mx-auto py-8">
    {console.log(details,university)}
      <div className="flex justify-between">
        <div className="w-full md:w-3/4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{details?.fullName}</h1>
                <p className="text-gray-600">{details?.city}, {details?.country}</p>
              </div>

                       <div className='flex flex-col justify-center items-center'>

                            <img
                                src={details?.profilePic} // Placeholder for profile picture
                                alt="Profile Picture"
                                className="rounded-full h-24 w-24 cursor-pointer"
                                onClick={() => openFullscreenImage(details?.profilePic)}
                            />
                            <input ref={ref} type='file' className='hidden' onChange={handleFileChange} accept='image/*' />
{           
             image===null?  <FaPencilAlt className='-mt-1' type='file' onClick={()=>ref.current.click()}/>:
             <div>
                    <button className='bg-green-500 text-white p-1 rounded-md' onClick={submitPhoto}>Change Dp</button>
                    <button onClick={()=>setImage(null)}>Cancel</button>
             </div>
}                        </div>
            </div>
            {/* Stats Section */}
<div className="border-t border-gray-300 py-4">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Stats</h2>
  <div className="flex flex-wrap justify-between">
    <div className={`w-full sm:w-1/2 md:w-1/4 mb-4`}>
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
        <p className="font-bold text-lg">{details?.cspHours}</p>
        <p>CSPRs</p>
      </div>
    </div>
    <div className={`w-full sm:w-1/2 md:w-1/4 mb-4`}>
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
        <p className="font-bold text-lg">{details?.eventAppliedFor?.length}</p>
        <p>Events</p>
      </div>
    </div>
    
    <div className={`w-full sm:w-1/2 md:w-1/4 mb-4`}>
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
        <p className="font-bold text-lg">{certifications?.length}</p>
        <p>Certifications</p>
      </div>
    </div>
    <div className={`w-full sm:w-1/2 md:w-1/4 mb-4`}>
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
        <p className="font-bold text-lg">{rating}</p>
        <p>Rating</p>
      </div>
    </div>
  
  </div>
</div>

            {/* About section */}
            <div className="border-t border-gray-300 py-4 flex justify-between">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">About</h2>
              <FaPencilAlt onClick={()=>{
                setEnableEditBio(true)
                setbio(details?.about)
              }}/>
              </div>
              {
                enableEditBio==false?
                <h2 className='mb-4 whitespace-pre-line'>{details?.about}</h2>:
                <div className='mb-4'>
                  <textarea className='h-32 w-full outline-4 border-2'  value={bio} onChange={(e)=>setbio(e.target.value)} 
                     />
                  <button className='bg-green-500 p-1 rounded-md mr-3' onClick={addDetails}>Add Bio</button>
                  <button className='text-red-600' onClick={()=>{
                    setEnableEditBio(false)
                    setbio('')
                  }}>Cancel</button>
                </div>
                }
              
            {/* Education section */}
            <div className="border-t border-gray-300 py-4">
{            university!==null &&  <h2 className="text-xl font-semibold mb-4 text-gray-800">Education</h2>
}                {
                  university!==null &&
                  <h1>
                    {university?.universityName}
                  </h1>
                }
            </div>
            {/* Volunteer Activities section */}
            <div className="border-t border-gray-300 py-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Volunteer Activities</h2>
              {details?.eventAppliedFor?.slice(0, showAllVolunteerActivities ? details?.eventAppliedFor.length : 2).map((activity, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700">
                    <span className="font-bold">Name:</span> {activity.EventName}, <span className="font-bold">Date:</span> {new Date(activity.eventEndDate).toDateString()}<br />
                  </p>
                </div>
              ))}
              {details?.eventAppliedFor?.length > 2 &&
                <button
                  className="mt-2 text-blue-600"
                  onClick={toggleVolunteerActivities}
                >
                  {showAllVolunteerActivities ? 'Hide' : 'See All'}
                </button>
              }
            </div>
            {/* Certifications section */}
            <div className="border-t border-gray-300 py-4 ">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Certifications</h2>
              <div className="flex overflow-y-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {certifications?.map((certification, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 mr-4"
                    onClick={() => openFullscreenImagecert(certification[2])}
                  >
                    <img
                      src={certification[2]}
                      alt={certification[0]}
                      className="w-full -mb-28 h-60 object-cover rounded-lg cursor-pointer"
                    />
                    <p className="text-gray-700 mt-2">{certification[0]}</p>
                  </div>
                ))}
              </div>
  
            </div>
         
    
              </div>
        </div>
       
      
      </div>
      {/* Fullscreen image display */}
      {fullscreenImage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={fullscreenImage}
              alt="Fullscreen"
              className="h-96 max-w-full"
              onClick={closeFullscreenImage}
            />
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={closeFullscreenImage}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {fullscreenImagecert && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
    <div className="relative h-96 overflow-hidden">
      <img
        src={fullscreenImagecert}
        alt="Fullscreen"
        className="object-contain w-full"
        onClick={closeFullscreenImagecert}
      />
      <button
        className="absolute top-4 right-4 text-white text-xl"
        onClick={closeFullscreenImagecert}
      >
        &times;
      </button>
    </div>
  </div>
)}

    </div>
  );
};


export default ProfilePage;
