import React from 'react';
import { FaHandsHelping, FaRegBuilding, FaUniversity, FaUserShield, FaQuoteLeft } from 'react-icons/fa';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Alice Johnson', role: 'Founder & CEO', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Bob Smith', role: 'CTO', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Charlie Davis', role: 'Community Manager', imageUrl: 'https://via.placeholder.com/150' },
  ];

  const testimonials = [
    { name: 'Emily Clark', comment: 'Harmony Hub has revolutionized how we engage with our community.' },
    { name: 'Michael Brown', comment: 'A fantastic platform for finding volunteer opportunities.' },
    { name: 'Sarah Wilson', comment: 'The blockchain certification feature ensures trust and transparency.' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Harmony Hub</h1>
          <p className="text-lg md:text-xl mb-8">Our mission is to connect communities and foster collaboration through technology.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Mission</h2>
          <p className="text-lg mb-8">
            At Harmony Hub, we believe in the power of community service to bring people together and create positive change. Our platform is designed to facilitate engagement, streamline event management, and provide recognition through secure blockchain certifications.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white text-blue-500 p-8 rounded-lg shadow-md flex flex-col items-center">
                <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mb-4" />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What People Are Saying</h2>
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


    </div>
  );
};

export default AboutPage;
