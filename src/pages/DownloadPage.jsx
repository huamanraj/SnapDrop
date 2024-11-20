import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiFile } from 'react-icons/fi';
import { storage } from '../lib/appwrite';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo.png';

const DownloadPage = () => {
    const { fileId } = useParams();  // This fetches fileId from the URL
    const [fileInfo, setFileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fileNotFound, setFileNotFound] = useState(false);

    useEffect(() => {
        fetchFileInfo();
    }, [fileId]);

    const fetchFileInfo = async () => {
        try {
            const file = await storage.getFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
            setFileInfo(file);
        } catch (error) {
            setFileNotFound(true);
            toast.error('File not found');
        }
        setLoading(false);
    };

    const handleDownload = async () => {
        try {
            const result = await storage.getFileDownload(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
            const downloadUrl = result.href;
            console.log('File ID:', fileId);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileInfo?.name || 'downloaded_file';  // Use file name from state
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);  // Remove the link after clicking
        } catch (error) {
            console.error('Download Error:', error);
            toast.error('Download failed');
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <img src={logo} alt="SnapDrop Logo" className="w-32 h-32 object-contain rounded-2xl shadow-lg" />
                    <h1 className="text-2xl font-semibold text-gray-800">Loading...</h1>
                </div>
            </div>
        );
    }

    if (fileNotFound) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <img src={logo} alt="SnapDrop Logo" className="w-32 h-32 object-contain rounded-2xl shadow-lg" />
                    <h1 className="text-2xl font-semibold text-gray-800">File Not Found</h1>
                    <p className="text-sm text-gray-500 w-[60%] text-center">The file you're looking for does not exist or the ID is incorrect.</p>
                    <Link to="/" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
                        Upload File
                    </Link>
                </div>
            </div>
        );
    }

    const fileSizeMB = (fileInfo?.sizeOriginal || 0) / (1024 * 1024);

    return (

        <div className="h-screen flex flex-col">
            {/* Header Section */}

            <div className="items-center justify-center flex flex-row py-4 bg-white ">
                <img src={logo} alt="SnapDrop Logo" className=" w-12 mr-1 h-12 object-contain mb-1" />
                <h1 className="text-2xl font-bold text-gray-800">SnapDrop</h1>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white mt-32 w-[80%] sm:w-[60%] text-center p-6 rounded-lg"
                >
                    <FiFile className="text-4xl text-blue-500 mx-auto mb-2" />
                    <h2
                        className="text-xl font-bold text-gray-800 mb-2 truncate mx-auto w-[80%]"
                        title={fileInfo?.name}
                    >
                        {fileInfo?.name}
                    </h2>
                    <p className="text-gray-500 mb-4">Size: {fileSizeMB.toFixed(2)} MB</p>
                    <motion.button
                        onClick={handleDownload}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center space-x-2 hover:bg-blue-500"
                    >
                        <FiDownload />
                        <span>Download</span>
                    </motion.button>
                </motion.div>
            </div>

        </div>
    );
};

export default DownloadPage;