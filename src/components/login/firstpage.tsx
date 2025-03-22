import { PhoneOutlined } from "@mui/icons-material";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

enum Step {
    PHONE = 'PHONE',
    CODE = 'CODE',
    REGISTER = 'REGISTER',
}

export default function FirstPage({isDarkMode, setStep , phoneNumber, setPhoneNumber}) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    const [error, setError] = useState<string | null>(null);
    const isPhoneButtonDisabled = phoneNumber.length !== 11 || !phoneNumber.startsWith('09');

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
            <div className="titleContainer">
                <h1>    ورود <span className="non-bold">یا</span> عضویت
                </h1>
            </div>
            <div className={`phone-input ${isDarkMode ? 'dark-login' : 'light-login'}`} >
                <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="form-group">
                        <span className="icon"><PhoneOutlined style={{ color: isDarkMode ? '#FFFFFF' : '#4C4343', }} /></span> {/* Phone icon */}
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder=" "
                            autoComplete="off"
                            required
                            value={e2p(phoneNumber)}
                            onChange={handleInputChange}
                            className={error ? 'error' : ''}
                        />
                        <label htmlFor="phoneNumber" className={error ? 'error' : ''}>شماره تلفن همراه</label>
                        {error && <div className="error-message-login">{error}</div>}
                    </div>
                </div>
            </div>

            <DialogActions className={`dialogActions ${isDarkMode ? 'dark-login' : 'light-login'}`}>
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
        </>
    );
}