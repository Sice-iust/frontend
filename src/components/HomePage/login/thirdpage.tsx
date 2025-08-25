import React from 'react';
import { useState, useEffect } from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import styles from './login.module.scss';
import axios from 'axios';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function ThirdPage({
    onClose,
    isDarkMode,
    timeLeft,
    setTimeLeft,
    setStep,
    phoneNumber,
    isFinished,
    setIsFinished,
    setIsLoggedIn
}) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [cdError, setCdError] = useState<string | null>(null);
    const [coutnError2, setCountError2] = useState<string | null>(null);

    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || name.length > 0;

    const [isFocusedcode, setIsFocusedcode] = useState(false);
    const shouldFloatcode = isFocusedcode || code.length > 0;

    const [userNameError, setuserNameError] = useState<string | null>(null);
    const isVerificationCodeEntered2 = code?.length !== 4 || error || userNameError || coutnError2;

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


    const handleSubmit = async () => {
        let phonenumber = p2e(phoneNumber);
        if (phonenumber.startsWith('09')) {
            phonenumber = '+98' + phonenumber.slice(1);
        }
        const new_code = p2e(code);
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
                const refershToken = response?.data?.refresh_token;
                localStorage.setItem("token", accessToken);
                localStorage.setItem("rtoken", refershToken);

                if (response.data.message == "SignUp successful") {
                    if (setIsLoggedIn) {
                        setIsLoggedIn(true);
                    }
                    onClose();

                }
                else {
                    setCdError('کد تایید نادرست است');
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
        const new_value = p2e(value);
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
            if (response.data.message == "You can only request 3 OTPs every 10 minutes.") {
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
            <div dir='rtl' className="mx-5 md:mx-17 my-5 ">
                <h2 className="mb-3 text-center">
                    کد تایید به شماره<span className={styles.underlined}>{e2p(phoneNumber)}</span> ارسال شد.
                </h2>
                <h1 className="mx-2">
                    <span className={styles.editNumber2} onClick={() => setStep(Step.PHONE)}>
                        <BorderColorOutlinedIcon />
                        اصلاح شماره
                    </span>
                </h1>
            </div>
            <div className="mx-5 md:mx-20">
                <div>
                    <div className=" relative border rounded-lg p-2 mb-4">
                        <CreateOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} className="absolute" />
                        <input
                            dir="rtl"
                            type="name"
                            id="name"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            autoComplete="off"
                            required
                            onChange={handleNameChange}
                            className="w-full outline-none"
                        />
                        <label
                        htmlFor="name"
                        className={`absolute right-3 transition-all duration-200 
                            ${shouldFloat 
                                ? 'text-xs -top-2 bg-white px-1' 
                                : 'top-2.5 text-sm'} text-gray-500`}
                    >
                        {shouldFloat && <span className="text-red-500 ml-1">*</span>}

                         نام کاربری
                        
                    </label>
                    </div>
                    {userNameError && <div className={styles.errorMessageSignup}>{userNameError}</div>}
                    <div className="relative border rounded-lg p-2">
                        <MarkEmailReadOutlinedIcon style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} className="absolute" />
                        <input
                            dir="rtl"
                            id="code"
                            onFocus={() => setIsFocusedcode(true)}
                            onBlur={() => setIsFocusedcode(false)}
                            autoComplete="off"
                            required
                            value={e2p(code)}
                            onChange={handleCodeChange}
                            className="w-full outline-none"
                        />
                         <label
                        htmlFor="code"
                        className={`absolute right-3 transition-all duration-200 
                            ${shouldFloatcode
                                ? 'text-xs -top-2 bg-white px-1' 
                                : 'top-2.5 text-sm'} text-gray-500`}
                    >
                        {shouldFloatcode && <span className="text-red-500 ml-1">*</span>}

                         کدتایید 
                        
                    </label>
                    </div>
                    {cdError && <div className={styles.errorMessageSignup}>{cdError}</div>}
                    {coutnError2 && <div className={styles.errorMessageSignup}>{coutnError2}</div>}

                    <div className='flex justify-center my-5'>
                        {!isFinished ? (
                            <>
                                {e2p(formatTime(timeLeft))} <span className='mx-2'>شکیبا باشید</span>
                            </>
                        ) : (
                            <h1>
                                کد تأیید را دریافت نکردید؟
                                <span className='text-green-700 cursor-pointer mx-1' onClick={handleResendCode}>
                                    ارسال دوباره
                                </span>
                            </h1>
                        )}
                    </div>
                </div>
                <div className={`rounded-xl mb-10 mx-2 ${!isVerificationCodeEntered2 ? 'bg-orange-400' : 'bg-stone-300'}`}>
                    <button
                        type="submit"
                        form="signup-form"
                        className="cursor-pointer w-full p-2 text-white hover:shadow-lg"
                        disabled={!!isVerificationCodeEntered2}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        عضویت
                    </button>
                </div>
            </div>
        </>
    );
};