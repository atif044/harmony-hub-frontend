import React, { useState, useEffect,useContext } from 'react';
import context from '../../../Context/HarmonyContext';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
const NGOPublicProfilePage = () => {
    const {id}=useParams();
        const {getMyOrgPublicProfile}=useContext(context)
        const [myData,setMyData]=useState({});

    const fetchMyProfile=async()=>{
        try {
            let response=await getMyOrgPublicProfile(id);
            if(response.data.status==="success"){
                setMyData(response.data.body)
            }
            
        } catch (error) {
            return toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
    fetchMyProfile()
    }, [])
    const [profileData, setProfileData] = useState({
        fullName: "AL khidmat Fondation",

        location: "Lahore, Pakistan",
        weblink: "www.abc.com",
        email: "william.henry.harrison@example-pet-store.com",
        phone: "0333-3333333",
        bio: "Software Developer with 10+ years of experience in a variety of industries. Proven ability to design, develop, and deliver high-quality software solutions. Expertise in a wide range of technologies, including Mern stack , react native , Flutter , AWS ,.NET much more. Strong problem-solving and analytical areass. Excellent communication and teamwork areass..",
        partnershipsAndCollaborations: [
            {
                photo: "https://via.placeholder.com/200",
                organization: "Organization 1",
                link: "https://example.com/organization1",
                linkText: "Learn More"
            },
            {
                photo: "https://via.placeholder.com/200",
                organization: "Organization 2",
                link: "https://example.com/organization2",
                linkText: "Learn More"
            },
            {
                photo: "https://via.placeholder.com/200",
                organization: "Organization 1",
                link: "https://example.com/organization1",
                linkText: "Learn More"
            },
            {
                photo: "https://via.placeholder.com/200",
                organization: "Organization 2",
                link: "https://example.com/organization2",
                linkText: "Learn More"
            },
            {
                photo: "https://via.placeholder.com/200",
                organization: "Organization 3",
                link: "https://example.com/organization3",
                linkText: "Learn More"
            },

            // Add more partnerships and collaborations as needed
        ],
        // Remaining data properties remain unchanged


        stats: {
            CSPRsCompleted: 108,
            eventsOrganized: 27,
            Participants: 10,
            Awards: 5,
        },
        areasOfFocus: [
            "Teaching", "Event Planning", "Fundraising", "Public Speaking", "Social Media",
            "Arab", "Jhahsh", "Jhshjhjsdhashahd", "Jdshsdhsdhsdsdhlssdh"
        ],

        teamMembers: [
            {
                name: "Team Member 1",
                role: "Role 1",
                photo: "https://via.placeholder.com/200",
                link: "https://example.com/member1"
            },
            {
                name: "Team Member 2",
                role: "Role 2",
                photo: "https://via.placeholder.com/200",
                link: "https://example.com/member2"
            },
            {
                name: "Team Member 3",
                role: "Role 3",
                photo: "https://via.placeholder.com/200",
                link: "https://example.com/member3"
            },
            {
                name: "Team Member 4",
                role: "Role 4",
                photo: "https://via.placeholder.com/200",
                link: "https://example.com/member4"
            },
            // Add more team members as needed
        ],



        achievements: ["Volunteer of the Year 2020"],
        organizationActivities: [
            {
                name: "Community Cleanup Day",
                date: "January 15, 2023",
                description: "Helped clean up local parks and streets.",
                link: "https://example.com/community-cleanup-day"
            },
            {
                name: "Another Activity",
                date: "February 20, 2023",
                description: "Description of another activity.",
                link: "https://example.com/another-activity"
            },
            {
                name: "Community Cleanup Day",
                date: "January 15, 2023",
                description: "Helped clean up local parks and streets.",
                link: "https://example.com/community-cleanup-day"
            },
            {
                name: "Another Activity",
                date: "February 20, 2023",
                description: "Description of another activity.",
                link: "https://example.com/another-activity"
            },
            // Add more activities with their respective links
        ],

        hoursLogged: 500,
        awardsss: [
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
                personName: "shokat khanam 1"
            },
            {
                rating: 5,
                comment: "Ali done it as need and was very good in doing it so.",
                photo: "https://via.placeholder.com/150",
                personName: "shokat khanam 1"
            },
            {
                rating: 2,
                comment: "Ali done it as need and was very good in doing it so.",
                photo: "https://via.placeholder.com/150",
                personName: "shokat khanam 1"
            },
            {
                rating: 1,
                comment: "Ali done it as need and was very good in doing it so.",
                photo: "https://via.placeholder.com/150",
                personName: "shokat khanam 1"
            },
            {
                rating: 4,
                comment: "Ali done it as need and was very good in doing it so.",
                photo: "https://via.placeholder.com/150",
                personName: "shokat khanam 1"
            },
        ],
        socialMediaLinks: {
            linkedIn: "https://www.linkedin.com/in/johndoe",
            twitter: "https://twitter.com/johndoe",
        },
    });
    const cspHoursCount=(array)=>{
        let csp=0
        array.length>0 && array.map((val)=>csp+=Number(val.eventDurationInDays))
        return csp
    }

    const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);

    // Function for toggling Team Members section
    const toggleTeamMembers = () => setShowAllTeamMembers(!showAllTeamMembers);

    // State variables for toggling sections
    const [showAllPartnerships, setShowAllPartnerships] = useState(false);

    // Function for toggling Partnerships and Collaborations section
    const togglePartnerships = () => setShowAllPartnerships(!showAllPartnerships);

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

    return (

        <div className="container mx-auto py-8">
            <div className="flex justify-between">
                <div className="w-full md:w-3/4">
                    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{myData?.organizationName}</h1>
                                <p className="text-gray-600">{profileData.location}</p>
                                <p className="text-gray-600">{myData?.organizationPhoneNo}</p>
                                <p className="text-gray-600">{myData?.organizationEmail}</p>
                                <p className="text-gray-600">{myData?.organizationWebsiteLink}</p>
                            </div>
                            <img
                                src={myData?.profilePic} // Placeholder for profile picture
                                alt="Profile Picture"
                                className="rounded-full h-24 w-24 cursor-pointer"
                                onClick={() => openFullscreenImage(myData?.profilePic)}
                            />
                        </div>
                        {/* Stats Section */}
                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Stats</h2>
                            <div className="flex flex-wrap justify-between">
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.pastOrganizationEvents?.length}</p>
                                        <p>Ended Events</p>
                                    </div>
                                </div>
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{cspHoursCount(myData?.pastOrganizationEvents||[])}</p>
                                        <p>CSPRs</p>
                                    </div>
                                </div>

                            
                                
                                <div className={`w-full sm:w-1/2 md:w-1/4 mb-4 px-2`}>
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.currentOrganizationEvents?.length}</p>
                                        <p>Upcoming Events</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* About section */}
                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
                            <p>
                                {
                                    myData?.organizationDescription ? myData?.organizationDescription:"No Description Added"
                                }
                            </p>
                        </div>
                    
                        {/* Organization Activities section */}
                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Organization Activities</h2>
                            {myData?.pastOrganizationEvents?.slice(0, showAllOrganizationActivities ? myData?.pastOrganizationEvents?.length : 2).map((activity, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-700">
                                        <span className="font-bold">Name:</span> <p  className="text-blue-600 hover:underline">{activity.EventName}</p><br />
                                        <span className="font-bold">Date:</span>
                                        {new Date(activity.eventStartDate).toDateString()}{" - "} { new Date(activity.eventEndDate).toDateString()}<br />
                                        <span className="font-bold">Description:</span> {activity.EventDescription}
                                    </p>
                                </div>
                            ))}
                            {profileData.organizationActivities.length > 2 &&
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


export default NGOPublicProfilePage;
