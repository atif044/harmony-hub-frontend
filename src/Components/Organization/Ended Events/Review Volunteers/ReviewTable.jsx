import React, { useContext, useEffect, useState } from 'react'
import context from './../../../../Context/HarmonyContext';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ReviewTable = () => {
    const {id}=useParams()
    const {getAllVolunteer,reviewTheVolunteer}=useContext(context);
    const [users,setUsers]=useState([]);
    const getAllVolunteersForReview=async()=>{
        try {
            let response=await  getAllVolunteer(id);
            if(response.data.status==="success"){
                setUsers(response.data.body);
            }

            
        } catch (error) {
            console.log(error)
        }
    }

    const giveRating=async(userId,rating)=>{
        try {
            let response=await reviewTheVolunteer(id,userId,rating)
            if(response.data.status==="success"){
                return toast.success(response.data.message)
            }
            
        } catch (error) {
            return toast.error(error?.response.data.message)
        }

    }
    useEffect(() => {
        getAllVolunteersForReview()
    }, [])
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={item.profilePic}
                    alt={`${item.name}'s profile`}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 p-1 rounded-md border-s-2 border-r-2 hover:text-green-900 mr-2" onClick={()=>giveRating(item._id,"p")}>
                    👍
                  </button>
                  <button className="text-red-600 p-1 rounded-md border-r-2 border-s-2 ml-2 hover:text-red-900" onClick={()=>giveRating(item._id,"n")}>
                    👎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReviewTable