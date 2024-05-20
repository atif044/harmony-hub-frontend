import React from 'react';
import { FaHandsHelping, FaRegBuilding, FaUniversity, FaUserShield } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      icon: <FaHandsHelping className="text-blue-500 text-6xl mb-4" />,
      title: 'Volunteer Engagement',
      description: 'Create profiles, search for events, and register to participate in community service activities.',
    },
    {
      icon: <FaRegBuilding className="text-blue-500 text-6xl mb-4" />,
      title: 'NGO Management',
      description: 'Post events, Manage events, review volunteer applications, Manage attendance and Provide feedback for participation.',
    },
    {
      icon: <FaUniversity className="text-blue-500 text-6xl mb-4" />,
      title: 'University Integration',
      description: 'Universities can Verify students information, Manage collaboration requests, Notify Students about Collaborative events and Monitoring Students Stats.',
    },
    {
      icon: <FaUserShield className="text-blue-500 text-6xl mb-4" />,
      title: 'Administrator Dashboard',
      description: 'Manage users and certificate issuance efficiently.',
    },
    {
      icon: <FaUserShield className="text-blue-500 text-6xl mb-4" />,
      title: 'Blockchain Certification',
      description: 'Certificates issued through Harmony Hub are stored on a blockchain for enhanced security and verification.',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl mb-8">Discover the wide range of services we offer to foster community engagement and collaboration.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ServicesPage;
