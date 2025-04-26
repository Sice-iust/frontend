'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";
import { useTheme } from "./theme";
import LoginModal from "./login/login";
import dynamic from "next/dynamic";

const LazySearch = dynamic(() => import('./search'), {
    loading: () => (
        <div className="flex items-center rounded-3xl p-2 dark:bg-[#383535] bg-[#D9D9D9] mx-auto " dir='rtl'>
            <span className="text-[#B8681D]"><SearchOutlinedIcon /></span>
            <input
                type="text"
                className=" px-2 py-1 focus:outline-none rounded-full w-full text-right text-black text-[16px] placeholder:[#696363]"
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
        <>
            <div className="bg-white w-full">
                <div dir="rtl" className="flex flex-col justify-center px-5 py-2 md:flex-row">

                    <div className=" basis-2/10 my-auto">
                        <Image src={`/assets/logo.png`}
                            alt="Logo"
                            width={200}
                            height={200}
                            className="mx-auto md:mr-0 md:ml-auto md:w-30 md:h-20" />
                    </div>

                    <div className="basis-5/10 w-full my-10 md:my-auto mx-auto ">
                        <LazySearch isDarkMode={isDarkMode} />

                    </div>

                    <div dir="ltr" className="basis-3/10 flex my-auto gap-10">
                        {isLoggedIn ? (
                            <span className='text-[15px] cursor-pointer'>  صفحه کاربر
                                <AccountCircleRoundedIcon className="!text-3xl w-2.5 ml-0.5 " /></span>
                        ) : (
                            <button className="bg-[#F18825] text-white rounded-2xl px-2 py-3 cursor-pointer" onClick={handleOpenModal}
                            > ورود / عضویت   </button>
                        )}
                        <div className="flex my-auto cursor-pointer gap-2">
                            <h1>سبد خرید</h1>
                            <ShoppingCartIcon className="text-3xl" />
                            {shoppingNum > 0 && <span className="absolute -top-0.5 -left-[20px] z-1000 bg-[#F18825] text-white rounded-[10px] px-[6px] py-[3px] text-[12px] ">{shoppingNum}</span>}
                        </div>
                        <span className="cursor-pointer my-auto gap-2" onClick={toggleDarkMode}   >
                            {isDarkMode ? 'حالت روز' : 'حالت شب'}
                            {isDarkMode ? <WbSunnyOutlinedIcon className="text-2xl cursor-pointer" /> : <Brightness2OutlinedIcon className="text-2xl ml-0.5" />}
                        </span>
                    </div>
                </div>
                <div>
                    <Image height={100} width={10000} src={`/assets/homePagePhoto.png`} alt={``} />
                </div>
            </div>
            {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} setIsLoggedIn={setIsLoggedIn}/>}
        </>);
}