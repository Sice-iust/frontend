'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";
import { useTheme } from "../theme";
import LoginModal from "./login/login";
import dynamic from "next/dynamic";
import Link from "next/link";

const LazySearch = dynamic(() => import('./search'), {
    loading: () => (
        <div className="flex items-center rounded-3xl p-2 dark:bg-[#383535] bg-[#D9D9D9] mx-auto " dir='rtl'>
            <span className="text-[#B8681D]"><SearchOutlinedIcon /></span>
            <input
                type="text"
                className=" px-2 py-1 dark:text-white focus:outline-none rounded-full w-full text-right text-black text-[16px] placeholder:[#696363]"
                placeholder="نام کالای مورد نظر را جستجو کنید ..."
                dir="rtl"
            />
        </div>
    ),
    ssr: false,
});

export default function Header2() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [shoppingNum, setShoppingNum] = useState(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        getUsername();
    }, []);
    useEffect(() => {
        console.log('ShoppingNum value:', shoppingNum);
    }, [shoppingNum]);
    return (
        <>
            <div className={` dark:bg-[#191919] bg-white  w-full`}>
                <div dir="rtl" className="flex flex-col justify-center px-5 py-2 md:flex-row">

                    <div className="hidden md:flex basis-2/10 my-auto">
                        <Link href="/">
                            <Image src={isDarkMode ? `/assets/logo-dark.png` : `/assets/logo.png`}
                                alt="Logo"
                                width={200}
                                height={200}
                                className="mx-auto md:mr-0 md:ml-auto md:w-30 md:h-20" />
                        </Link>
                    </div>

                    <div className="basis-5/10 w-full my-10 md:my-auto mx-auto ">
                        <LazySearch isDarkMode={isDarkMode} />
                    </div>

                    <div dir="ltr" className={`hidden basis-3/10 md:flex my-auto gap-10 dark:text-white text-black`}>
                        {isLoggedIn ? (
                            <Link
                                href="/ProfilePage/OrdersPage"
                                className="text-[15px] cursor-pointer"

                            >
                                صفحه کاربر
                                <AccountCircleOutlinedIcon className="!text-3xl w-2.5 ml-0.5 " />
                            </Link>
                        ) : (
                            <button className={`bg-[#F18825] dark:text-black text-white rounded-2xl px-2 py-3 cursor-pointer`} onClick={handleOpenModal}
                            > ورود / عضویت   </button>
                        )}

                        <div className={`flex my-auto cursor-pointer gap-2 dark:text-white text-black`}>
                            <Link href={"/OrderSubmission"}><h1>سبد خرید</h1></Link>

                            <ShoppingCartOutlinedIcon className="text-3xl" />
                            {shoppingNum > 0 && <span className={`absolute -top-0.5 -left-[20px] z-1000 bg-[#F18825]  dark:text-black text-white rounded-[10px] px-[6px] py-[3px] text-[12px] `}>{shoppingNum}</span>}
                        </div>
                        <span className={`
                            cursor-pointer my-auto gap-2
                             dark:text-white text-black
                             `} onClick={toggleDarkMode}   >
                            {isDarkMode ? 'حالت روز' : 'حالت شب'}
                            {isDarkMode ? <WbSunnyOutlinedIcon className="text-2xl cursor-pointer" /> : <Brightness2OutlinedIcon className="text-2xl ml-0.5" />}
                        </span>
                    </div>
                </div>
            </div>
            <div dir="ltr" className='fixed bottom-0
                w-full h-20  content-center p-3 md:hidden flex justify-center
                gap-12 border-t-3 basis-3/10
                bg-white dark:bg-black
                border-gray-600  dark:border-white z-10
                text-black dark:text-white px-10
               '>
                {isLoggedIn ? (
                    <Link
                        href="/ProfilePage/OrdersPage"
                        className='
                         text-black dark:text-white bg-orange-400
                         rounded-2xl p-3 cursor-pointer
                         my-auto
                         '
                    >
                        صفحه کاربر
                    </Link>
                ) : (
                    <button 
                    className={`
                         text-black dark:text-white bg-orange-400 text-4xl
                         rounded-2xl p-3 cursor-pointer`} onClick={handleOpenModal}
                    > 
                    <AccountCircleOutlinedIcon className="!text-3xl w-2.5 ml-0.5 " />  
                    </button>
                )}

                <span className={`
                            cursor-pointer my-auto gap-2
                             dark:text-white text-black
                             `} onClick={toggleDarkMode}   >
                    {isDarkMode ? <WbSunnyOutlinedIcon className="text-2xl cursor-pointer" /> : <Brightness2OutlinedIcon className="text-2xl ml-0.5" />}
                </span>
                <div className={` my-auto cursor-pointer dark:text-white text-black`}>
                    <ShoppingCartOutlinedIcon className="text-3xl" />
                </div>
                <Link href="/" className=" my-auto cursor-pointer">
                    <HomeOutlinedIcon className="text-3xl" />
                </Link>
            </div>
            {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} setIsLoggedIn={setIsLoggedIn} />}
        </>
    );
}