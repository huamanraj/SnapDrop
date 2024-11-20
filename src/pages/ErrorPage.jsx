import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUpload, FiHome } from 'react-icons/fi'; // Importing icons

// Background SVG
const BackgroundSVG = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 224L60 213.3C120 203 240 181 360 181.3C480 181 600 203 720 208C840 213 960 203 1080 170.7C1200 139 1320 85 1380 58.7L1440 32V320H1380C1320 320 1200 320 1080 320C960 320 840 320 720 320C600 320 480 320 360 320C240 320 120 320 60 320H0V224Z" fill="url(#paint0_linear)" fillOpacity="0.1"/>
      <defs>
        <linearGradient id="paint0_linear" x1="720" y1="32" x2="720" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5"/>
          <stop offset="1" stopColor="#4F46E5" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ErrorPage = ({ status = 404 }) => {
  const errorMessages = {
    404: "Page Not Found",
    500: "Internal Server Error",
    403: "Access Forbidden"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center  relative"
    >
      {/* Background SVG */}
      <BackgroundSVG />

      <div className="relative z-10 text-center text-red-500 max-w-lg px-6 py-8 bg-opacity-70 bg-white rounded-2xl  w-full sm:max-w-md">
        <div className="mb-6">
          <h1 className="text-6xl font-bold">{status}</h1>
          <p className="text-xl mb-4">{errorMessages[status] || "An unexpected error occurred"}</p>
        </div>

        <motion.div
          
          whileTap={{ scale: 0.95 }}
          className="space-x-4 mb-6 flex justify-center flex-wrap"
        >
          <Link 
            to="/upload" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 mb-4 sm:mb-0"
          >
            <FiUpload className="mr-2" />
            Upload File
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition duration-300"
          >
            <FiHome className="mr-2" />
            Return to Home
          </Link>
        </motion.div>

        <p className="text-sm text-gray-600 mt-4">Need help? Contact support or visit the homepage.</p>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
