import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useState } from 'react';  

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined'; 
import Logo from "../../../public/logo.png";
import  './login.scss';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
const theme = createTheme({
  direction: 'rtl', 
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
  const [isFocused, setIsFocused] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const handleInputChange = (event) => {  
    const value = event.target.value;  
    setPhoneNumber(value);  
  
    if (value.length < 2) {  
      setError(null); 
    } else if (!value.startsWith("09") && value.length >= 2 || value.length > 11 || value.length === 11 && !/^09\d{9}$/.test(value)) {  
      setError('شماره همراه معتبر نیست');
    } else {  
      setError(null); 
    }  
  };    
  const handleFocus = () => {  
    setIsFocused(true);  
  };  

  const handleBlur = () => {  
    if (phoneNumber === '') {  
      setIsFocused(false);  
    }  
  }; 

  const isButtonDisabled = phoneNumber.length !== 11; // Check if phone number has 11 digits  

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
     
    },  
    '& .MuiDialogContent-root': {  
      paddingBottom: 0, 
      overflowY: 'hidden',
    },  
    '& .MuiDialogActions-root': {  
      padding: '16px',
    },  
  }}  
>  
  
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
          <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  
            <form id="login-form" onSubmit={handleSubmit} style={{ width: '350px', margin: '0 auto' }}>  
              <TextField  
                autoFocus  
                margin="dense"  
                label={  
                  <span>  
                    شماره تلفن همراه  
                    {(isFocused || phoneNumber.length > 0) && (  
                      <span style={{ color: 'red' }}> *</span>  
                    )}  
                  </span>  
                }  
                type="text"  
                fullWidth  
                variant="outlined"  
                value={phoneNumber}  
                onChange={handleInputChange}  
                onFocus={handleFocus}  
                onBlur={handleBlur}  
                error={!!error} 
                helperText={error} 
                InputProps={{  
                  startAdornment: (  
                    <InputAdornment position="start">  
                      <PhoneOutlined style={{ color: 'black' }} />  
                    </InputAdornment>  
                  ),  
                  style: {  
                    color: 'black',  
                    textAlign: 'right',  
                    direction: 'ltr',  
                  },  
                }}  
                InputLabelProps={{  
                  shrink: isFocused || phoneNumber.length > 0,  
                  style: {  
                    color: error ? 'red' : (isFocused || phoneNumber.length > 0 ? '#4C4343' : 'gray'), // Change label color based on error  
                  },  
                }}  
                sx={{  
                  '& .MuiOutlinedInput-root': {  
                    borderRadius: '15px',  
                    fontFamily: 'IRANSansMobile',  
                    fontSize: '18px',  
                    height: '50px',  
                    '& .MuiOutlinedInput-notchedOutline': {  
                      borderColor: error ? 'red' : '#4C4343',
                    },  
                    '&:hover .MuiOutlinedInput-notchedOutline': {  
                      borderColor: error ? 'red' : '#4C4343', 
                    },  
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {  
                      borderColor: error ? 'red' : '#4C4343', 
                    },  
                    '&.Mui-focused': {  
                      color: '#4C4343',
                    },  
                  },  
                  '& .MuiInputBase-root': {  
                    '&.Mui-focused': {  
                      color: '#4C4343',
                    },  
                    '&:focus': {  
                      boxShadow: 'none', 
                    },  
                  },  
                  '& .MuiInputBase-input:focus': {  
                    color: '#4C4343', 
                  },  
                  '& .MuiInputLabel-outlined': {  
                    fontFamily: 'IRANSansMobile',  
                    fontSize: '18px',  
                    justifyContent: 'center',  
                    alignItems: 'center',  
                    color: phoneNumber ? '#4C4343' : 'gray',   
                  },  
                  '& .MuiFormLabel-asterisk': {  
                    color: 'red', 
                  },  
                  '& .MuiFormLabel': {  
                    color: '#4C4343',
                  },  
                }}  
                dir="rtl" 
              />  
            </form>  
          </div>  
        </ThemeProvider>  
      </CacheProvider>
                    
      <DialogActions className="dialogActions">  
  <div className="buttonWrapper"> 
    <Button  
      type="submit"  
      form="login-form"  
      className={`dialogActionsButton ${isButtonDisabled ? 'disabled' : ''}`} 
            disabled={isButtonDisabled} 
    >  
      ادامه  
    </Button>  
  </div>  
</DialogActions>
    </Dialog>
  );
};

export default LoginModal;