import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        <span className="ml-2 text-xl font-bold text-gray-800">FileShare</span>
                    </Link>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/upload"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <FiUpload className="mr-2" />
                            Upload File
                        </Link>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;