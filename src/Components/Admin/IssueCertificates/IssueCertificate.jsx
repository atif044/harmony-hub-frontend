import React,{useContext, useEffect, useState} from 'react'
import context from '../../../Context/HarmonyContext';
import Modal from './Modal';
import {addCertification,connectToMetaMask} from './bhhd';
const IssueCertificate = ({makePdf,details,SetDetails,uploadToCloudinary}) => {
    const [account,setAccount]=useState('');
    const [web3,setWeb3]=useState(null)
    const [selectedRequest,setSelectedRequests]=useState({
         UserId:"",
        EventId:"",
        fullName:"",
        email:"",
        EventName:"",
        universityName:"",
        organizationName:""
    })
    const [allRequests,setAllRequests]=useState([])
    const {connectWallet,checkIfWalletConnected,getAllRequests,checkCertificteExistOrNot,addCertificationDetails}=useContext(context);
    const [isModalOpen,setIsModalOpen]=useState(false)
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    const trimWalletAddress=(str)=>{
        let start= str.substring(0,5);
        let end= str.substring(str.length-5);
        return start+"...."+end;
    }
    const allUsers=async()=>{
        try {
            const response=await getAllRequests();
            if(response.data.status==="success"){
                setAllRequests(response.data.body)
            }
            
        } catch (error) {
            
        }
    }
    useEffect(() => {
     checkIfWalletConnected(setAccount);
     allUsers();
    }, []);
    const openModalAndSelectRequest=async(eid,ename,fname,email,uname,oname,uid)=>{
        setSelectedRequests({
            EventId:eid,
            EventName:ename,
            fullName:fname,
            email:email,
            universityName:uname,
            organizationName:oname,
            UserId:uid
        });
        SetDetails({
          name:fname,
          eventDescription:`This Certificate is for the participation in the ${ename}`,
      universityName:uname,
      organizationName:oname,
      eventName:ename
        });
        setIsModalOpen(true)
    }

    const handleConnectToMetaMask = async () => {
      const web3Instance = await connectToMetaMask();
      setWeb3(web3Instance);
  };

  const handleAddCertification = async (name,email,link,id,address) => {
      if (!web3) {
          console.error("Web3 not initialized.");
          return;
      }
      await addCertification(web3,account,name,email,link,id,address);
  };
useEffect(() => {
  handleConnectToMetaMask()
}, [])
  return (
    <div className='mt-8 ml-10 mr-10'>
    {

        account!==""?
         <h1>{trimWalletAddress(account)}</h1>:
        <button onClick={()=>{connectWallet(setAccount)
          }
        } className='bg-transparent text-green-500 p-1 rounded-md border-s-2 outline-double'>Connect Wallet</button>
        }
        <div className="overflow-auto border border-gray-200 rounded-lg">
        <Modal makePdf={makePdf} SetDetails={SetDetails} uploadToCloudinary={uploadToCloudinary} isOpen={isModalOpen} value={selectedRequest} handleCertification={handleAddCertification} onClose={closeModal} addCert={addCertificationDetails} account={account} exist={checkCertificteExistOrNot} />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allRequests.map(request => (
            <tr key={request._id}>
              <td className="px-6 py-4 whitespace-nowrap">{request.eventId.EventName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(request.time).toUTCString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.userId.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap"><button className='bg-green-500 text-white p-1 rounded-md' onClick={()=>openModalAndSelectRequest(request.eventId._id,request.eventId.EventName,request.userId.fullName,request.userId.email,request.eventId.universityId?.universityName,request.eventId.organizationId.organizationName,request.userId._id)}>Give Certificate</button></td>
            </tr>
          ))}
        </tbody>
        {console.log(allRequests)}
      </table>
    </div>    
   
    </div>
  )
}

export default IssueCertificate