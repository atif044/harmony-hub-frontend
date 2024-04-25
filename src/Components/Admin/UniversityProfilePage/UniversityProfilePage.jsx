import React, { useContext, useEffect, useState } from 'react'
import context from '../../../Context/HarmonyContext'
import { useParams } from 'react-router-dom';
import { FaGlobe } from "react-icons/fa";

const UniversityProfilePage = () => {
    const {id}=useParams();
    const {universityProfile}=useContext(context);
    const [university,setUniversity]=useState();
    const fetchData=async()=>{
        try {
            let response=await universityProfile(id);
            if(response.data.status==="success"){
                setUniversity(response.data.body);
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
    fetchData()
    }, [])
  return (
    <div class="container mx-auto py-8">
    <div class="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div class="bg-purple-500 text-white px-4 py-3">
            <h2 class="text-lg font-semibold">{university?.universityName}</h2>
        </div>
        <div class="px-4 py-3 border-b border-gray-200">
            <ul class="flex items-center">
                <li><i class="icon fas fa-envelope"></i></li>
                <li>{university?.universityEmail}</li>
            </ul>
        </div>
        <div class="px-4 py-3 border-b border-gray-200">
            <ul class="flex items-center">
                <li><i class="icon fas fa-university"></i></li>
                <li>Campus:{university?.campus}</li>
            </ul>
        </div>
        <div class="px-4 py-3 border-b border-gray-200">
            <ul class="flex items-center">
                <li><i class="icon fas fa-map-marker-alt"></i></li>
                <li>City: {university?.city}</li>
            </ul>
        </div>
        <div class="px-4 py-3">
            <ul class="flex items-center">
                <FaGlobe/>
                <li> {university?.country}</li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default UniversityProfilePage