import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Logo from "../../../public/logo.png";
import  './login.scss'; // Import the SCSS file

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <div className='dialogTitle'>
          <IconButton edge="end" color="inherit" onClick={onClose} className='closeButton'>
            <CloseIcon className='closeIcon'  />
          </IconButton>
          <div className='logoContainer'>
            <img src={Logo} alt="Nanzi Logo" />
          </div>
        </div>
        <div className='fullScreenContainer'>
          <h1 className='nanziText'>Nanzi</h1>
        </div>
        <div className="titleContainer">  
  <h1>    ورود <span className="non-bold">یا</span> عضویت  
  </h1>  
</div>  
      </DialogTitle>
      <DialogContent>  
        <form id="login-form" onSubmit={handleSubmit}>  
          <TextField  
            autoFocus  
            margin="dense"  
            label="شماره تلفن همراه" // Phone Number  
            type="text"  
            fullWidth  
            variant="outlined"  
            required  
            className='textField'  
            inputProps={{   
              style: {   
                textAlign: 'left',  // Right-align the text input  
                direction: 'ltr',     // Set text direction to right-to-left  
                marginTop:'50 px'
              }  
            }}  
          />  
          {/* Optional: Provide an error message here */}  
          <span className="error-message" style={{ display: 'none' }}>Please fill out this field.</span>  
        </form>  
      </DialogContent> 
      <DialogActions className="dialogActions">  
  <div className="buttonWrapper"> {/* Wrapper for centering */}  
    <Button  
      type="submit"  
      form="login-form"  
      className="dialogActionsButton"  
    >  
      ادامه  
    </Button>  
  </div>  
</DialogActions>
    </Dialog>
  );
};

export default LoginModal;