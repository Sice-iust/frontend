import { PhoneOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.scss";
enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function FirstPage({ isDarkMode, setStep, phoneNumber, setPhoneNumber }) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || phoneNumber.length > 0;

    const [error, setError] = useState<string | null>(null);
    const [coutnError0, setCountError0] = useState<string | null>(null);

    const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09') || coutnError0;

    const handleInputChange = (event) => {

        const value = event.target.value;
        const new_Value = p2e(value);

        setPhoneNumber(new_Value);

        if (new_Value.length < 2) {
            setError(null);
        } else if (!new_Value.startsWith("09") && new_Value.length >= 2 || value.length > 11 || new_Value.length === 11 && !/^09\d{9}$/.test(new_Value)) {
            setError('شماره همراه معتبر نیست');
        } else {
            setError(null);
        }
    };
    const handlePhoneSubmit = async () => {
        setCountError0('');
        if (!isPhoneButtonDisabled && !error) {
            console.log('Verification code sent to:', phoneNumber);
            let phonenumber = p2e(phoneNumber);
            if (phonenumber.startsWith('09')) {
                phonenumber = '+98' + phonenumber.slice(1);
            }
            console.log('Verification code sent to:', phonenumber);

            try {
                //setStep(Step.CODE);
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

                    setCountError0("امکان ارسال بیش از 3 پیامک در 10 دقیقه نیست.لطفا صبر و مجددا تلاش کنید. ")
                    return; 
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
        }
    };

    return (
        <>
            <h1 className="mx-auto font-semibold text-3xl mt-10 mb-7">
                ورود <span className="font-light">یا</span> عضویت
            </h1>
            <div className="mx-5 md:mx-20">
                <div className="relative border rounded-lg p-2">
                    <PhoneOutlined style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} className="absolute" />
                    <input
                        dir="rtl"
                        type="tel"
                        id="phoneNumber"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        autoComplete="off"
                        required
                        value={e2p(phoneNumber)}
                        onChange={handleInputChange}
                        className="w-full outline-none"
                    />
                    <label
                        htmlFor="phoneNumber"
                        className={`absolute right-3 transition-all duration-200 
                            ${shouldFloat 
                                ? 'text-xs -top-2 bg-white px-1 dark:bg-[rgb(25,25,25)]' 
                                : 'top-2.5 text-sm'} text-gray-500`}
                    >
                        {shouldFloat && <span className="text-red-500 ml-1">*</span>}

                        شماره تلفن همراه
                        
                    </label>

                </div>
                {coutnError0 && <div className={styles.errorMessageLogin}>{coutnError0}</div>}
                {error && <div className={styles.errorMessageLogin}>{error}</div>}
                <div className={` rounded-xl my-10 mx-2 ${!isPhoneButtonDisabled ? 'bg-orange-400' : 'bg-stone-300'}`}>
                    <button
                        type="submit"
                        form="login-form"
                        className="cursor-pointer w-full p-2 text-white hover:shadow-lg"
                        disabled={!!isPhoneButtonDisabled}
                        onClick={handlePhoneSubmit}
                    >
                        ادامه
                    </button>
                </div>
            </div>
        </>
    );
}