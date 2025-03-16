import React from 'react';  
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';  
import CloseIcon from '@mui/icons-material/Close'; 
import Logo from "../../../public/logo.png";  

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
        <div className="flex justify-between items-center">  
        <IconButton edge="end" color="inherit" onClick={onClose}>  
            <CloseIcon />  
          </IconButton>  
          <div className="flex justify-center mb-4">  
            <img src={Logo} alt="Nanzi Logo" className="h-[61px] w-auto" />  
          </div>  
         
        </div>  
        <div className="text-center">  
          <h1 className="font-bold text-2xl">ورود یا عضویت</h1>  
        </div>  
      </DialogTitle>  
      <DialogContent>  
        <form id="login-form" onSubmit={handleSubmit}>  
          <TextField  
            autoFocus  
            margin="dense"  
            label="شماره تلفن همراه"  
            type="text"  
            fullWidth  
            variant="outlined"  
            required  
            InputProps={{  
              style: { textAlign: 'right' } 
            }}  
            InputLabelProps={{  
              style: { textAlign: 'right' }  
            }}  
          />  
        </form>  
      </DialogContent>  
      <DialogActions>  
        <Button type="submit" form="login-form" style={{ backgroundColor: '#FF8C00', color: '#FFFFFF' }}>  
          ادامه  
        </Button>  
      </DialogActions>  
    </Dialog>  
  );  
};  

export default LoginModal;