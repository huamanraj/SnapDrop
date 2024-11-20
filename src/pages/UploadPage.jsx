import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiCopy, FiTrash2, FiLink } from 'react-icons/fi';
import { FileUploader } from '../components/FileUploader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { uploadFile } from '../lib/appwrite';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../utils/localStorage';

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sharedLinks, setSharedLinks] = useState([]);
  const [latestUpload, setLatestUpload] = useState(null);
  const [customId, setCustomId] = useState('');
  const [isIdValid, setIsIdValid] = useState(true);

  useEffect(() => {
    const links = getFromLocalStorage();
    setSharedLinks(links);
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await uploadFile(file);
      clearInterval(progressInterval);
      setProgress(100);

      const linkData = {
        fileId: result.fileId,
        fileName: file.name,
        fileSize: file.size,
        shareLink: `${window.location.origin}/download/${result.fileId}`,
        uploadDate: new Date().toISOString(),
      };

      saveToLocalStorage(linkData);
      setSharedLinks(prev => [linkData, ...prev]);
      setLatestUpload(linkData);

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setProgress(0);
        setLatestUpload(null);
      }, 10000);
    }
  };

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDelete = (fileId) => {
    removeFromLocalStorage(fileId);
    setSharedLinks(prev => prev.filter(link => link.fileId !== fileId));
    toast.success('Link removed');
  };

  const handleSaveCustomId = async () => {
    if (!customId.match(/^[a-zA-Z0-9_-]+$/)) {
      setIsIdValid(false);
      toast.error('Invalid ID. Only letters, numbers, hyphens, and underscores are allowed.');
      return;
    }
  
    const existingLink = sharedLinks.find(link => link.customId === customId);
    if (existingLink) {
      setIsIdValid(false);
      toast.error('This ID is already taken.');
      return;
    }
  
    const updatedLinkData = {
      ...latestUpload,
      customId: customId,
      shareLink: `${window.location.origin}/download/${customId}`,
    };
  
    // Save to Appwrite Database
    await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      {
        fileId: latestUpload.fileId,
        customId: customId,
      }
    );
  
    saveToLocalStorage(updatedLinkData);
    setSharedLinks(prev =>
      prev.map(link => (link.fileId === latestUpload.fileId ? updatedLinkData : link))
    );
    setLatestUpload(updatedLinkData);
    setIsIdValid(true);
    toast.success('Custom ID saved successfully!');
  };
  
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Upload & Share Files
        </h1>
        <FileUploader
          onFileSelect={handleUpload}
          progress={progress}
          isUploading={uploading}
        />
      </Card>

      {/* Latest Upload */}
      <AnimatePresence>
        {latestUpload && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <Card className="border-2 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    File Uploaded Successfully!
                  </h3>
                  <p className="text-sm text-gray-600">{latestUpload.fileName}</p>
                </div>
                <Button
                  onClick={() => handleCopyLink(latestUpload.shareLink)}
                  className="flex items-center space-x-2"
                >
                  <FiCopy />
                  <span>Copy Link</span>
                </Button>
              </div>
            </Card>

            {/* Custom ID Input */}
            <div className="mt-4">
              <label htmlFor="custom-id" className="block text-sm font-medium text-gray-700">
                Custom ID (Optional)
              </label>
              <div className="flex space-x-2 items-center mt-2">
                <input
                  type="text"
                  id="custom-id"
                  className="border border-gray-300 p-2 rounded-lg w-full"
                  value={customId}
                  onChange={(e) => setCustomId(e.target.value)}
                  placeholder="Enter a custom ID"
                />
                <Button
                  onClick={handleSaveCustomId}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Save
                </Button>
              </div>
              {!isIdValid && <p className="text-sm text-red-500 mt-1">Invalid ID. Only letters, numbers, hyphens, and underscores are allowed.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous Links */}
      {sharedLinks.length > 0 && (
        <Card className="bg-white text-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            Previously Shared Files
          </h2>
          <div className="space-y-3">
            {sharedLinks.map((link) => (
              <motion.div
                key={link.fileId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-50 text-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm"
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <FiLink className="text-gray-600 text-xl" />
                  <div>
                    <p className="font-medium text-base truncate max-w-[200px] sm:max-w-none">
                      {link.fileName.length > 100
                        ? `${link.fileName.slice(0, 100)}...`
                        : link.fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(link.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-4 self-start sm:self-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleCopyLink(link.shareLink)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-1"
                  >
                    <FiCopy className="text-sm" />
                    <span className="text-sm">Copy Link</span>
                  </Button>
                  <Button
                    onClick={() => handleDelete(link.fileId)}
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-1"
                  >
                    <FiTrash2 className="text-sm" />
                    <span className="text-sm">Delete</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default UploadPage;
