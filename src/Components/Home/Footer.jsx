import React from "react";
import { Link } from "react-router-dom";

const Footer =()=>{
    return(
        <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <nav className="mb-6">
            <ul className="flex justify-center">
              <li className="mr-6">
                <Link to="/about-us" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li className="mr-6">
                <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
              </li>
              <li className="mr-6">
                <Link to="/contact-us" className="text-gray-300 hover:text-white">Contact</Link>
              </li>
            </ul>
          </nav>
          <p>&copy; 2024 Harmony Hub. All rights reserved.</p>
        </div>
      </footer>
    )
}

export default Footer