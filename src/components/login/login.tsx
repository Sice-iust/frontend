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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileCopyIcon from '@mui/icons-material/FileCopy';  

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';
import Logo from "../../../public/logo.png";
import './login.scss';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
const theme = createTheme({
  direction: 'rtl',
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

enum Step {  
  PHONE = 'PHONE',  
  CODE = 'CODE',  
  REGISTER = 'REGISTER',  
} 
const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>(Step.PHONE);
  const [verificationCode, setVerificationCode] = useState('');
 
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
  const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09');

  const handlePhoneSubmit = () => {
    if (!isPhoneButtonDisabled && !error) {
      console.log('Verification code sent to:', phoneNumber);

      const isRegistered = checkIfUserIsRegistered(phoneNumber); 

      if (isRegistered) {
        setStep(Step.CODE);       } else {
        setStep(Step.REGISTER); 
      }
    }
  };

  const checkIfUserIsRegistered = (phoneNumber: string): boolean => {
   //we have bool item as is_registered, it will be handled when  it  connect  to back
   //to go to page 3 enter odd phone number 
    return parseInt(phoneNumber.slice(-1)) % 2 === 0;
  };

  const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  };


  const handleCodeSubmit = () => {
    console.log('Verification code entered:', verificationCode);
    // const isVerified = true; 
    // if (isVerified) {
    //   const isRegistered = false; 
    //   if (isRegistered) {
    //     console.log('Redirecting to home page...');
    //     onClose();
    //   } else {
    //     setStep(Step.REGISTER);
    //   }
    // } else {
    //   setError('کد تأیید نامعتبر است.');
    // }
  };

  const toPersianDigits = (num: string) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };
 const renderContent = () => {
  switch (step) {
    case Step.PHONE:
      return (
        <>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '26px',
          overflow: 'hidden',
          justifyContent: 'center',

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
          <CloseIcon className='closeIcon' />
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
                    color: error ? 'red' : (isFocused || phoneNumber.length > 0 ? '#4C4343' : 'gray'), 
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
            className={`dialogActionsButton ${isPhoneButtonDisabled ? 'disabled' : ''}`}
            disabled={isPhoneButtonDisabled}
            onClick={handlePhoneSubmit}
          >
            ادامه
          </Button>
        </div>
      </DialogActions>
    </Dialog>
    </>
  );
  case Step.CODE:
      return (
        <>
        <DialogTitle>
        <div className="titleContainer2">
          <h1>
            .کد&nbsp;  تایید &nbsp; به&nbsp;  شماره &nbsp;<span className="underlined">{toPersianDigits(phoneNumber)}&nbsp;</span> ارسال &nbsp; شد
          </h1>
          <h1>
    <span className="editNumber">
    <svg  xmlns="http://www.w3.org/2000/svg"  ><path d="M9 1.99999C9.55228 1.99999 10 2.4477 10 2.99999C10 3.55227 9.55228 3.99999 9 3.99999H3C2.55291 3.99999 2 4.5529 2 4.99999V17.1905C2 17.6376 2.36244 18 2.80952 18H15C15.4471 18 16 17.4471 16 17V11C16 10.4477 16.4477 9.99999 17 9.99999C17.5523 9.99999 18 10.4477 18 11V17C18 18.5516 16.5517 20 15 20H2.80952C1.25787 20 0 18.7421 0 17.1905V4.99999C0 3.44833 1.44834 1.99999 3 1.99999H9ZM8.53637 12.7637L16.9358 4.36431C17.2948 4.0053 17.2948 3.42324 16.9358 3.06424C16.5767 2.70523 15.9947 2.70523 15.6357 3.06424L7.2363 11.4636L6.80294 13.197L8.53637 12.7637ZM18.35 1.65002C19.49 2.79008 19.49 4.63847 18.35 5.77852L9.75473 14.3738C9.62657 14.5019 9.46599 14.5928 9.29015 14.6368L5.67111 15.5416C4.93873 15.7247 4.27533 15.0613 4.45843 14.3289L5.36319 10.7098C5.40715 10.534 5.49807 10.3734 5.62623 10.2453L14.2215 1.65002C15.3615 0.50997 17.2099 0.50997 18.35 1.65002Z"></path></svg>&nbsp;
      اصلاح شماره
    </span>
  </h1>
        </div>
        </DialogTitle>
        <DialogContent>
        <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form id="verification-form" style={{ width: '350px', margin: '0 auto' }}>
            <h4 className="text-center mb-4">کد تأیید خود را وارد کنید</h4>
            <div className="d-flex mb-3">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength={1}
                  pattern="[0-9]"
                  className="form-control"
                  value={verificationCode[index] || ''}
                  onChange={(e) => {
                    const newCode = [...verificationCode];
                    newCode[index] = e.target.value;
                    setVerificationCode(newCode.join(''));
                  }}
                  style={{ margin: '0 4px', textAlign: 'center' }}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-100 btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleCodeSubmit();
              }}
            >
              ورود            </button>
          </form>
        </div>
      </DialogContent>
        </>
      );

    case Step.REGISTER:
      return (
        <>
        <h1> page three</h1>
        </>
      );
      default:
        return null;
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
        justifyContent: 'center',
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
    {step === Step.PHONE ? (
    <IconButton edge="end" color="inherit" onClick={onClose} className="closeButton">
      <CloseIcon className="closeIcon" />
    </IconButton>
  ) : (
    <IconButton
      edge="start"
      color="inherit"
      onClick={() => setStep(Step.PHONE)} 
      className="backButton"
    >
      <ChevronLeftIcon className="backIcon" />
    </IconButton>
  )}
      <div className='dialogTitle'>
        <div className='logoContainer'>
          <img src={Logo} alt="Nanzi Logo" />
        </div>
        <div className='fullScreenContainer'>
          <h1 className='nanziText'>Nanzi</h1>
        </div>
        
      </div>
    </DialogTitle>
    {renderContent()}
  </Dialog>
);
};

export default LoginModal;