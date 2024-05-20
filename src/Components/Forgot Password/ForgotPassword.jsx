import React, { useContext, useState } from 'react';
import context from '../../Context/HarmonyContext';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const {sendResetLink}=useContext(context);
    const [load,setLoad]=useState(false)
  const [email, setEmail] = useState('');
  const [type, setType] = useState('volun');

  const handleSubmit = async(e) => {
    e.preventDefault()
   try {
    setLoad(true)
    let response=await sendResetLink({email,type});
    if(response.data.status==="success"){
        return toast.success(response.data.message);
    }

   } catch (error) {
    return toast.error(error?.response.data.message)
   }
   finally{
    setLoad(false)
   }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
          <select
            id="type"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="org">Organization</option>
            <option value="uni">University</option>
            <option value="volun">Volunteer</option>
          </select>
        </div>

        <button
        disabled={load}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          type='submit'        >
          {load?"...":"Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
