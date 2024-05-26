import React, { useContext, useEffect,useState } from 'react'
import context from '../../../Context/HarmonyContext';
import { useParams } from 'react-router-dom';

const StudentProfilePageForApproval = () => {
    const {userProfileForUniversity}=useContext(context);
    const {id}=useParams();
    const [user,setUser]=useState();
    const fetchUserProfile=async()=>{
        try {
            let response=await userProfileForUniversity(id);
        if(response.data.status==="success"){
            setUser(response.data.body)
        }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUserProfile()

    }, []);
    const months=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-gray-200 text-center py-4">
        <img src={user?.profilePic} alt="Profile Picture" className="w-32 h-32  object-contain mx-auto"/>
        <h2 className="text-xl font-bold mt-2">{user?.fullName}</h2>
        <p className="text-gray-600">{user?.email}</p>
    </div>
    <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="font-semibold">Date of Birth:</p>
                <p>{new Date(user?.dateOfBirth).getDate() + "-"+ months[new Date(user?.dateOfBirth).getMonth()]+ "-" + new Date(user?.dateOfBirth).getFullYear()}</p>
            </div>
            <div>
                <p className="font-semibold">Country:</p>
                <p>{user?.country}</p>
            </div>
            <div>
                <p className="font-semibold">City:</p>
                <p>{user?.city}</p>
            </div>
           
        </div>
        <div colSpan="2">
                <p className="font-semibold">CNIC Front Pic:</p>
                <img src={user?.cnicFront} alt="CNIC Front Pic" className="w-full h-40 object-contain rounded-lg"/>
            </div>
            <div colSpan="2">
                <p className="font-semibold">CNIC Back Pic:</p>
                <img src={user?.cnicBack} alt="CNIC Back Pic" className="w-full h-40 object-contain rounded-lg"/>
            </div>
                        {console.log(user)}
          { 
            user?.studentCardPic && <>
             <div colSpan="2">
                <p className="font-semibold">Student Card Pic:</p>
                <img src={user?.studentCardPic} alt="CNIC Back Pic" className="w-full h-40 object-contain rounded-lg"/>
            </div>
            <div colSpan="2">
                <p className="font-semibold">ENROLLMENT:</p>
                <h1>{user?.enrollmentNo}</h1>
            </div>
            </>
            }
    </div>
</div>
  )
}
export default StudentProfilePageForApproval