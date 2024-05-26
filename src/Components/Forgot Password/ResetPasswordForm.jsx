import React, { useContext, useEffect, useState } from 'react';
import context from '../../Context/HarmonyContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
    const navigate=useNavigate()
    const {token}=useParams()
    const {checkValidityOfToken,updatePassword}=useContext(context)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('Passwords do not match');
    } else {
        try {
            setError('');
            let response=await updatePassword(formData.newPassword,token);
            if(response.data.status==="success"){
                navigate('/')
                return toast.success(response.data.message)
            }
        } catch (error) {
            return toast.error(error?.response.data.message)
        }
        finally{
            setFormData({
                newPassword: '',
                confirmNewPassword: ''
              });
        }
     
      
    }
  };
const validityToken=async()=>{
    try {
        let res=await checkValidityOfToken(token);
        if(res.data.status==="success"){
            if(res.data.body==false){
                return navigate('/')
            }
        }
        
    } catch (error) {
        return navigate('/')
    }
}
useEffect(() => {
validityToken()
}, []);
  return (
    <div className="-ml-10 -mr-10 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              title="Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
              name="newPassword"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              title="Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
