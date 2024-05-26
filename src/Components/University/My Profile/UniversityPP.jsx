import React, { useState, useEffect,useContext,useRef } from 'react';
import context from '../../../Context/HarmonyContext';
import { toast } from 'react-hot-toast';
import { FaPencilAlt } from 'react-icons/fa';
const UniversityPP = () => {
        const {getMyUniProfile,addBioUni,addProfilePicUni}=useContext(context)
        const [myData,setMyData]=useState({});
        const [enableBio,setEnableBio]=useState(false);
        const [bio,setbio]=useState("")
        const [image,setImage]=useState(null);
        const handleFileChange = (e) => {
            setImage(e.target.files[0]);
          };
    const fetchMyProfile=async()=>{
        try {
            let response=await getMyUniProfile();
            if(response.data.status==="success"){
                setMyData(response.data.body)
            }
            
        } catch (error) {
            return toast.error(error.response.data.message)
        }
    }
    const [fetchAgain,setFetchAgain]=useState(false)
    useEffect(() => {
    fetchMyProfile()
    }, [fetchAgain])
    const cspHoursCount=(array)=>{
        let csp=0
        array.length>0 && array.map((val)=>csp+=Number(val.eventDurationInDays))
        return csp
    }

    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [showAllAbout, setShowAllAbout] = useState(false);

    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllOrganizationActivities, setShowAllVolunteerActivities] = useState(false);

    // Functions for toggling sections
    const toggleAbout = () => setShowAllAbout(!showAllAbout);

    const toggleSkills = () => setShowAllSkills(!showAllSkills);
    const toggleOrganizationActivities = () => setShowAllVolunteerActivities(!showAllOrganizationActivities);

    // Functions for handling fullscreen image
    const openFullscreenImage = (image) => setFullscreenImage(image);
    const closeFullscreenImage = () => setFullscreenImage(null);

    // State variables for window width and number of columns
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
        const handleBioSubmit=async(bio)=>{
            try {
                let response=await addBioUni(bio)
                if(response.data.status==="success"){
                    setFetchAgain(!fetchAgain);
                    setEnableBio(false);
                    toast.success(response.data.message)
                }
            } catch (error) {
                return toast.error(error.response.data.message)
            }
        }
        const ref=useRef(null)
        const submitPhoto=async()=>{
            try {
                let response=await addProfilePicUni(image);
                if(response.data.status==="success"){
                    setFetchAgain(!fetchAgain)
                    setImage(null);
                    toast.success("Image Successfully uploaded")
                }
                
            } catch (error) {
                return toast.error(error.response.data.message)
            }
        }
    return (

        <div className="container mx-auto py-8">
            <div className="flex justify-between">
                <div className="w-full md:w-3/4">
            
                    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{myData?.universityName}</h1>
                                <p className="text-gray-600">{myData?.city}, {myData?.country}</p>
                                <p className="text-gray-600">{myData?.universityEmail}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>

                            <img
                                src={myData?.profilePic} // Placeholder for profile picture
                                alt="Profile Picture"
                                className="rounded-full h-24 w-24 cursor-pointer"
                                onClick={() => openFullscreenImage(myData?.profilePic)}
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
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.pastCollaboratedEvents?.length}</p>
                                        <p>Ended Events</p>
                                    </div>
                                </div>
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{cspHoursCount(myData?.currentCollaboratedEvents||[])}</p>
                                        <p>CSPRs</p>
                                    </div>
                                </div>

                            
                                
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.currentCollaboratedEvents?.length}</p>
                                        <p>Upcoming Events</p>
                                    </div>
                                </div>
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.studentsList?.length}</p>
                                        <p>Total Students</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* About section */}
                        <div className="border-t border-gray-300 py-4">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
                            <FaPencilAlt cursor={"pointer"} onClick={()=>setEnableBio(true)}/>
                        </div>

                            {
                                enableBio===true? <>
                                <div>
                                    <textarea className='w-full outline-4 border-2 resize-none' onChange={(e)=>setbio(e.target.value)} value={bio} minLength={10}  rows={7}/>
                                </div>
                                    <button className='p-1 rounded-md text-white bg-green-500' onClick={()=>handleBioSubmit(bio)}>Add</button>
                                    <button className='text-red-600 ml-5' onClick={()=>setEnableBio(false)}>Cancel</button>
                                </>:
                                <p>
                                {
                                    myData?.universityDescription ? myData?.universityDescription:"No Description Added"
                                }
                            </p>}
                        </div>
                    
                        {/* Organization Activities section */}
                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">University Activities</h2>
                            {myData?.pastCollaboratedEvents?.slice(0, showAllOrganizationActivities ? myData?.pastCollaboratedEvents?.length : 2).map((activity, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-700">
                                        <span className="font-bold">Name:</span> <p  className="text-blue-600 hover:underline">{activity.EventName}</p><br />
                                        <span className="font-bold">Date:</span>
                                        {new Date(activity.eventStartDate).toDateString()}{" - "} { new Date(activity.eventEndDate).toDateString()}<br />
                                    </p>
                                </div>
                            ))}
                            {myData?.pastCollaboratedEvents?.length > 2 &&
                                <button
                                    className="mt-2 text-blue-600"
                                    onClick={toggleOrganizationActivities}
                                >
                                    {showAllOrganizationActivities ? 'Hide' : 'See All'}
                                </button>
                            }
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
                            className="max-h-full max-w-full"
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
        </div>
    );
};


export default UniversityPP;
