import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { DialogActions, TextField, Button, InputAdornment ,DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import styles from './login.module.scss';
import axios from 'axios';

enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function ThirdPage({ open, onClose, isDarkMode, timeLeft, setTimeLeft, setStep, phoneNumber, isFinished, setIsFinished,setIsLoggedIn }) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const[cdError,setCdError]=useState<string | null>(null);
    const[coutnError2,setCountError2]=useState<string | null>(null);

    const [t, sett] = useState(Date.now() + 120000);
    const [userNameError, setuserNameError] = useState<string | null>(null);
    const isVerificationCodeEntered2 = code?.length !== 4 || error || userNameError||coutnError2;

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);

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
 

    const handleSubmit = async() => {
        let phonenumber = p2e(phoneNumber);
        if (phonenumber.startsWith('09')) {
            phonenumber = '+98' + phonenumber.slice(1);
        }
        const new_code=p2e(code);
        console.log(p2e(code));
        console.log(phonenumber);
        axios
            .post("https://nanziback.liara.run/users/signup/", {
                phonenumber: phonenumber,
                username: name,
                otp: new_code
            })
            .then((response) => {
                console.log('Response from the server:', response.data);
                const accessToken = response?.data?.access_token;
                const refershToken=response?.data?.refresh_token;
                localStorage.setItem("token", accessToken);
                localStorage.setItem("rtoken", refershToken);

                if (response.data.message == "SignUp successful") {
                    if (setIsLoggedIn) {
                        setIsLoggedIn(true);
                      }
                    onClose();

                }
                else {
                    setCdError('کد تایید نادرست است .');
                    isVerificationCodeEntered2 == true;

                }

            })
            .catch((err) => {
                console.error('Error occurred during submission:', err);
            });
    };

    const handleCodeChange = (event) => {
        const value = event.target.value;
        setCode(value);
        const new_value=p2e(value);
        if (value.length === 0) {  
            setCdError(''); // Clear the error when the input is empty  
            return;  
        }  
    
        if (!/^\d{1,4}$/.test(new_value)) {  
            setCdError('کد تایید معتبر نیست');  
        } else {  
            setCdError(''); // Clear the error when the input is valid  
        }  
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    const handleResendCode = () => {
        setTimeLeft(120);
        setIsFinished(false);
        setCountError2('');
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
            if(response.data.message=="You can only request 3 OTPs every 10 minutes.")
            {
                setTimeLeft(0);
                setIsFinished(true);
                setCountError2(`.امکان ارسال بیش از ${e2p("3")} پیامک در ${e2p("10")} دقیقه نیست.لطفا صبر و مجددا تلاش کنید`)
            }
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
         <DialogTitle className={isDarkMode ? styles.darkLogin : styles.lightLogin} sx={{mb:0}}>
                <div className={styles.titleContainer3}>
                    <h2>
                        .کد&nbsp;تایید&nbsp;به&nbsp;شماره &nbsp;<span className={styles.underlined}>{e2p(phoneNumber)}</span> ارسال &nbsp;شد
                    </h2>
                    <h1>
                        <span className={styles.editNumber2} onClick={() => setStep(Step.PHONE)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  ><path d="M9 1.99999C9.55228 1.99999 10 2.4477 10 2.99999C10 3.55227 9.55228 3.99999 9 3.99999H3C2.55291 3.99999 2 4.5529 2 4.99999V17.1905C2 17.6376 2.36244 18 2.80952 18H15C15.4471 18 16 17.4471 16 17V11C16 10.4477 16.4477 9.99999 17 9.99999C17.5523 9.99999 18 10.4477 18 11V17C18 18.5516 16.5517 20 15 20H2.80952C1.25787 20 0 18.7421 0 17.1905V4.99999C0 3.44833 1.44834 1.99999 3 1.99999H9ZM8.53637 12.7637L16.9358 4.36431C17.2948 4.0053 17.2948 3.42324 16.9358 3.06424C16.5767 2.70523 15.9947 2.70523 15.6357 3.06424L7.2363 11.4636L6.80294 13.197L8.53637 12.7637ZM18.35 1.65002C19.49 2.79008 19.49 4.63847 18.35 5.77852L9.75473 14.3738C9.62657 14.5019 9.46599 14.5928 9.29015 14.6368L5.67111 15.5416C4.93873 15.7247 4.27533 15.0613 4.45843 14.3289L5.36319 10.7098C5.40715 10.534 5.49807 10.3734 5.62623 10.2453L14.2215 1.65002C15.3615 0.50997 17.2099 0.50997 18.35 1.65002Z"></path></svg>&nbsp;
                            اصلاح شماره
                        </span>
                    </h1>
                </div>
            </DialogTitle>
            <div className={`${styles.usernameInput} ${isDarkMode ? styles.darkLogin : styles.lightLogin}`} >
           
                <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                    <div className={styles.formGroup}>
                        <span className={styles.icon}><CreateOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span>
                        <input
                            type="tel"
                            id="name"
                            placeholder=" "
                            autoComplete="off"
                            required
                            onChange={handleNameChange}
                            className={userNameError ? styles.error : ''}
                        />
                        <label htmlFor="name" className={error ?  styles.error : ''}>نام کاربری</label>
                        {userNameError && <div className={styles.errorMessageSignup}>{userNameError}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <span className={styles.icon}><MarkEmailReadOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span>
                        <input
                            type="tel"
                            id="code"
                            placeholder=" "
                            autoComplete="off"
                            required
                            value={e2p(code)}
                            onChange={handleCodeChange}
                            className={cdError ?  styles.error : ''}
                        />
                        <label htmlFor="code" className={cdError ?  styles.error : ''}>کد تایید  </label>
                        {cdError && <div className={ styles.errorMessageSignup}>{cdError}</div>}
                    </div>

                    <form id="verification-form" style={{ width: '350px', margin: '0 auto' }}>
                        <div className={styles.countdownContainer}>
                        {coutnError2 && <div className={ styles.errorMessageSignup}>{coutnError2}</div>}

                            {!isFinished ? (
                                <div className={styles.flexCenter}>
                                     <h2 >{e2p(formatTime(timeLeft))} </h2>
                                    <span className={styles.waitTitle}>&nbsp;شکیبا باشید&nbsp;</span>
                                   
                                </div>
                            ) : (
                                <div className={styles.resendMessage}>
                                    <h1>کد تأیید را دریافت نکردید؟ &nbsp; <span className={styles.resend} onClick={handleResendCode}> ارسال دوباره</span></h1>

                                </div>
                            )}
                        </div>
                        <div className={styles.buttonWrapper}>
                            <button
                                type="submit"
                                className={`${styles.btnPrimary2} ${isVerificationCodeEntered2 ? styles.disabled : ''}`}//${isPhoneButtonDisabled ? 'disabled' : ''}
                                disabled={isVerificationCodeEntered2}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
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