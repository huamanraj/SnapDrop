import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiLink, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

const Feature = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <Icon className="text-4xl text-blue-600 mb-4" />
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const BackgroundSVG = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 224L60 213.3C120 203 240 181 360 181.3C480 181 600 203 720 208C840 213 960 203 1080 170.7C1200 139 1320 85 1380 58.7L1440 32V320H1380C1320 320 1200 320 1080 320C960 320 840 320 720 320C600 320 480 320 360 320C240 320 120 320 60 320H0V224Z" fill="url(#paint0_linear)" fillOpacity="0.1" />
      <defs>
        <linearGradient id="paint0_linear" x1="720" y1="32" x2="720" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const LandingPage = () => {
  const features = [
    { icon: FiUpload, title: "Upload Files", description: "Easily upload your files with a simple drag and drop interface." },
    { icon: FiLink, title: "Generate Shareable Links", description: "Get instant links to share your files with anyone." },
    { icon: FiShare2, title: "Quick Sharing", description: "Share your files securely with just a click." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col relative overflow-hidden">
      <BackgroundSVG />


{/* 
      <div className="fixed top-4 right-4 flex space-x-4 z-10">
        <a href="https://www.linkedin.com/in/huamanraj" target="_blank" rel="noopener noreferrer">
          <div className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110">
            <FiLinkedin className="w-6 h-6" />
          </div>
        </a>
        <a href="https://github.com/huamanraj" target="_blank" rel="noopener noreferrer">
          <div className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-110">
            <FiGithub className="w-6 h-6" />
          </div>
        </a>
        <a href="https://aman-raj.xyz" target="_blank" rel="noopener noreferrer">
          <div className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-110">
            <FiGlobe className="w-6 h-6" />
          </div>
        </a>
      </div> */}

      <main className="container mx-auto px-6 py-16 flex flex-col items-center text-center relative z-10">

        <div className="flex items-center justify-center">


          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-10 h-10 mr-2 flex items-center justify-center"

          >
            <img src={logo} alt="Logo" className="w-full h-full   " />

          </motion.div>
          <motion.h1
            className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            SnapDrop
          </motion.h1>
        </div>


        <motion.h1
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 mt-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Simplify File Sharing
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Easily upload your files and generate shareable links for seamless sharing.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            to="/upload"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow inline-flex items-center space-x-2"
          >
            <span>Upload & Get Link</span>
          </Link>
        </motion.div>

        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Feature {...feature} />
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

console.log(`
  A     M     M  AAAAA   N   N
 A A    MM   MM  A   A  NN  N
AAAAA   M M M M  AAAAA  N N N
A   A   M  M  M  A   A  N  NN
A   A   M     M  A   A  N   N
`);

console.log('Lets connect devs: www.aman-raj.xyz');
