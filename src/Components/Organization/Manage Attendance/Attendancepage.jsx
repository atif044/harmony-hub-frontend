import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
import moment from 'moment';
import toast from 'react-hot-toast';
const AttendancePage = () => {
  const {id}=useParams();
  const {getAttendees,markAttendance}=useContext(context);
  const [attendanceRecords, setAttendanceRecords] = useState([
  ]);
  const [attendeesWithStatus, setAttendeesWithStatus] = useState([]); 
  const [finalizedAttendance,setFinalizeAttendance]=useState([]);
  const [Fetch,setFetch]=useState(true);
  const [startDate, setStartDate ]=useState("");
  const [endDate, setEndDate ]=useState("");
  const [dateArray,setDateArray]=useState([]);
  const [fetchDateArray,setFetchDateArrayAgain]=useState(true);
  const [selectedDate,setSelectedDate]=useState('');

  const onChange=(e)=>{
    console.log(e.target.value)
    setSelectedDate(e.target.value)
  }
  let fetchAttendees=async()=>{
    try {
      let response=await getAttendees(id);
      setAttendanceRecords(response.data.body)
      if(response.data.status==="success"){
        const attendeesData = response.data.body;
        const attendeesWithStatus = attendeesData.map(user => ({
          ...user,
          status: "a" // Initialize status as empty string for each user
        }));
        setAttendanceRecords(attendeesData);
        setAttendeesWithStatus(attendeesWithStatus);
        setStartDate(response.data.start)
        setEndDate(response.data.end);
        setFetchDateArrayAgain(!fetchDateArray);
        setFetch(!Fetch)
      }
    } catch (error) {
      console.log(error)
    }
  }

 useEffect(() => {
    fetchAttendees();
 }, []);
 useEffect(() => {
    generateDateArray(startDate,endDate)
 }, [fetchDateArray])

 
  const handleSubmit =async (e) => {
     e.preventDefault()
    // Code to handle form submission for the current day
    try {
      let response=await markAttendance(id,finalizedAttendance,selectedDate);
      if(response.data.status==="success"){
            toast.success(response.data.message)
      }
    } catch (error) {
    
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    const result = attendeesWithStatus.map(({ _id, status }) => ({
      user:_id,
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
    const result = attendeesWithStatus.map(({ _id, status }) => ({
      _id,
      status
    }));
    setFinalizeAttendance(result);
    setFetch(!Fetch)
  };

  const generateDateArray = (stDate,enDate) => {
    const start = moment(stDate);
    const end = moment(enDate);
    const array = [];

    while (start <= end) {
      array.push(start.format('DD/MM/YYYY'));
      start.add(1, 'days');
    }

    setDateArray(array);
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Attendance Page - {selectedDate} </h1>

      {/* Select Day Dropdown */}
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="daySelect" className="mr-2 font-semibold">Select Day:</label>
        <select required onChange={onChange} >
      <option value="" >Select a date</option>
      {dateArray.map((date, index) => (
        <option key={index} value={date}>
          {date}
        </option>
      ))}
    </select>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-500">User Name</th>
              <th className="px-4 py-2 border border-gray-500">User ID</th>
              <th className="px-4 py-2 border border-gray-500">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendeesWithStatus.map((record, index) => (
              <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2 border border-gray-500">{record?.fullName}</td>
                <td className="px-4 py-2 border border-gray-500">{record?._id}</td>
                <td className="px-4 py-2 border border-gray-500">
                  <label className="inline-block mr-4">
                    <input
                      type="radio"
                      name={`attendance_${record._id}`}
                      checked={record.status==="p"?true:false}
                      onChange={()=>handleStatusChange(record._id,"p")}

                      value="Present"
                    /> Present
                  </label>
                  <label className="inline-block">
                    <input
                      type="radio"
                      name={`attendance_${record._id}`}
                      checked={record.status==="a"?true:false}
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
