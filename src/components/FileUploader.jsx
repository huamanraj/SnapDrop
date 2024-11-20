// src/components/FileUploader.jsx
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { Progress } from './ui/Progress';

export const FileUploader = ({ onFileSelect, progress, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    onFileSelect(file);
  }, [onFileSelect]); 

  useEffect(() => {
    // Reset selected file when upload is complete
    if (progress === 100) {
      setTimeout(() => {
        setSelectedFile(null);
      }, 2000);
    }
  }, [progress])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-all duration-200 ease-in-out
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${selectedFile ? 'opacity-50' : 'opacity-100'}
        `}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FiUpload className="mx-auto text-4xl mb-4 text-blue-500" />
          <p className="text-gray-600 mb-2">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-sm text-gray-400">
            or click to browse (max 100MB)
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiFile className="text-blue-500 text-xl" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isUploading && (
                <button
                  onClick={removeFile}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FiX />
                </button>
              )}
            </div>
            {isUploading && (
              <div className="mt-3">
                <Progress progress={progress} />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Uploading... {progress}%
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;