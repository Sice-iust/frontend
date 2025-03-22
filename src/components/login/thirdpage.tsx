import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { DialogActions, TextField, Button, InputAdornment } from '@mui/material';
import { useState } from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import './login.scss';
import axios from 'axios';

enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function ThirdPage({ open, onClose, isDarkMode, timeLeft, setTimeLeft, setStep, phoneNumber ,isFinished,setIsFinished}) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            const response = await axios.post('https://nanziback.liara.run/users/sendotp/',
                { name,code },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Response from the server:', response.data);

        } catch (error) {
            console.error('Error occurred during submission:', error);
        }
    };
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        //set error
    };
    const handleCodeChange = (event) => {
        const value = event.target.value;
        setCode(value);
        //set error
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    const handleResendCode = () => {
        setTimeLeft(120);
        setIsFinished(false);
        handlePhoneSubmit();
    };
    const handlePhoneSubmit = async () => {
        console.log('Verification code sent to:', phoneNumber);
        let phonenumber = p2e(phoneNumber);
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
    };
    return (
        <>
            <div className={`phone-input ${isDarkMode ? 'dark-login' : 'light-login'}`} >
                <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                    <div className="form-group">
                        <span className="icon"><CreateOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span>
                        <input
                            type="tel"
                            id="name"
                            placeholder=" "
                            autoComplete="off"
                            required
                            onChange={handleNameChange}
                            className={error ? 'error' : ''}
                        />
                        <label htmlFor="name" className={error ? 'error' : ''}>نام کاربری</label>
                        {error && <div className="error-message-login">{error}</div>}
                    </div>
                    <div className="form-group">
                        <span className="icon"><MarkEmailReadOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span>
                        <input
                            type="tel"
                            id="code"
                            placeholder=" "
                            autoComplete="off"
                            required
                            onChange={handleCodeChange}
                            className={error ? 'error' : ''}
                        />
                        <label htmlFor="code" className={error ? 'error' : ''}>کد تایید</label>
                        {error && <div className="error-message-login">{error}</div>}
                    </div>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <Button sx={{ color: '#34A853' }}> اصلاح شماره<DrawOutlinedIcon sx={{ mr: 0.5 }} /> </Button>
                    </div>
                    <div className="countdown-container" style={{ display: 'flex' , justifyContent: 'center'}}>
                        {!isFinished ? (
                            <div className="flex-center">
                                <span className='wait-title'>&nbsp;شکیبا باشید&nbsp;</span>
                                <h2 >{e2p(formatTime(timeLeft))} </h2>
                            </div>
                        ) : (
                            <div className='resend-message'>
                                <h1>کد تأیید را دریافت نکردید؟ &nbsp; <span className='resend' onClick={handleResendCode}> ارسال دوباره</span></h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DialogActions className="dialogActions">
                <div className="buttonWrapper">
                    <Button
                        type="submit"
                        form="login-form"
                        className={`dialogActionsButton `}//${isPhoneButtonDisabled ? 'disabled' : ''}
                        //disabled={isPhoneButtonDisabled}
                        onClick={handleSubmit}
                    >
                        عضویت
                    </Button>
                </div>
            </DialogActions>
        </>
    );
};