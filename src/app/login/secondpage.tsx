import { DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useRef, useState ,useEffect} from "react";
import styles from "./login.module.scss";

enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function SecondPage({ isDarkMode, phoneNumber, setStep, timeLeft, setTimeLeft, onClose ,isFinished,setIsFinished,setIsLoggedIn}) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [codeError, setCodeError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(null));
    const[coutnError,setCountError]=useState<string | null>(null);
    
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

    const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09');
    const isVerificationCodeEntered = verificationCode.join('').length !== 4 || codeError ||coutnError;

    const handleResendCode = () => {
        setTimeLeft(120);
        setIsFinished(false);
        handlePhoneSubmit();
        setCountError('');
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
                setCodeError('');

            } else if (index > 0) {
                newCode[index - 1] = '';
                inputRefs.current[index - 1]?.focus();
            }
            setVerificationCode(newCode);
        }
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    const handlePhoneSubmit = async () => {
        if (!isPhoneButtonDisabled && !error) {
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
                if(response.data.message=="You can only request 3 OTPs every 10 minutes.")
                    {
                        setTimeLeft(0);
                        setIsFinished(true);
                        setCountError(`.امکان ارسال بیش از ${e2p("3")} پیامک در ${e2p("10")} دقیقه نیست.لطفا صبر و مجددا تلاش کنید`)
                    }
                else{
                if (isRegistered) {
                    setStep(Step.CODE);
                } else {
                    setStep(Step.REGISTER);
                }}
            } catch (error) {
                console.error('Error occurred during submission:', error);
            }
        }
    };

    const handleCodeSubmit = async () => {
        console.log('Verification code entered:', verificationCode.join(''));
        let verification = verificationCode.join('')
        verification = p2e(verification)

        console.log('Verification code entered:', verification);

        if (!isPhoneButtonDisabled && !error) {
            console.log('Verification code sent to:', phoneNumber);
            let phonenumber = p2e(phoneNumber);
            if (phonenumber.startsWith('09')) {
                phonenumber = '+98' + phonenumber.slice(1);
            }
            console.log('Verification code sent to:', phonenumber);

            try {
                const response = await axios.post('https://nanziback.liara.run/users/login/',
                    {
                        phonenumber: phonenumber,
                        otp: verification,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Response from the server:', response.data);
                if (response.data.message == "Login successful") {
                    const accessToken = response?.data?.access_token;
                    const refershToken=response?.data?.refresh_token;
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("rtoken", refershToken);
                    if (setIsLoggedIn) {
                        setIsLoggedIn(true);
                      }
                    onClose();

                }
                
                else {
                    setCodeError('.کد تأیید نامعتبر است');
                    isVerificationCodeEntered == true;

                }


            } catch (error) {
                console.error('Error occurred during submission:', error);
            }
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
    return (
        <>
            <DialogTitle className={isDarkMode ? styles.darkLogin : styles.lightLogin}>
                <div className={styles.titleContainer2}>
                    <h1>
                        .کد&nbsp;تایید&nbsp;به&nbsp;شماره &nbsp;<span className={styles.underlined}>{e2p(phoneNumber)}</span> ارسال &nbsp;شد
                    </h1>
                    <h1>
                        <span className={styles.editNumber} onClick={() => setStep(Step.PHONE)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  ><path d="M9 1.99999C9.55228 1.99999 10 2.4477 10 2.99999C10 3.55227 9.55228 3.99999 9 3.99999H3C2.55291 3.99999 2 4.5529 2 4.99999V17.1905C2 17.6376 2.36244 18 2.80952 18H15C15.4471 18 16 17.4471 16 17V11C16 10.4477 16.4477 9.99999 17 9.99999C17.5523 9.99999 18 10.4477 18 11V17C18 18.5516 16.5517 20 15 20H2.80952C1.25787 20 0 18.7421 0 17.1905V4.99999C0 3.44833 1.44834 1.99999 3 1.99999H9ZM8.53637 12.7637L16.9358 4.36431C17.2948 4.0053 17.2948 3.42324 16.9358 3.06424C16.5767 2.70523 15.9947 2.70523 15.6357 3.06424L7.2363 11.4636L6.80294 13.197L8.53637 12.7637ZM18.35 1.65002C19.49 2.79008 19.49 4.63847 18.35 5.77852L9.75473 14.3738C9.62657 14.5019 9.46599 14.5928 9.29015 14.6368L5.67111 15.5416C4.93873 15.7247 4.27533 15.0613 4.45843 14.3289L5.36319 10.7098C5.40715 10.534 5.49807 10.3734 5.62623 10.2453L14.2215 1.65002C15.3615 0.50997 17.2099 0.50997 18.35 1.65002Z"></path></svg>&nbsp;
                            اصلاح شماره
                        </span>
                    </h1>
                </div>
            </DialogTitle>
            <DialogContent className={isDarkMode ? styles.darkLogin : styles.lightLogin} >
                <div dir="ltr" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form id="verificationForm" className={styles.verificationForm}>
                        <div className={styles.dFlex } >
                            {[...Array(4)].map((_, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    maxLength={1}
                                    pattern="[0-9]"
                                    className={`${styles.formControl}  ${codeError ? styles.errorVerify : ''}`}                                    
                                    value={e2p(verificationCode[index] || '')}

                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    style={{ margin: '0 4px', textAlign: 'center', direction: 'rtl' }}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                />
                            ))}
                        </div> {codeError && <div className={styles.errorMessageCode}>{codeError}</div>} {/* Error message shown here */}

                        <div className={styles.countdownContainer}>
                        {coutnError && <div className={ styles.errorMessageTooManyReq}>{coutnError}</div>}

                            {!isFinished ? (
                                <div className={styles.flexCenter}>

                                    <span className={styles.waitTitle}>&nbsp;شکیبا باشید&nbsp;</span>
                                    <h2 >{e2p(formatTime(timeLeft))} </h2>
                                </div>
                            ) : (
                                <div className={styles.resendMessage}>
                                    <h1>کد تأیید را دریافت نکردید؟ &nbsp; <span className={styles.resend} onClick={handleResendCode}> ارسال دوباره</span></h1>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`${styles.btnPrimary}  ${isVerificationCodeEntered ? styles.disabled : ''}`}
                            disabled={!!isVerificationCodeEntered}
                            onClick={(e) => {
                                e.preventDefault();
                                handleCodeSubmit();
                            }}
                        >
                            ورود
                        </button>
                    </form>
                </div>
            </DialogContent>
        </>
    );
}