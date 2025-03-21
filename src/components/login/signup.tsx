import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useState } from 'react';

import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import Logo from "../../assets/logo.png";
import './login.scss';

const theme = createTheme({
    direction: 'rtl',
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


export default function Signup({ open, onClose }) {
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [nameIsFocused, setnameIsFocused] = useState(false);
    const [codeIsFocused, setcodeIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [t, sett] = useState(Date.now() + 120000);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            //route to first page
            onClose()
        } else {
            return <span>{e2p(zeroPad(minutes))} : {e2p(zeroPad(seconds))}</span>;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };
    const handleNameFocus = () => {
        setnameIsFocused(true);
    };
    const handleCodeFocus = () => {
        setcodeIsFocused(true);
    };

    const handleNameBlur = () => {
        if (name === '') {
            setnameIsFocused(false);
        }
    };
    const handleCodeBlur = () => {
        if (code === '') {
            setcodeIsFocused(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '26px',
                    overflow: 'hidden',
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

            <DialogTitle>
                <IconButton edge="end" color="inherit" onClick={onClose} className='closeButton'>
                    <ArrowBackIosIcon className='backIcon' />
                </IconButton>
                <div className='dialogTitle'>

                    <div className='logoContainer'>
                        <img src={Logo} alt="Nanzi Logo" />
                    </div>
                    <div className='fullScreenContainer'>
                        <h1 className='nanziText'>Nanzi</h1>
                    </div>
                </div>


            </DialogTitle>

            <CacheProvider value={cacheRtl}>
                <form id="login-form" onSubmit={handleSubmit} style={{ width: '350px', margin: '0 auto' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={
                            <span>
                                نام کاربری
                                {(nameIsFocused || name.length > 0) && (
                                    <span style={{ color: 'red' }}> *</span>
                                )}
                            </span>
                        }
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        onFocus={handleNameFocus}
                        onBlur={handleNameBlur}
                        error={!!error}
                        helperText={error}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CreateOutlinedIcon style={{ color: 'black' }} />
                                </InputAdornment>
                            ),
                            style: {
                                color: 'black',
                                textAlign: 'right',
                                direction: 'ltr',
                            },
                        }}
                        InputLabelProps={{
                            shrink: nameIsFocused || name.length > 0,
                            style: {
                                color: error ? 'red' : (nameIsFocused || name.length > 0 ? '#4C4343' : 'gray'), // Change label color based on error  
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                                fontFamily: 'IRANSansMobile',
                                fontSize: '18px',
                                height: '50px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&.Mui-focused': {
                                    color: '#4C4343',
                                },
                            },
                            '& .MuiInputBase-root': {
                                '&.Mui-focused': {
                                    color: '#4C4343',
                                },
                                '&:focus': {
                                    boxShadow: 'none',
                                },
                            },
                            '& .MuiInputBase-input:focus': {
                                color: '#4C4343',
                            },
                            '& .MuiInputLabel-outlined': {
                                fontFamily: 'IRANSansMobile',
                                fontSize: '18px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: name ? '#4C4343' : 'gray',
                            },
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                            '& .MuiFormLabel': {
                                color: '#4C4343',
                            },
                        }}
                        dir="rtl"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label={
                            <span>
                                کد تایید
                                {(codeIsFocused || code.length > 0) && (
                                    <span style={{ color: 'red' }}> *</span>
                                )}
                            </span>
                        }
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={code}
                        onChange={(e) => { setCode(e.target.value) }}
                        onFocus={handleCodeFocus}
                        onBlur={handleCodeBlur}
                        error={!!error}
                        helperText={error}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MarkEmailReadOutlinedIcon style={{ color: 'black' }} />
                                </InputAdornment>
                            ),
                            style: {
                                color: 'black',
                                textAlign: 'right',
                                direction: 'ltr',
                            },
                        }}
                        InputLabelProps={{
                            shrink: codeIsFocused || code.length > 0,
                            style: {
                                color: error ? 'red' : (codeIsFocused || code.length > 0 ? '#4C4343' : 'gray'), // Change label color based on error  
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                                fontFamily: 'IRANSansMobile',
                                fontSize: '18px',
                                height: '50px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: error ? 'red' : '#4C4343',
                                },
                                '&.Mui-focused': {
                                    color: '#4C4343',
                                },
                            },
                            '& .MuiInputBase-root': {
                                '&.Mui-focused': {
                                    color: '#4C4343',
                                },
                                '&:focus': {
                                    boxShadow: 'none',
                                },
                            },
                            '& .MuiInputBase-input:focus': {
                                color: '#4C4343',
                            },
                            '& .MuiInputLabel-outlined': {
                                fontFamily: 'IRANSansMobile',
                                fontSize: '18px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: code ? '#4C4343' : 'gray',
                            },
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                            '& .MuiFormLabel': {
                                color: '#4C4343',
                            },
                        }}
                        dir="rtl"
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ color: '#34A853' }}> اصلاح شماره<DrawOutlinedIcon sx={{ mr: 0.5 }} /> </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <span style={{marginRight: 10}}> شکیبا باشید </span>
                        <Countdown date={t} renderer={renderer} />
                    </div>
                </form>
            </CacheProvider>

            <DialogActions className="dialogActions">
                <div className="buttonWrapper">
                    <Button
                        type="submit"
                        form="login-form"
                        className={`btn-primary`}
                    >
                        عضویت
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};