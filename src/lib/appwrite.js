import { Client, Storage, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use VITE_ prefix
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);
const databases = new Databases(client);

// Constants
const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


// Upload file function
export const uploadFile = async (file) => {
    try {
        if (!file || !(file instanceof File)) {
            throw new Error('Invalid file input');
        }

        console.log('Uploading file:', file.name, 'Size:', file.size);

        // Upload file to storage
        const fileUpload = await storage.createFile(
            STORAGE_BUCKET_ID,
            ID.unique(),
            file
        );
        console.log('File uploaded successfully:', fileUpload);

        // Store file metadata in database
        const fileDoc = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                fileId: fileUpload.$id,
                fileName: file.name,
                fileSize: file.size,
                uploadDate: new Date().toISOString()
            }
        );
        console.log('File metadata saved successfully:', fileDoc);

        return {
            fileId: fileUpload.$id,
            fileData: fileDoc
        };
    } catch (error) {
        console.error('Upload error:', error.message);
        throw error;
    }
};


// Get file details
export const getFile = async (fileId) => {
    try {
        return await storage.getFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
        console.error('Get file error:', error);
        throw error;
    }
};

// Download file
export const downloadFile = async (customId) => {
    try {
        // Retrieve file data from your database or mapping
        const fileDoc = await getFileDocumentByCustomId(customId); // Implement this function to fetch the file metadata by customId
        if (!fileDoc) {
            throw new Error('File not found');
        }

        // Get the fileId from the database document
        const fileId = fileDoc.fileId;

        // Generate the download URL from Appwrite
        const result = await storage.getFileDownload(STORAGE_BUCKET_ID, fileId);
        
        return result.href;  // Return the download URL (you can redirect the user or use it in a link)
    } catch (error) {
        console.error('Download error:', error);
        throw error;
    }
};

// Example of how you could implement getFileDocumentByCustomId (this is just a placeholder):
const getFileDocumentByCustomId = async (customId) => {
    try {
        const fileDocs = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('customId', customId)]
        );

        if (fileDocs.documents.length > 0) {
            return fileDocs.documents[0];
        }

        return null; // No file document found for the customId
    } catch (error) {
        console.error('Error fetching file document by customId:', error);
        throw error;
    }
};

// Get file preview URL
export const getFilePreview = (fileId) => {
    return storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
};

export { client, storage, databases, ID };