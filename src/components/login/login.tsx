import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useState } from 'react';  

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import PhoneIcon from '@mui/icons-material/Phone'; // Import the icon
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'; // Import outlined icon
import Logo from "../../../public/logo.png";
import  './login.scss'; // Import the SCSS file

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
const theme = createTheme({
  direction: 'rtl', // Set the direction to RTL
});
function Rtl(props) {
  return <CacheProvider value={rtlCache}>{props.children}</CacheProvider>;
}
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');  
  const [isFocused, setIsFocused] = useState(false); // Track if the input is focused  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const handleInputChange = (event) => {  
    setPhoneNumber(event.target.value);  
  }; 
  const handleFocus = () => {  
    setIsFocused(true);  
  };  

  const handleBlur = () => {  
    if (phoneNumber === '') {  
      setIsFocused(false);  
    }  
  }; 
  return (
<Dialog  
  open={open}  
  onClose={onClose}  
  maxWidth="xs"  
  fullWidth  
  sx={{  
    '& .MuiDialog-paper': {  
      borderRadius: '26px',  
      overflow: 'hidden', 
      justifyContent:'center',
      // alignItems:'center',
    },  
    '& .MuiDialogContent-root': {  
      paddingBottom: 0, // Adjust padding if needed  
      overflowY: 'hidden', // Remove vertical scroll  
    },  
    '& .MuiDialogActions-root': {  
      padding: '16px', // Adjust padding for actions  
    },  
  }}  
>  
  {/* Rest of your code */}  
      <DialogTitle>
      <IconButton edge="end" color="inherit" onClick={onClose} className='closeButton'>
            <CloseIcon className='closeIcon'  />
          </IconButton>
        <div className='dialogTitle'>
 
          <div className='logoContainer'>
            <img src={Logo} alt="Nanzi Logo" />
          </div>
          <div className='fullScreenContainer'>
          <h1 className='nanziText'>Nanzi</h1>
        </div>
        <div className="titleContainer">  
  <h1>    ورود <span className="non-bold">یا</span> عضویت  
  </h1>  
</div>  
        </div>
        
       
      </DialogTitle>
      <CacheProvider value={cacheRtl}>  
  <ThemeProvider theme={theme}>  
    <div  
      dir="rtl"  
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}  
    >  
      <form id="login-form" onSubmit={handleSubmit} style={{ width: '350px', margin: '0 auto' }}>  
      <TextField
  autoFocus
  margin="dense"
  label="شماره تلفن همراه"
  type="text"
  fullWidth
  variant="outlined"
  
  value={phoneNumber} // Controlled input value
  onChange={(e) => setPhoneNumber(e.target.value)} // Handle input change
  InputProps={{
    startAdornment: (
      <InputAdornment position="start" style={{ direction: 'ltr' }}>
        <PhoneOutlined style={{ color: 'black', direction: 'ltr' }} /> {/* Outlined phone icon */}      </InputAdornment>
    ),
    style: { 
      color: 'black', 
      textAlign: 'right', // Align text to the right
      direction: 'ltr', // Ensure RTL text direction
    },
  }}
  InputLabelProps={{
    shrink: isFocused || phoneNumber.length > 0, // Float label on focus or content
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      fontFamily: 'IRANSansMobile',
      fontSize: '18px',
      alignItems:'center',
      color: '#4C4343',
      height: '50px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4C4343', // Border color
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4C4343', // Border color on hover
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4C4343', // Border color when focused
      },
      '&.Mui-focused': {
        color: '#4C4343', // Text color when focused
      },
    },
    '& .MuiInputBase-root': {
      '&.Mui-focused': {
        color: '#4C4343', // Text color on focus
      },
      '&:focus': {
        boxShadow: 'none', // Disable the blue focus ring
      },
    },
    '& .MuiInputBase-input:focus': {
      color: '#4C4343', // Ensure text color is black on focus
    },
    '& .MuiInputLabel-outlined': {
      fontFamily: 'IRANSansMobile',
      fontSize: '18px',
      justifyContent:'center',
      alignItems:'center',
      color: phoneNumber ? '#4C4343' : 'gray', // Label color based on input
    },
    '& .MuiFormLabel-asterisk': {
      color: 'red', // Red asterisk for required field
    },
    '& .MuiFormLabel': {
      color: '#4C4343', // Label color
    },
  }}
/>
          </form> 
    </div>  
  </ThemeProvider>  
</CacheProvider>  
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