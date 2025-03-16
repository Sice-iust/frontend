import React, { useState } from "react";
import LoginModal from "../login/login";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    
    <div style={{ position: "relative", padding: "20px" }}>
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
      {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} />}
      <div className="bg-MainOrange text-white p-4">
  Tailwind CSS is working!
</div>
    </div>
    
  );
};

export default HomePage;
