import { PhoneOutlined } from "@mui/icons-material";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.scss";
enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function FirstPage({isDarkMode, setStep , phoneNumber, setPhoneNumber}) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [error, setError] = useState<string | null>(null);
    const[coutnError0,setCountError0]=useState<string | null>(null);

    const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09') ||coutnError0;

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
                      
                        setCountError0("امکان ارسال بیش از 3 پیامک در 10 دقیقه نیست.لطفا صبر و مجددا تلاش کنید. ")
                    }
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
            <div className={styles.titleContainer}>
                <h1>    ورود <span className={styles.nonBold}>یا</span> عضویت
                </h1>
            </div>
            <div className={`${styles.phoneInput} ${isDarkMode ? styles.darkLogin : styles.lightLogin}`} >
                <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={styles.formGroup}>
                        <span className={styles.icon}><PhoneOutlined style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span> {/* Phone icon */}
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder=" "
                            autoComplete="off"
                            required
                            value={e2p(phoneNumber)}
                            onChange={handleInputChange}
                            className={error ? styles.error : ''}
                        />
                        <label htmlFor="phoneNumber" className={error ? styles.error : ''}>شماره تلفن همراه</label>
                        {error && <div className={styles.errorMessageLogin}>{error}</div>}
                        {coutnError0 && <div className={ styles.errorMessageLogin}>{coutnError0}</div>}

                    </div>
                </div>
            </div>

            <DialogActions className={`${styles.dialogActions} ${isDarkMode ? styles.darkLogin : styles.lightLogin}`}>
                <div className={styles.buttonWrapper}>
                    <Button
                        type="submit"
                        form="login-form"
                        className={`${styles.dialogActionsButton} ${isPhoneButtonDisabled ? styles.disabled : ''}`}
                        disabled={isPhoneButtonDisabled}
                        onClick={handlePhoneSubmit}
                    >
                        ادامه
                    </Button>
                </div>
            </DialogActions>
        </>
    );
}