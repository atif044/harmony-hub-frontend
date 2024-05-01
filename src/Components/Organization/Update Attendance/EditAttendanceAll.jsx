import React, { useContext, useEffect, useState } from 'react'
import context from '../../../Context/HarmonyContext'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAttendanceAll = () => {
    const {id}=useParams()
    const {getAttendance}=useContext(context);
    const [attendance,setAttendance]=useState([]);
    const navigate=useNavigate()
    const fetchAllAttendance=async()=>{
        try {
            let response=await getAttendance(id);
            if(response.data.status==="success"){
                setAttendance(response.data.body);
            }
            
        } catch (error) {
            toast.error(error?.response.data.message)
        }
    }
    useEffect(() => {
        fetchAllAttendance()
    }, [])  
  return (
    <div className='mt-8 ml-10 mr-10'>
    <h1 className='font-semibold text-2xl'>Edit Attendance</h1>
    {
        attendance.length===0 &&
        <h1>
            Not Marked Any Yet
        </h1>    
        }
        {
            attendance.length>0 &&
           
            <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added At
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {
                attendance.map((record) => {
                    return (
                        <tr key={record.eventDate}>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 text-wrap">{new Date(record.eventDate).toLocaleDateString()}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 text-wrap">{new Date(record.addedAt).toUTCString()}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 text-wrap">{new Date(record.lastUpdatedAt).toUTCString()}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <span class="text-blue-600 cursor-pointer" onClick={()=>navigate(`/editAttendance/edit/${record.event}`,{state:{date:record.eventDate}})}>Details</span>
                            </td>
                        </tr>
                    );
                })
            }
        </tbody>
    </table>
</div>

        }

        
    </div>
  )
}

export default EditAttendanceAll