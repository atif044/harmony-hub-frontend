import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import context from '../../../Context/HarmonyContext';
import toast from 'react-hot-toast';
const VerifyOtpVolunteer = () => {
    const [otp, setOtp] = useState('');
    const navigate=useNavigate();
    const {verificationOTPVolunteer,resendOTPVolunteer,setisVerifed}=useContext(context);
    const [loadingforverify,setloadingforverify]=useState(false);
    const [loadingforresend,setloadingforresend]=useState(false);
    const handleVerify = async(event) => {
      event.preventDefault();
      try {
          setloadingforverify(true);
          let response=await verificationOTPVolunteer(otp);
          if(response.data.status==="success"){
              setisVerifed("true");
              navigate("/")
              return toast.success(response.data.message);
          }
  
      } catch (error) {
          toast.error(error.response?.data.message)
      }
      finally{
          setloadingforverify(false);
      }
    };
    const handleResend =async () => {
      try {
          setloadingforresend(true);
          let response=await resendOTPVolunteer();
          if(response.data.status==="success"){
              return toast.success(response.data?.message);
          }
          
      } catch (error) {
          return toast.error(error.response?.data.message);
      }
      finally{
          setloadingforresend(false);
      }
  };
    return (
      <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
        <form onSubmit={handleVerify} className="mb-4">
          <label htmlFor="otpInput" className="block mb-2">Enter OTP:</label>
          <input
            type="text"
            id="otpInput"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            minLength={5}
            maxLength={5}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
          <button type="submit" disabled={loadingforresend||loadingforverify} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {loadingforverify?"Please Wait":"Verify"}
  
          </button>
        </form>
        <button onClick={handleResend} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loadingforresend||loadingforverify}>
          {loadingforresend?"Please Wait":"Resend"}
        </button>
      </div>
    );
}

export default VerifyOtpVolunteer