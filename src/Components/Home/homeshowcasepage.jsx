import React, { useContext, useEffect, useState } from 'react';
import { FaHandsHelping, FaRegBuilding, FaUniversity, FaUserShield, FaCheckCircle, FaClipboardList, FaUsers, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import context from '../../Context/HarmonyContext';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate=useNavigate()
    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleGetStartedClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  const advancedModal = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end mb-4">
          <button onClick={handleCloseModal} className="text-gray-700 hover:text-gray-900">
            <FaTimes size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/signuporganization') }
            className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaHandsHelping className="mr-2" />
            I am an NGO
          </button>
          <button
            onClick={() =>  navigate('/volunteersignup')}
            className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaUserShield className="mr-2" />
            I am a Volunteer
          </button>
          <button
            onClick={() =>  navigate('/signupuniversity')}
            className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaUniversity className="mr-2" />
            I am a University
          </button>
        </div>
      </div>
    </div>
  );

  // Sample data for features, benefits, stakeholders, testimonials, events, and impact statistics
  const features = [
    { icon: FaHandsHelping, title: 'Volunteer Engagement', description: 'Register for community service events with ease.' },
    { icon: FaRegBuilding, title: 'NGO Management', description: 'Post events, review applications, and issue certificates.' },
    { icon: FaUniversity, title: 'University Integration', description: 'Colaborate with NGOs, Track student participation.' },
  ];

  const benefits = [
    { icon: FaCheckCircle, title: 'Recognition & Certification', description: 'Receive certificates for your contributions.' },
    { icon: FaClipboardList, title: 'Efficient Event Management', description: 'Streamline event organization and management.' },
    { icon: FaUsers, title: 'Community Building', description: 'Connect with like-minded individuals and organizations.' },
  ];

  const stakeholders = [
    { icon: FaHandsHelping, title: 'Volunteers', description: 'Individuals interested in community service events.' },
    { icon: FaRegBuilding, title: 'NGOs', description: 'Non-profit organizations hosting events.' },
    { icon: FaUniversity, title: 'Universities', description: 'Educational institutions Colaborates in events.' },
    { icon: FaUserShield, title: 'Administrators', description: 'Platform administrators managing users and events , Iusse Blockchain base Certifcaition. Create a fair envirnment' },
  ];

  const testimonials = [
    { name: 'John Doe', comment: 'Harmony Hub helped me find meaningful volunteer opportunities easily.' },
    { name: 'Jane Smith', comment: 'I appreciate the transparency and efficiency of event management on Harmony Hub.' },
    { name: 'David Lee', comment: 'Connecting with other NGOs and volunteers has been invaluable for our organization.' },
  ];

  const {countForVolunteersAndOrg,organizationtoken,universitytoken,volunteertoken,admintoken}=useContext(context);
  const [counts,setCounts]=useState({
    volunteer:0,
    events:0,
    organization:0
  })

const getAllCount=async()=>{
  try {
    let response=await countForVolunteersAndOrg();
    if(response.data.status==="success"){
      setCounts({
        volunteer:response.data.users,
        events:response.data.events,
        organization:response.data.org
      })
    }
    
  } catch (error) {
    console.log(error)
    return 
  }
}
useEffect(() => {
  getAllCount()
}, [])
  return (
    <>
    
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Harmony Hub</h1>
          <p className="text-lg md:text-xl mb-8">Connecting communities for a better tomorrow</p>
          {
            (
              (organizationtoken==""||organizationtoken==undefined) 
              &&
            (universitytoken==""||universitytoken==undefined)
            &&
            (volunteertoken==""||volunteertoken==undefined)
            &&
            (admintoken==""||admintoken==undefined)
            )
            &&
            <button
            onClick={handleGetStartedClick}
            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            Get Started
          </button>
          
          }
        </div>
      </section>
      {/* Advanced Modal */}
      {isModalOpen && advancedModal}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <feature.icon className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-blue-500">
                <benefit.icon className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholder Roles Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Stakeholder Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {stakeholders.map((stakeholder, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <stakeholder.icon className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">{stakeholder.title}</h3>
                <p>{stakeholder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What People are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <FaQuoteLeft className="text-blue-500 text-4xl mb-4 mx-auto" />
                <p className="text-lg mb-4">{testimonial.comment}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">{counts.volunteer}</h3>
              <p className="text-gray-600">Volunteers Registered</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">{counts.events}</h3>
              <p className="text-gray-600">Events Posted</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">{counts.organization}</h3>
              <p className="text-gray-600">Organization Registered</p>
            </div>
          </div>
        </div>
      </section>

     
     
    </div></>
  );
};

export default HomePage;
