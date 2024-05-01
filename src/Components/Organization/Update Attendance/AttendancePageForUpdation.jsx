import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
import moment from 'moment';
import toast from 'react-hot-toast';
const AttendancePage = () => {
  const {id}=useParams();
  const {getAttendeesByDate,editAttendance}=useContext(context);
    const location=useLocation();
  const [attendeesWithStatus, setAttendeesWithStatus] = useState([]); 
  const [finalizeAttendance,setFinalizeAttendance]=useState([]);
  const[Fetch,setFetchAgain]=useState(true);
  let getDetails=async()=>{
    try {
        let response=await getAttendeesByDate(id,location?.state.date);
        if(response.data.status==="success"){
            setAttendeesWithStatus(
                response.data.body
            )
            setFetchAgain(!Fetch)
        }
        
    } catch (error) {
        console.log(error);
    }
  }
useEffect(() => {
getDetails();
}, [])

 
  const handleSubmit =async (e) => {
     e.preventDefault();
        try {
            let response=await editAttendance(id,location.state?.date,finalizeAttendance);
            if(response.data.status==="success"){
               toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(error?.response.data.message)
        }
    // Code to handle form submission for the current day
 
  };

  useEffect(() => {
    const result = attendeesWithStatus.map(({ user, status }) => ({
      user:user._id,
      status
    }));
    if(result.length!==0)
      setFinalizeAttendance(result);
  }, [Fetch])
  

  const handleStatusChange = (userId, status) => {
    // Update the status for the user
    const updatedAttendees = attendeesWithStatus.map(user =>
      user._id === userId ? { ...user, status } : user
    );
    setAttendeesWithStatus(updatedAttendees);
    const result = attendeesWithStatus.map(({ user, status }) => ({
      user:user._id,
      status
    }));
    setFinalizeAttendance(result);
    setFetchAgain(!Fetch)
  };

  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Attendance Page - {} </h1>

      {/* Select Day Dropdown */}
      <form onSubmit={handleSubmit}>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
          {console.log(attendeesWithStatus)}
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-500">User Name</th>
              <th className="px-4 py-2 border border-gray-500">User ID</th>
              <th className="px-4 py-2 border border-gray-500">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendeesWithStatus.map((record, index) => (
              <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2 border border-gray-500">{record?.user.fullName}</td>
                <td className="px-4 py-2 border border-gray-500">{record?.user?._id}</td>
                <td className="px-4 py-2 border border-gray-500">
                  <label className="inline-block mr-4">
                    <input
                      type="radio"
                      name={`attendance_${record._id}`}
                      checked={record?.status==="p"?true:false}
                      onChange={()=>handleStatusChange(record._id,"p")}

                      value="Present"
                    /> Present
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name={`attendance_${record._id}`}
                      checked={record?.status==="a"?true:false}
                      onChange={()=>handleStatusChange(record._id,"a")}
                      value="Absent"
                    /> Absent
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Buttons */}
      <div className="mt-4 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          type="submit"
        >
          Submit
        </button>
      </div>
      </form>
    </div>
  );
};

export default AttendancePage;
