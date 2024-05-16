import React,{useContext, useEffect, useState} from 'react'
import context from '../../../Context/HarmonyContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllUnApprovedUsers = () => {
    const [fetchAgain,setFetchAgain]=useState(true);
    const {getAllStudents,approveTheStudent,rejectTheStudent,approveToRejectTheStudent,rejectToApproveTheStudent}=useContext(context);
const fetchDetails=async()=>{
    try {
        let response=await getAllStudents();
        if(response.data.status==="success"){
            console.log(response)
        }
        
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    fetchDetails()
}, [fetchAgain])
    const [pending,setPending]=useState([]);
    const [approved,setApproved]=useState([]);
    const [rejected,setRejected]=useState([]);
  
    const fetchDetailsOfUnApproved=async()=>{
        try {
            let response=await getAllStudents();
            if(response.data.status==="success"){
                setPending(response.data.pending);
                setApproved(response.data.accepted);
                setRejected(response.data.rejected);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const approveIt=async(id)=>{
        try {
            let response=await approveTheStudent(id);
            if(response.data.status==="success"){
                return toast.success(response.data.message)
            }
        } catch (error) {
            return toast.error(error?.response.data.message)
        }
        finally{
            setFetchAgain(!fetchAgain)
        }
    }
    const disapproveIt=async(id)=>{
        try {
            let response=await rejectTheStudent(id);
            if(response.data.status==="success"){
                return toast.success(response.data.message)
            }
        } catch (error) {
            return toast.error(error?.response.data.message)
        }
        finally{
            setFetchAgain(!fetchAgain)
        }
    }
    const approveToReject=async(id)=>{
        try {
            let response=await approveToRejectTheStudent(id);
            if(response.data.status==="success"){
                return toast.success(response.data.message)
            }
        } catch (error) {
            return toast.error(error?.response.data.message)
        }
        finally{
            setFetchAgain(!fetchAgain)
        }
    }
    const rejectToApprove=async(id)=>{
        try {
            let response=await rejectToApproveTheStudent(id);
            if(response.data.status==="success"){
                setFetchAgain(!fetchAgain)
                return toast.success(response.data.message)
            }
        } catch (error) {
            return toast.error(error?.response.data.message)
        }
        
    }
    useEffect(() => {
        fetchDetailsOfUnApproved()
    
    }, [fetchAgain])

  
    // Function to change volunteer status
    const [showApproved, setShowApproved] = useState(true);
    const [showUnapproved, setShowUnapproved] = useState(true);
    const [showDeclined, setShowDeclined] = useState(true);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Student Approval</h1>
        {/* Stats Section */}
        <div className="mb-8 border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Total Requests: {pending.length + approved.length + rejected.length}</p>
              <p>Approved Volunteers: {approved.length}</p>
            </div>
            <div>
              <p>Unapproved Volunteers: {pending.length}</p>
              <p>Declined Volunteers: {rejected.length}</p>
            </div>
          </div>
        </div>
  {/* Unapproved Volunteers Section */}
  <div className="mb-8 border rounded-lg overflow-hidden">
          <h2 className="bg-yellow-500 text-white text-xl font-semibold py-2 px-4 cursor-pointer" onClick={() => setShowUnapproved(!showUnapproved)}>Unapproved Students</h2>
          {showUnapproved && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Volunteer Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Profile</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map(volunteer => (
                    <tr key={volunteer._id} className="bg-white">
                      <td className="border px-4 py-2">{volunteer.fullName}</td>
                      <td className="border px-4 py-2">{volunteer.email}</td>
                     
                      <td className="border px-4 py-2">
                        <Link to={`/profileOfStudent/${volunteer._id}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.416 21.416a2 2 0 01-2.827 0l-7.89-7.89a2 2 0 010-2.828l.707-.707a2 2 0 012.829 0l7.889 7.89a2 2 0 010 2.827l-.707.707z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="border px-4 py-2 flex items-center">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded" onClick={() =>approveIt(volunteer._id)}>Approve</button>
                        <button className="bg-red-500 ml-4 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded" onClick={() =>disapproveIt(volunteer._id)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Approved Volunteers Section */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <h2 className="bg-blue-500 text-white text-xl font-semibold py-2 px-4 cursor-pointer" onClick={() => setShowApproved(!showApproved)}>Approved Students</h2>
          {showApproved && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Volunteer Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Profile</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.map(volunteer => (
                    <tr key={volunteer.id} className="bg-gray-100">
                      <td className="border px-4 py-2">{volunteer.fullName}</td>
                      <td className="border px-4 py-2">{volunteer.email}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/profileOfStudent/${volunteer._id}`} >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.416 21.416a2 2 0 01-2.827 0l-7.89-7.89a2 2 0 010-2.828l.707-.707a2 2 0 012.829 0l7.889 7.89a2 2 0 010 2.827l-.707.707z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="border px-4 py-2 flex items-center">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded" onClick={() => approveToReject(volunteer._id)}>Decline</button>
                      </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Rejected  Section */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <h2 className="bg-red-500 text-white text-xl font-semibold py-2 px-4 cursor-pointer" onClick={() => setShowDeclined(!showDeclined)}>Rejected Students</h2>
          {showDeclined && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Volunteer Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Profile</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rejected.map(volunteer => (
                    <tr key={volunteer.id} className="bg-gray-100">
                      <td className="border px-4 py-2">{volunteer.fullName}</td>
                      <td className="border px-4 py-2">{volunteer.email}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/profileOfStudent/${volunteer._id}`} >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.416 21.416a2 2 0 01-2.827 0l-7.89-7.89a2 2 0 010-2.828l.707-.707a2 2 0 012.829 0l7.889 7.89a2 2 0 010 2.827l-.707.707z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="border px-4 py-2 flex items-center">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded" onClick={() => rejectToApprove(volunteer._id)}>Approve</button>
                      </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
}

export default AllUnApprovedUsers
