import React from 'react';
import atif from '../../assets/atif.jfif'
import Sheraz from '../../assets/sheraz.jfif'
const AboutPage = () => {
  const teamMembers = [
    { name: 'Muhammad Atif N.', role: 'Founder & CEO', imageUrl: atif },
    { name: 'Sheraz Tariq', role: 'CTO', imageUrl: Sheraz },
    { name: 'Muhammad Sauood', role: 'Supervisor', imageUrl: Sheraz },
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
                <img src={member.imageUrl} alt={member.name} className="w-40 h-40 rounded-full mb-4 " />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
};

export default AboutPage;
