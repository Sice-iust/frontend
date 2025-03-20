import React from 'react';
import axios from 'axios';  
import { useState,useEffect,useRef  } from 'react';

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

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
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isFinished, setIsFinished] = useState(false);  
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(null));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {

    const value = event.target.value;
    const new_Value = toEnglishDigits(value);  
   
    setPhoneNumber(new_Value);

    if (new_Value.length < 2) {
      setError(null);
    } else if (!new_Value.startsWith("09") && new_Value.length >= 2 || value.length > 11 || new_Value.length === 11 && !/^09\d{9}$/.test(new_Value)) {
      setError('شماره همراه معتبر نیست');
    } else {
      setError(null);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (index < 3 && value !== '') {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newCode = [...verificationCode];
      if (newCode[index] !== '') {
        newCode[index] = '';
      } else if (index > 0) {
        newCode[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      setVerificationCode(newCode);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleResendCode = () => {  
    setTimeLeft(120);
    setIsFinished(false); 
  };  

  const handleBlur = () => {
    if (phoneNumber === '') {
      setIsFocused(false);
    }
  };

  
  const handleCodeSubmit = async() => {
    console.log('Verification code entered:', verificationCode.join(''));
    let verification=verificationCode.join('')
    verification=toEnglishDigits(verification)
   
    console.log('Verification code entered:',verification);

    if (!isPhoneButtonDisabled && !error) {  
      console.log('Verification code sent to:', phoneNumber);  
      let phonenumber=toEnglishDigits(phoneNumber);
      if (phonenumber.startsWith('09')) {  
        phonenumber = '+98' + phonenumber.slice(1); 
      } 
      console.log('Verification code sent to:', phonenumber);  

      try {  
        const response = await axios.post('https://nanziback.liara.run/users/login/',   
          { phonenumber:phonenumber,
            otp:verification ,
          },   
          {  
            headers: {  
              'Content-Type': 'application/json',  
            },  
          }  
        );  
  
        console.log('Response from the server:', response.data);  
        if (response.data.message=="Login succesful")
        {
           onClose();

        }
        else{
            setError('کد تأیید نامعتبر است.');

        }
  
        // const isRegistered = response.data.is_registered; 
        
        // if (isRegistered) {  
        //   setStep(Step.CODE);  
        // } else {  
        //   setStep(Step.REGISTER);  
        // }  
      } catch (error) {  
        console.error('Error occurred during submission:', error);  
      }  
    }  
  };

  const handlePhoneSubmit = async () => {  
    if (!isPhoneButtonDisabled && !error) {  
      console.log('Verification code sent to:', phoneNumber);  
      let phonenumber=toEnglishDigits(phoneNumber);
      if (phonenumber.startsWith('09')) {  
        phonenumber = '+98' + phonenumber.slice(1); 
      } 
      console.log('Verification code sent to:', phonenumber);  

      try {  
        const response = await axios.post('https://nanziback.liara.run/users/sendotp/',   
          { phonenumber },   
          {  
            headers: {  
              'Content-Type': 'application/json',  
            },  
          }  
        );  
  
        console.log('Response from the server:', response.data);  
  
        const isRegistered = response.data.is_registered; 
        
        if (isRegistered) {  
          setStep(Step.CODE);  
        } else {  
          setStep(Step.REGISTER);  
        }  
      } catch (error) {  
        console.error('Error occurred during submission:', error);  
      }  
    }  
  }; 


  useEffect(() => {
    if (step === Step.PHONE) {
      setVerificationCode(Array(4).fill('')); 
    }
  }, [step]);

  useEffect(() => {  
    if (step === Step.CODE) {  
      setTimeLeft(120); 
      setIsFinished(false); 
    }  
  }, [step]);  

  useEffect(() => {  
    let timerId: ReturnType<typeof setInterval>;  

    if (timeLeft <= 0) {  
      setIsFinished(true);  
    } else {  
      timerId = setInterval(() => {  
        setTimeLeft((prevTime) => prevTime - 1);  
      }, 1000);  
    }  

    return () => clearInterval(timerId); 
  }, [timeLeft]); 



  const formatTime = (seconds: number) => {  
    const minutes = Math.floor(seconds / 60);  
    const secs = seconds % 60;  
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;  
  };  

  const checkIfUserIsRegistered = (phoneNumber: string): boolean => {
   //we have bool item as is_registered, it will be handled when  it  connect  to back
   //to go to page 3 enter odd phone number 
    return parseInt(phoneNumber.slice(-1)) % 2 === 0;
  };

 
  const toPersianDigits = (num: string) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };
  
  const toEnglishDigits = (num:string) => {  
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return num.split('').map(char => {  
      const index = persianDigits.indexOf(char);  
      return index !== -1 ? englishDigits[index] : char; 
    }).join('');  
  };  

  const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09');
  const isVerificationCodeEntered=verificationCode.join('').length !== 4;;

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
                    {(isFocused || phoneNumber.length > 0) && (
                      <span style={{ color: 'red' }}> *</span>
                    )}
                    شماره تلفن همراه
                    
                  </span>
                }
                type="text"
                fullWidth
                variant="outlined"
                value={toPersianDigits(phoneNumber)}
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
                    fontFamily: "Calibri",
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
                    fontFamily: "Calibri",
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
                dir="ltr"
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
    <span className="editNumber" onClick={() => setStep(Step.PHONE)}>
    <svg  xmlns="http://www.w3.org/2000/svg"  ><path d="M9 1.99999C9.55228 1.99999 10 2.4477 10 2.99999C10 3.55227 9.55228 3.99999 9 3.99999H3C2.55291 3.99999 2 4.5529 2 4.99999V17.1905C2 17.6376 2.36244 18 2.80952 18H15C15.4471 18 16 17.4471 16 17V11C16 10.4477 16.4477 9.99999 17 9.99999C17.5523 9.99999 18 10.4477 18 11V17C18 18.5516 16.5517 20 15 20H2.80952C1.25787 20 0 18.7421 0 17.1905V4.99999C0 3.44833 1.44834 1.99999 3 1.99999H9ZM8.53637 12.7637L16.9358 4.36431C17.2948 4.0053 17.2948 3.42324 16.9358 3.06424C16.5767 2.70523 15.9947 2.70523 15.6357 3.06424L7.2363 11.4636L6.80294 13.197L8.53637 12.7637ZM18.35 1.65002C19.49 2.79008 19.49 4.63847 18.35 5.77852L9.75473 14.3738C9.62657 14.5019 9.46599 14.5928 9.29015 14.6368L5.67111 15.5416C4.93873 15.7247 4.27533 15.0613 4.45843 14.3289L5.36319 10.7098C5.40715 10.534 5.49807 10.3734 5.62623 10.2453L14.2215 1.65002C15.3615 0.50997 17.2099 0.50997 18.35 1.65002Z"></path></svg>&nbsp;
      اصلاح شماره
    </span>
  </h1>
        </div>
        </DialogTitle>
        <DialogContent>
        <div dir="ltr" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form id="verification-form" style={{ width: '350px', margin: '0 auto' }}>
          <div className="d-flex mb-3">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          type="tel"
          maxLength={1}
          pattern="[0-9]"
          className="form-control"
          value={toPersianDigits(verificationCode[index] || '')}

          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={{ margin: '0 4px', textAlign: 'center', direction: 'rtl' }}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
            <div className="countdown-container">  
              {!isFinished ? (  
                <div className="flex-center">  
                 <span className='wait-title'>&nbsp;شکیبا باشید&nbsp;</span>  
                 <h2 >{toPersianDigits(formatTime(timeLeft))} </h2>
                 
                    
                </div>  
              ) : (  
                <div className='resend-message'>   
                  <h1>کد تأیید را دریافت نکردید؟</h1>   
                  <h3  onClick={handleResendCode}>ارسال دوباره</h3>  
                </div> 
              )}  
            </div>  
            <button
              type="submit"
              className={`btn-primary ${isVerificationCodeEntered ? 'disabled' : ''}`}
              disabled={isVerificationCodeEntered}
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