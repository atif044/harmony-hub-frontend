import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import aboutUs from './aboutUs';
import contactUs from './contactUs';
import Services from './Services';

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSignInSignUpClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleProceed = () => {
    if (selectedOption === 'volunteer') {
      window.location.href = '/sign-in-volunteer';
    } else if (selectedOption === 'ngo') {
      window.location.href = '/sign-in-ngo';
    } else if (selectedOption === 'university') {
      window.location.href = '/sign-in-university';
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-blue-500">Harmony Hub</a>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-500">Home</a>
            </li>
            <li>
              <a href="/services" className="text-gray-700 hover:text-blue-500">Services</a>
            </li>
            <li>
              <a href="./aboutUS" className="text-gray-700 hover:text-blue-500">About Us</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-700 hover:text-blue-500">Contact</a>
            </li>
            {/* Dropdown for other pages */}
            <li className="relative">
              <button
                className="text-gray-700 hover:text-blue-500 focus:outline-none"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                More <FaBars className="inline" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-md py-2 mt-2 w-32 rounded-lg">
                  <li>
                    <a href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500">FAQ</a>
                  </li>
                  <li>
                    <a href="/terms" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500">Terms</a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Sign In/Sign Up Button */}
        <button
          onClick={handleSignInSignUpClick}
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Sign In / Sign Up
        </button>

        {/* Advanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-end mb-4">
                <button onClick={handleCloseModal} className="text-gray-700 hover:text-gray-900">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => handleSelectOption('volunteer')}
                  className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  I am a Volunteer
                </button>
                <button
                  onClick={() => handleSelectOption('ngo')}
                  className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  I am an NGO
                </button>
                <button
                  onClick={() => handleSelectOption('university')}
                  className="bg-blue-500 text-white font-semibold flex items-center justify-center px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  I am a University
                </button>
              </div>
              {selectedOption && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-center">Proceed as {selectedOption}</h3>
                  <div className="flex justify-around mt-4">
                    <button
                      onClick={() => window.location.href = `/sign-in-${selectedOption}`}
                      className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => window.location.href = `/sign-up-${selectedOption}`}
                      className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
