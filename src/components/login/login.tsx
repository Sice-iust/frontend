import React from 'react';  
import './login.scss'; 

interface LoginModalProps {  
  onClose: () => void;   
}  

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {  
  return (  
    <div className="modal-overlay">  
      <div className="modal-content">  
        <h2>ورود</h2>  
        <form>  
          <label>  
            نام کاربری:  
            <input type="text" name="username" />  
          </label>  
          <br />  
          <label>  
            رمز عبور:  
            <input type="password" name="password" />  
          </label>  
          <br />  
          <button type="submit">ورود</button>  
        </form>  
        <button onClick={onClose}>بستن</button>  
      </div>  
    </div>  
  );  
};  

export default LoginModal;  