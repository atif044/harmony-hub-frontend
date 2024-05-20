import React, { useContext, useState, useEffect } from 'react';
import context from '../../../Context/HarmonyContext';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
const AllProfileTable = () => {
  const [students, setStudents] = useState([]);
  const { getAllStudentsProfiles } = useContext(context);
  const [searchTerm, setSearchTerm] = useState('');
    const navigate=useNavigate()
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.enrollmentNo.includes(searchTerm)
  );

  const getAll = async () => {
    try {
      let response = await getAllStudentsProfiles();
      if (response.data.status === "success") {
        setStudents(response.data.body.studentsList);
      }
    } catch (error) {
      console.error("Error fetching student profiles:", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Enrollment No"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Full Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">CSP Hours</th>
              <th className="py-2 px-4 border-b border-gray-200">Enrollment No</th>
              <th className="py-2 px-4 border-b border-gray-200">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{student._id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{student.fullName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{student.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{student.cspHours}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{student.enrollmentNo}</td>
                  <td className="py-2 px-4 border-b border-gray-200"><CgProfile cursor={"pointer"} onClick={()=>navigate(`/userPublicProfile/${student._id}`)}/></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 border-b border-gray-200 text-center">
                  No such student exists
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProfileTable;
