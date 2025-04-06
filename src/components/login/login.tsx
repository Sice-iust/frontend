import React from 'react';
import { useState, useEffect } from 'react';

import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Logo from "./assets/logo.png";
import Logodark from "./assets/logo-dark.png";
import './login.scss';
import { useTheme } from '../theme';
import FirstPage from './firstpage';
import SecondPage from './secondpage';
import ThirdPage from './thirdpage';

enum Step {
  PHONE = 'PHONE',
  CODE = 'CODE',
  REGISTER = 'REGISTER',
}
export default function LoginModal({ open, onClose }) {

  const { isDarkMode, toggleDarkMode } = useTheme(); // Get both isDarkMode and toggleDarkMode from context  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<Step>(Step.REGISTER);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isFinished, setIsFinished] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(null));
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    if (step === Step.PHONE) {
      setVerificationCode(Array(4).fill(''));
      setCodeError('');
    } else if (step === Step.CODE) {
      setTimeLeft(120);
      setIsFinished(false);
      setCodeError('');
    }
  }, [step]);

 

  const renderContent = () => {
    switch (step) {
      case Step.PHONE:
        return (<FirstPage isDarkMode={isDarkMode} setStep={setStep} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />);
      case Step.CODE:
        return (<SecondPage 
          isDarkMode={isDarkMode}
          phoneNumber={phoneNumber}
          setStep={setStep}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onClose={onClose} 
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          />);
      case Step.REGISTER:
        return (
          <ThirdPage 
          open={open} 
          onClose={onClose} 
          isDarkMode={isDarkMode} 
          timeLeft={timeLeft} 
          setTimeLeft={setTimeLeft} 
          setStep={setStep} 
          phoneNumber={phoneNumber}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Dialog className={isDarkMode ? 'dark-login' : 'light-login'}
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '26px',
          overflow: 'hidden',
          backgroundColor: isDarkMode ? '#191919' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
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
      <DialogTitle className={isDarkMode ? 'dark-login' : 'light-login'}>
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
            <img src={isDarkMode ? Logodark : Logo} alt="Nanzi Logo" />
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