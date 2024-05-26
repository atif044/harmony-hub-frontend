import React, { useState, useEffect, useContext, useRef } from 'react';
import context from '../../../Context/HarmonyContext';
import { toast } from 'react-hot-toast';
import { FaPencilAlt } from 'react-icons/fa';

const NGOProfilePage = () => {
    const { getMyOrgProfile, addBioOrg, addProfilePic } = useContext(context);
    const [myData, setMyData] = useState({});
    const [enableBio, setEnableBio] = useState(false);
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [showAllAbout, setShowAllAbout] = useState(false);
    const [showAllOrganizationActivities, setShowAllOrganizationActivities] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleFileChange = (e) => setImage(e.target.files[0]);

    const fetchMyProfile = async () => {
        try {
            let response = await getMyOrgProfile();
            if (response.data.status === "success") {
                setMyData(response.data.body);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const cspHoursCount = (array) => {
        let csp = 0;
        array.length > 0 && array.map((val) => csp += Number(val.eventDurationInDays));
        return csp;
    };

    const handleBioSubmit = async (bio) => {
        try {
            let response = await addBioOrg(bio);
            if (response.data.status === "success") {
                setFetchAgain(!fetchAgain);
                setEnableBio(false);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const submitPhoto = async () => {
        try {
            let response = await addProfilePic(image);
            if (response.data.status === "success") {
                setFetchAgain(!fetchAgain);
                setImage(null);
                toast.success("Image Successfully uploaded");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const toggleAbout = () => setShowAllAbout(!showAllAbout);
    const toggleOrganizationActivities = () => setShowAllOrganizationActivities(!showAllOrganizationActivities);
    const openFullscreenImage = (image) => setFullscreenImage(image);
    const closeFullscreenImage = () => setFullscreenImage(null);

    const handleWindowResize = () => setWindowWidth(window.innerWidth);

    useEffect(() => {
        fetchMyProfile();
    }, [fetchAgain]);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const ref = useRef(null);

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-3/4">
                    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{myData?.organizationName}</h1>
                                <p className="text-gray-600">{myData?.organizationPhoneNo}</p>
                                <p className="text-gray-600">{myData?.organizationEmail}</p>
                                <p className="text-gray-600">{myData?.organizationWebsiteLink}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
                                <img
                                    src={myData?.profilePic}
                                    alt="Profile Picture"
                                    className="rounded-full h-24 w-24 cursor-pointer"
                                    onClick={() => openFullscreenImage(myData?.profilePic)}
                                />
                                <input ref={ref} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                {
                                    image === null
                                        ? <FaPencilAlt className="mt-2" onClick={() => ref.current.click()} />
                                        : <div className="flex space-x-2 mt-2">
                                            <button className="bg-green-500 text-white p-1 rounded-md" onClick={submitPhoto}>Change Dp</button>
                                            <button className="bg-red-500 text-white p-1 rounded-md" onClick={() => setImage(null)}>Cancel</button>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Stats</h2>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full sm:w-1/2 md:w-1/4 mb-4 px-2">
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.pastOrganizationEvents?.length}</p>
                                        <p>Ended Events</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/4 mb-4 px-2">
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{cspHoursCount(myData?.pastOrganizationEvents || [])}</p>
                                        <p>CSPRs</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/4 mb-4 px-2">
                                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md p-2">
                                        <p className="font-bold text-lg">{myData?.currentOrganizationEvents?.length}</p>
                                        <p>Upcoming Events</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 py-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
                                <FaPencilAlt cursor="pointer" onClick={() => setEnableBio(true)} />
                            </div>
                            {
                                enableBio === true ? (
                                    <div>
                                        <textarea
                                            className="w-full outline-none border-2 resize-none p-2 rounded-md"
                                            onChange={(e) => setBio(e.target.value)}
                                            value={bio}
                                            minLength={10}
                                            rows={7}
                                        />
                                        <div className="flex space-x-4 mt-2">
                                            <button className="p-1 rounded-md text-white bg-green-500" onClick={() => handleBioSubmit(bio)}>Add</button>
                                            <button className="text-red-600" onClick={() => setEnableBio(false)}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-700">
                                        {
                                            myData?.organizationDescription
                                                ? (
                                                    myData?.organizationDescription.length > 50
                                                        ? (
                                                            <>
                                                                {showAllAbout
                                                                    ? myData?.organizationDescription
                                                                    : `${myData?.organizationDescription.substring(0, 50)}...`}
                                                                <button className="text-blue-600 ml-2" onClick={toggleAbout}>
                                                                    {showAllAbout ? 'Show Less' : 'Show More'}
                                                                </button>
                                                            </>
                                                        )
                                                        : myData?.organizationDescription
                                                )
                                                : "No Description Added"
                                        }
                                    </p>
                                )
                            }
                        </div>

                        <div className="border-t border-gray-300 py-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Organization Activities</h2>
                            {myData?.pastOrganizationEvents?.slice(0, showAllOrganizationActivities ? myData?.pastOrganizationEvents?.length : 2).map((activity, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-700">
                                        <span className="font-bold">Name:</span> <span className="text-blue-600 hover:underline">{activity.EventName}</span><br />
                                        <span className="font-bold">Date:</span>
                                        {new Date(activity.eventStartDate).toDateString()}{" - "} {new Date(activity.eventEndDate).toDateString()}<br />
                                    </p>
                                </div>
                            ))}
                            {myData?.pastOrganizationEvents?.length > 2 && (
                                <button className="mt-2 text-blue-600" onClick={toggleOrganizationActivities}>
                                    {showAllOrganizationActivities ? 'Hide' : 'See All'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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

export default NGOProfilePage;
