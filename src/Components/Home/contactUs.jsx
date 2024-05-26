import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl mb-8">We'd love to hear from you! Reach out to us with any questions or feedback.</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <FaPhone className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p>+92 336 4795900</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p>atifn12500@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-blue-500 text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p>Barhia University lahore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Location</h2>
          <div className="w-full h-64">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217823.60617918673!2d74.08815328852491!3d31.45559859653855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919015d78d2723f%3A0x838088123d0e9aee!2sBahria%20University%20Lahore%20Campus!5e0!3m2!1sen!2s!4v1716131830706!5m2!1sen!2s"
              className="w-full h-full border-0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default ContactPage;
