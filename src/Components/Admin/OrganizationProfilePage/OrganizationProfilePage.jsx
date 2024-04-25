import React, { useContext, useEffect, useState } from 'react'
import context from '../../../Context/HarmonyContext'
import { useParams } from 'react-router-dom';

const OrganizationProfilePage = () => {
    const {id}=useParams();
    const {organizationProfile}=useContext(context);
    const[organization,setOrganization]=useState();
    const fetchData=async()=>{
        try {
            let response=await organizationProfile(id);
            if(response.data.status==="success"){
                setOrganization(response.data.body)
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
       
        <div class="bg-blue-500 text-white px-4 py-3">
            <h2 class="text-lg font-semibold">{organization?.organizationName}</h2>
        </div>
        
        <div class="px-4 py-3 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0V14M5 8h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z" />
                </svg>
                <span>Email: {organization?.organizationEmail}</span>
            </div>
        </div>
        
        <div class="px-4 py-3 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>Size: {organization?.organizationSize}</span>
            </div>
        </div>
      
        <div class="px-4 py-3 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <a href="#" class="text-blue-500" target='_blank'>{organization?.organizationWebsiteLink}</a>
            </div>
        </div>
       
        <div class="px-4 py-3">
            <div class="flex items-center space-x-3">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 8h16M4 16h16" />
                </svg>
                <span>Phone: {organization?.organizationPhoneNo}</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default OrganizationProfilePage