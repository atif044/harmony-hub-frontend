import React, { useContext, useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import PdfToImageConverter from '../../UploadPdf';
import context from '../../../Context/HarmonyContext';

const Modal = ({makePdf,id,eventId,SetDetails,uploadToCloudinary, isOpen, onClose, value ,exist,addCert,account,handleCertification}) => {
  const [image,setImageData]=useState('');
  const {changeRequestType}=useContext(context);
  const changeTheRequest=async()=>{
    try {
      let response=await changeRequestType(value.UserId,value.EventId);
      console.log(response)
      if(response.data.status==="success"){
        return toast.success(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const handleIssue =async () => {
    try {
      let response= await exist(value.email,value.EventId)
      await changeTheRequest()
      if(response.length===0){
        let upload=await uploadToCloudinary(image);
          let response=await handleCertification(value.EventName,value.email,upload.body,value.EventId);
              }
              else{
                toast.error("You have already got your certificate")
                
            }
    } catch (error) {
        console.log(error)
    }
    finally{
        onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        {console.log(value)}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg overflow-hidden relative z-50 max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Issue Certificate</h2>
            <div className="mb-4">
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
              <input type="text" id="eventName" disabled value={value.EventName} name="eventName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Event Id</label>
              <input type="text" id="status" name="status" disabled value={value.EventId}  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="text" id="time" name="time" disabled value={value.email}  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="time" name="time" disabled value={value.fullName}   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className='mb-4'>
              <button onClick={()=>makePdf()}>
                Generate Pdf
              </button>
            </div>
            <div className="mb-4">
              <PdfToImageConverter setData={setImageData}/>
            </div>
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">Cancel</button>
              <button onClick={handleIssue} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Issue</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
