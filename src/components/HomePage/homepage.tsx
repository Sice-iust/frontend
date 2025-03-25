import React, { useState, useEffect } from "react";
import LoginModal from "../login/login"; // Ensure the path is correct 
import { useTheme } from '../theme'; // Import your theme context if needed  


export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Get both isDarkMode and toggleDarkMode from context  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        backgroundColor: isDarkMode ? '#121212' : '#ffffff', // Background changes with theme  
        color: isDarkMode ? '#ffffff' : '#000000' // Text color changes with theme  
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#F18825",
          border: "none",
          padding: "10px 20px",
          color: "#fff",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={handleOpenModal}
      >
        ورود/عضویت
      </button>
      <button
        style={{
          marginTop: '0px',
          padding: '10px 10px',
          marginLeft: '150px',
          cursor: 'pointer',
          background: isDarkMode ? '#F18825' : '#F18825', // Change background based on theme  
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} />}
    </div>
  );
}; 