import React, { useContext, useEffect } from 'react'
import context from '../../../Context/HarmonyContext'

const AllStudentPage = () => {
    const {getAllStudents}=useContext(context);
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
    }, [])
  return (
    <div>AllStudentPage</div>
  )
}

export default AllStudentPage