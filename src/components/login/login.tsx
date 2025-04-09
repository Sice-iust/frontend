import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Logo from "./assets/logo.png";
import Logodark from "./assets/logo-dark.png";
import styles from'./login.module.scss';
import { useTheme } from '../theme';
import FirstPage from './firstpage';
import SecondPage from './secondpage';
import ThirdPage from './thirdpage';
import next from 'next';

enum Step {
  PHONE = 'PHONE',
  CODE = 'CODE',
  REGISTER = 'REGISTER',
}
export default function LoginModal({ open, onClose }) {

  const { isDarkMode, toggleDarkMode } = useTheme(); // Get both isDarkMode and toggleDarkMode from context  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<Step>(Step.CODE);
  const [timeLeft, setTimeLeft] = useState(5);
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
    <Dialog className={isDarkMode ? styles.darkLogin : styles.lightLogin}
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
      <DialogTitle className={isDarkMode ? styles.darkLogin : styles.lightLogin} sx={{
    marginBottom: 0,
    paddingBottom:0, // Removes the bottom margin
  }}>
        {step === Step.PHONE ? (
          <IconButton edge="end" color="inherit" onClick={onClose} className={styles.closeButton}>
            <CloseIcon className={styles.closeIcon} />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setStep(Step.PHONE)}
            className={styles.backButton}
          >
            <ChevronLeftIcon className={styles.backIcon} />
          </IconButton>
        )}
        <div className={styles.dialogTitle}>
          <div className={styles.logoContainer}>
            <Image src={isDarkMode ? Logodark : Logo} alt="Nanzi Logo" />
          </div>
          <div className={styles.fullScreenContainer}>
            <h1 className={styles.nanziText}>Nanzi</h1>
          </div>

        </div>
      </DialogTitle>
      {renderContent()}
    </Dialog>
  );
};