import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { DialogActions, TextField, Button, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
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

export default function ThirdPage({ open, onClose, isDarkMode, timeLeft, setTimeLeft, setStep, phoneNumber, isFinished, setIsFinished }) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [t, sett] = useState(Date.now() + 120000);
    // const [isFinished, setIsFinished] = useState(false);
    const [userNameError, setuserNameError] = useState<string | null>(null);
    const isVerificationCodeEntered2 = code?.length !== 4 || error || userNameError;

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);

        const persianRegex = /^[\u0600-\u06FF\s]+$/;
        const numberRegex = /[\d\u06F0-\u06F9]/;
        if (value.length === 0) {
            setuserNameError('');
            return;
        }

        if (numberRegex.test(value)) {
            if (value.length < 3) {
                setuserNameError(`طول نام کاربری حداقل ${e2p("3")} کاراکتر است و  شامل عدد نباید باشد.`);
            } else {
                setuserNameError(`نام کاربری نمیتواند شامل عدد باشد.`);
            }
        }
        else if (!persianRegex.test(value)) {
            if (value.length < 3) {
                setuserNameError(`نام کاربری حتما باید فارسی و حداقل شامل ${e2p("3")} کاراکتر باشد.`);
            } else {
                setuserNameError(`نام کاربری حتما باید فارسی باشد.`);
            }
        }
        else if (value.length < 3) {
            setuserNameError(`طول نام کاربری حداقل باید ${e2p("3")} کاراکتر باشد.`);
        }
        else {
            setuserNameError('');
        }
    };

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
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            //route to first page
            //onClose()
        } else {
            return <span>{e2p(zeroPad(minutes))} : {e2p(zeroPad(seconds))}</span>;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        let phonenumber = p2e(phoneNumber);
        if (phonenumber.startsWith('09')) {
            phonenumber = '+98' + phonenumber.slice(1);
        }
        axios
            .post("https://nanziback.liara.run/users/signup/", {
                phonenumber: phonenumber,
                username: name,
                otp: code
            })
            .then((response) => {
                console.log('Response from the server:', response.data);
            })
            .catch((err) => {
                console.error('Error occurred during submission:', err);
            });
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
                            className={userNameError ? 'error' : ''}
                        />
                        <label htmlFor="name" className={error ? 'error' : ''}>نام کاربری</label>
                        {userNameError && <div className="error-message-login">{userNameError}</div>}
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

                    <form id="verification-form" style={{ width: '350px', margin: '0 auto' }}>
                        <span className="editNumber2" onClick={() => setStep(Step.PHONE)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  ><path d="M9 1.99999C9.55228 1.99999 10 2.4477 10 2.99999C10 3.55227 9.55228 3.99999 9 3.99999H3C2.55291 3.99999 2 4.5529 2 4.99999V17.1905C2 17.6376 2.36244 18 2.80952 18H15C15.4471 18 16 17.4471 16 17V11C16 10.4477 16.4477 9.99999 17 9.99999C17.5523 9.99999 18 10.4477 18 11V17C18 18.5516 16.5517 20 15 20H2.80952C1.25787 20 0 18.7421 0 17.1905V4.99999C0 3.44833 1.44834 1.99999 3 1.99999H9ZM8.53637 12.7637L16.9358 4.36431C17.2948 4.0053 17.2948 3.42324 16.9358 3.06424C16.5767 2.70523 15.9947 2.70523 15.6357 3.06424L7.2363 11.4636L6.80294 13.197L8.53637 12.7637ZM18.35 1.65002C19.49 2.79008 19.49 4.63847 18.35 5.77852L9.75473 14.3738C9.62657 14.5019 9.46599 14.5928 9.29015 14.6368L5.67111 15.5416C4.93873 15.7247 4.27533 15.0613 4.45843 14.3289L5.36319 10.7098C5.40715 10.534 5.49807 10.3734 5.62623 10.2453L14.2215 1.65002C15.3615 0.50997 17.2099 0.50997 18.35 1.65002Z"></path></svg>&nbsp;
                            اصلاح شماره
                        </span>
                        <div className="countdown-container">
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
                        <div className="buttonWrapper">
                            <button
                                type="submit"
                                className={`btn-primary ${isVerificationCodeEntered2 ? 'disabled' : ''}`}//${isPhoneButtonDisabled ? 'disabled' : ''}
                                disabled={isVerificationCodeEntered2}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit
                                }}
                            >
                                عضویت            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    );
};