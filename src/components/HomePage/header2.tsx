'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";

import { IoLocationOutline } from "react-icons/io5";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FaChevronDown } from "react-icons/fa";
import { convertToPersianNumbers } from "../../utils/Coversionutils";

import { useTheme } from "../theme";
import { useADDRESS } from "../../context/GetAddress";
import LoginModal from "./login/login";
import AddressModal from "../../app/OrderSubmission/AddressModal/AddressModal";
import { useCart } from "../../context/Receiptcontext";
import { usePathname, useRouter } from "next/navigation";

const LazySearch = dynamic(() => import('./search'), {
  loading: () => (
    <div className="flex items-center rounded-3xl p-2 dark:bg-[#383535] bg-[#D9D9D9] mx-auto" dir='rtl'>
      <span className="text-[#B8681D]"><SearchOutlinedIcon /></span>
      <input
        type="text"
        className="px-2 py-1 dark:text-white focus:outline-none rounded-full w-full text-right text-black text-[16px] placeholder:[#696363]"
        placeholder="نام کالای مورد نظر را جستجو کنید ..."
        dir="rtl"
      />
    </div>
  ),
  ssr: false,
});

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [shoppingNum, setShoppingNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { shoppingNum } = useCart();

  const { isDarkMode, toggleDarkMode } = useTheme();
  const currentPath = usePathname();

  const linkClasses = (path: string) =>
    `my-auto cursor-pointer p-2 rounded-2xl flex items-center justify-center transition-colors
    ${currentPath === path ? "bg-orange-400 text-black dark:text-white" : "hover:bg-orange-200 dark:hover:bg-orange-700"}`;

  const { data = [] } = useADDRESS();
  const selectedAddress = data?.find((add) => add.isChosen === true);

  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
    setIsAddressModalOpen(false);
  };

  const handleCloseLoginModal = () => setIsModalOpen(false);
  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);

  const truncateText = (text: string, wordLimit = 4) => {
    if (!text) return "...";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      // localStorage.removeItem("token");
      // localStorage.removeItem("userRole");
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") return;

      try {
        const response = await axios.get('https://nanziback.liara.run/header/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.is_login) {
          setIsLoggedIn(true);
          //setShoppingNum(response.data.nums || 0);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem("token");
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <div className={`dark:bg-[#191919] bg-white w-full`}>
        <div dir="rtl" className="flex flex-col md:flex-row justify-between w-full px-5 py-2">
          {/* Logo */}
          <div className="hidden md:flex flex-shrink-0 ">
            <Link href="/">
              <div className="relative w-[150px] h-[60px] md:w-[200px] md:h-[80px]">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/assets/logo-dark.png"
                  alt="Logo"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
            </Link>
          </div>

          {/* Address shown when logged in*/}
          {isLoggedIn && (
            <div
              className="flex flex-col mt-4 ml-20 leading-relaxed cursor-pointer"
              onClick={handleOpenAddressModal}
            >
              <span className="text-md text-black dark:text-white font-bold mr-5">{selectedAddress?.name}</span>
              <div className="flex flex-row-reverse gap-1">
                <FaChevronDown className="text-[#f18825] h-3 w-3 mt-1 " />
                <span className="font-medium text-sm text-gray-500 dark:text-[#ADA6A6] truncate">
                  {truncateText(selectedAddress?.address ?? "")}
                </span>
                <IoLocationOutline className="dark:text-white" />
              </div>
            </div>
          )}

          {/* Search */}
          <div className="w-full md:flex-1 md:max-w-2xl mx-0 md:mx-4 mt-2">
            <LazySearch />
          </div>

          {/* Desktop Navigation */}
          <div dir="ltr" className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6">
            {isLoggedIn ? (
              <Link
                href="/ProfilePage"
                className="flex items-center gap-1 text-black dark:text-white hover:text-[#F18825] transition-colors"
                aria-label="User profile"
              >
                <span className="text-sm md:text-base">صفحه کاربر</span>
                <AccountCircleOutlinedIcon className="!text-2xl" />
              </Link>
            ) : (
              <button
                className="bg-[#F18825] text-white rounded-xl px-3 py-2 hover:bg-[#e07d1f] transition-colors text-sm md:text-base"
                onClick={handleOpenLoginModal}
                aria-label="Login or register"
              >
                ورود / عضویت
              </button>
            )}

            <div className="flex my-auto cursor-pointer gap-2 dark:text-white text-black">
              <Link href="/OrderSubmission">
                <h1>سبد خرید</h1>
              </Link>
              <div className="relative">
                <ShoppingCartOutlinedIcon className="text-3xl" />
                {shoppingNum > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F18825] dark:text-black text-white rounded-[10px] px-1.5 py-0.5 text-xs">
                    {convertToPersianNumbers(shoppingNum)}
                  </span>
                )}
              </div>
            </div>

            <button
              className="flex my-auto gap-2 dark:text-white text-black cursor-pointer"
              onClick={toggleDarkMode}
            >
              <span className="before:content-['حالت_شب'] dark:before:content-['حالت_روز']" />
              <div className="relative w-6 h-6">
                <WbSunnyOutlinedIcon className="text-2xl absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-300" />
                <Brightness2OutlinedIcon className="text-2xl absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}

      <div
        className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-600
             md:hidden dark:bg-black dark:border-white z-10 dark:text-white"
      >
        <nav className="flex justify-around items-center p-3">
        
        {isLoggedIn ? (
          <Link href="/ProfilePage" className={linkClasses("/ProfilePage")}>
            صفحه کاربر
          </Link>
        ) : (
          <button
            className="text-black dark:text-white text-4xl rounded-2xl p-3 cursor-pointer"
            onClick={handleOpenLoginModal}
          >
            <AccountCircleOutlinedIcon className="!text-3xl w-2.5 ml-0.5" />
          </button>
        )}

        <button
          className="cursor-pointer my-auto dark:text-white text-black"
          onClick={toggleDarkMode}
        >
          <div className="relative w-6 h-6">
            <WbSunnyOutlinedIcon className="text-2xl absolute inset-0 dark:opacity-100 opacity-0 transition-opacity duration-300" />
            <Brightness2OutlinedIcon className="text-2xl absolute inset-0 dark:opacity-0 opacity-100 transition-opacity duration-300" />
          </div>
        </button>

        <Link href="/OrderSubmission" className={linkClasses("/OrderSubmission")}>
          <ShoppingCartOutlinedIcon className="text-3xl" />
          {shoppingNum > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F18825] dark:text-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {shoppingNum}
            </span>
          )}
        </Link>

        <Link href="/" className={linkClasses("/")}>
          <HomeOutlinedIcon className="text-3xl" />
        </Link>
      </nav>
      </div>

      {isModalOpen && (
        <LoginModal
          onClose={handleCloseLoginModal}
          open={isModalOpen}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {isAddressModalOpen && (
        <AddressModal
          onClose={handleCloseAddressModal}
          id_user={localStorage.getItem("token")}
        />
      )}
    </>
  );
}