'use client'

import React from 'react';
import styles from './navbar.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { useState, useEffect } from 'react';
import axios from "axios";
import { useTheme } from './theme';
import LoginModal from './login/login';
import dynamic from 'next/dynamic';

const LazySearch = dynamic(() => import('./search'), {
    loading: () =>(
<div className="flex items-center rounded-3xl font-vazir p-2 dark:bg-[#383535]  bg-[#D9D9D9]   ml-10  min-w-[450px]" dir='rtl'>
        <span className="text-[#B8681D]"><SearchOutlinedIcon /></span>
        <input
          type="text"
          className=" px-2 py-1   focus:outline-none font-vazir   rounded-full  min-w-[450px] text-right bg-transparent text-black text-[16px] placeholder:[#696363]"
          placeholder="نام کالای مورد نظر را جستجو کنید ..."
          
          dir="rtl"
        />
      </div>
        ), 
    ssr: false, 
  });

export default function Header({ showImage = true }) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const breadTypes = ["بربری", "سنگک", "تافتون", "لواش", "محلی", "فانتزی"];
    const [currentBreadType, setCurrentBreadType] = useState(breadTypes[0]);
    const [fading, setFading] = useState(false);
    const [shoppingNum, setShoppingNum] = useState(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(null);

    const getUsername = async () => {
        // localStorage.removeItem('token');  
        const token = localStorage.getItem("token");
        console.log('Retrieved Token:', token);

        if (token == "undefined" || !token) {
            console.log('No token found');
            return;
        }
        else {
            try {
                const response = await axios.get('https://nanziback.liara.run/header/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Note: Make sure it starts with "Bearer "  
                    }
                });

                if (response.data.is_login) {
                    setUsername(response.data.username);
                    setIsLoggedIn(response.data.is_login);
                    setShoppingNum(response.data.nums);
                }
                console.log('Username:', response.data.username); // Correctly log the username  
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        }
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrentBreadType(prev => {
                    const currentIndex = breadTypes.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % breadTypes.length;
                    return breadTypes[nextIndex];
                });
                setFading(false);
            }, 1000);
        }, 2000);

        return () => clearInterval(interval);
    }, [breadTypes]);

    useEffect(() => {
        getUsername();
    }, []);
    useEffect(() => {
        console.log('ShoppingNum value:', shoppingNum);
      }, [shoppingNum]);
    return (
        <div  className={isDarkMode ? styles.darkNav : styles.lightNav}>
            <header className="flex space-between  w-full items-center px-5 py-2 bg-white darkMode: bg-balck " > 
            
                <div className="flex items-center w-full">  
                    {isLoggedIn ?(
                        <span className='font-vazir text-[15px] cursor-pointer'>  صفحه کاربر
                         <AccountCircleRoundedIcon className="!text-3xl w-2.5 ml-0.5 " /></span> 

                    ):(
                    <button className="bg-[#F18825] font-vazir  cursor-pointer text-white border-none rounded-2xl px-2 py-3 focus:outline-none "         onClick={handleOpenModal}
                    > ورود / عضویت   </button>
                    ) }
                  
                    <div className="w-[1px] h-10 bg-[#B8681D] mx-5" /> 
                    <div className="flex items-center font-vazir text-[15px] cursor-pointer">  
                        <h1 style={{ color: isDarkMode ? 'white' : 'black'}}>سبد خرید</h1>
                        <ShoppingCartIcon className="text-3xl" />  
                        {shoppingNum > 0 && <span className="absolute -top-0.5 -left-[20px] z-1000 bg-[#F18825] text-white rounded-[10px] px-[6px] py-[3px] text-[12px] ">{shoppingNum}</span>}   
                    </div>  
                    
                    <div className="w-[1px] h-10 bg-[#B8681D] mx-5" /> 
                    <span className="font-vaazir text-[15px]  cursor-pointer hover:underline"    onClick={toggleDarkMode}   >
                        {isDarkMode? 'حالت روز':'حالت شب'}</span>
                 
                    {isDarkMode?<WbSunnyOutlinedIcon className="text-3xl cursor-pointer" /> : <Brightness2OutlinedIcon className="text-3xl ml-0.5" /> } 

                    <LazySearch isDarkMode={isDarkMode} />

                        <div className="flex ml-auto justify-end items-center ">  
                        <Image width={90} height={70} src={isDarkMode ? `/assets/logo-dark.png` : `/assets/logo.png`} alt="Logo"  />
                        </div>  
                </div>  
          
            
            </header>  
            {(!isLoggedIn && showImage) && (
                <div className={styles.backgroundImageContainer}>
                    <Image width={100} height={100} src={isDarkMode ? `/assets/darkHomePagePhoto.png` : `/assets/homePagePhoto.png`} alt="Background" className={styles.backgroundImage} />
                    <div className={styles.overlayText}>
                        <h2 className={styles.breadTitleContainer}>
                            <span className={styles.breadTypeContainer}>
                                <section className={styles.animation}>
                                    <div className={`${styles.breadType} ${fading ? styles.fadeOut : ''}`}>
                                        <div>{currentBreadType}</div>
                                    </div>
                                </section>
                            </span>
                            <span style={{ color: isDarkMode ? '#B2A7A7' : '#555050', marginBottom: '5px' }}>
                                سفارش انواع نان
                            </span>
                        </h2>
                        <div className={styles.locationContainer} dir="rtl">
                            <span className={styles.locationIcon}><LocationOnIcon /></span>
                            <input
                                type="text"
                                className={styles.locationInput}
                                placeholder=" آدرس خود را عوض کنید"
                            />

                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && <LoginModal 
            onClose={handleCloseModal} 
            open={isModalOpen} 
            setIsLoggedIn={setIsLoggedIn} 
/>}

        </div>
    );
};
