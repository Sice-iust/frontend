import React, { useState } from 'react';  
import LoginModal from '../login/login';

const HomePage: React.FC = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const handleOpenModal = () => {  
    setIsModalOpen(true);  
  };  

  const handleCloseModal = () => {  
    setIsModalOpen(false);  
  };  

  return (  
    <div style={{ position: 'relative', padding: '20px' }}>  
      <button style={{ position: 'absolute', top: '20px', left: '20px'  ,background:'#F18825' , border:'none'}} onClick={handleOpenModal}>  
        ورود/عضویت  
      </button>  
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}  
    </div>  
  );  
};  

export default HomePage;  