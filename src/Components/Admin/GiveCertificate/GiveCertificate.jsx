import React, { useContext, useEffect } from 'react'
import context from '../../../Context/HarmonyContext'

const GiveCertificate = () => {
  const {connectWallet,currentAccount,getMyContractDetails,addCertificationDetails}=useContext(context);
  const getIt=async()=>{
    await getMyContractDetails()
  }
  useEffect(() => {
  getIt();
  }, [])
  return (
    <>
    <div className='mt-8 ml-20'>
      <h1 className='text-center'>Login Using Metamask</h1>
      {currentAccount?`${currentAccount}`:
      <button onClick={connectWallet} className='p-1 text-white rounded-md bg-green-500'>
        Login
      </button>}

    </div>
    <button onClick={addCertificationDetails} className='p-1 text-white rounded-md bg-green-500'>
        click to add
      </button>
    </>
  )
}

export default GiveCertificate