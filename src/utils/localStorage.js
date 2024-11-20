// src/utils/localStorage.js
export const StorageKeys = {
    SHARED_LINKS: 'shared_links'
  };
  
  export const saveToLocalStorage = (newLink) => {
    const existingLinks = getFromLocalStorage();
    const updatedLinks = [newLink, ...existingLinks];
    localStorage.setItem(StorageKeys.SHARED_LINKS, JSON.stringify(updatedLinks));
  };
  
  export const getFromLocalStorage = () => {
    const links = localStorage.getItem(StorageKeys.SHARED_LINKS);
    return links ? JSON.parse(links) : [];
  };
  
  export const removeFromLocalStorage = (fileId) => {
    const links = getFromLocalStorage();
    const updatedLinks = links.filter(link => link.fileId !== fileId);
    localStorage.setItem(StorageKeys.SHARED_LINKS, JSON.stringify(updatedLinks));
  };