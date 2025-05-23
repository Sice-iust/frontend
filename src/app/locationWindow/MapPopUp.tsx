import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const [mapSrc, setMapSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMap = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verify your API key format with Neshan's documentation
      const key = "service.aa597c7703fa42c79faa9ba8f6eb62b7"; // Replace with actual key
      const url = `https://api.neshan.org/v4/static?key=${key}&type=neshan&width=500&height=500&zoom=12&center=35.715298,51.404343&markerToken=`; // Tehran coordinates
      
      // Set responseType to 'blob' for image responses
      const response = await axios.get(url, {
        responseType: 'blob'
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(blob);
        setMapSrc(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching map:", error);
      setError("Failed to load map. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchMap();
    } else {
      document.body.style.overflow = "";
      if (mapSrc) {
        URL.revokeObjectURL(mapSrc); // Clean up
        setMapSrc(null);
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl p-4 relative border border-gray-200">
        <CloseIcon
          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 text-2xl absolute top-2 right-2"
          onClick={onClose}
        />
        <div className="mt-2">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading map...</p>
            </div>
          ) : error ? (
            <div className="h-64 flex items-center justify-center text-red-500">
              <p>{error}</p>
            </div>
          ) : mapSrc ? (
            <img 
              src={mapSrc} 
              alt="Map Preview" 
              className="w-full h-auto rounded-md" 
              onError={() => setError("Failed to display map")}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Popup;