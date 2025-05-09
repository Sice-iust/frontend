'use client'
import './globals.css';
import Footer2 from "./footer2";
import Header2 from './header2';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ThemeProvider, useTheme } from "./theme";
import { CartProvider } from "../context/Receiptcontext";
import Link from 'next/link';
import { useState } from 'react';
import {AddressProvider} from "../context/GetAddress";

export default function Layout({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <html lang="en">
      <body>
        <CartProvider>
   <AddressProvider>
          <ThemeProvider>
            <div className='relative'>
              <Header2 />
              {children}
              <Footer2 />
              <div className='fixed bottom-0
               bg-white w-full h-20  content-center p-2 md:hidden flex justify-center
               gap-20 
               '>
                <div dir="ltr" className={`basis-3/10 flex my-auto gap-10 dark:text-white text-black`}>
                  {isLoggedIn ? (
                    <Link
                      href="/ProfilePage/OrdersPage"
                      className="text-[15px] cursor-pointer"

                    >
                      صفحه کاربر
                      <AccountCircleRoundedIcon className="!text-3xl w-2.5 ml-0.5 " />
                    </Link>
                  ) : (
                    <button className={`bg-[#F18825] dark:text-black text-white rounded-2xl px-2 py-3 cursor-pointer`} onClick={handleOpenModal}
                    > <AccountCircleRoundedIcon className="!text-3xl w-2.5 ml-0.5 " />  </button>
                  )}
                  <div className={`flex my-auto cursor-pointer gap-2 dark:text-white text-black`}>
                    <ShoppingCartIcon className="text-3xl" />
                  </div>
                  <span className={`
                            cursor-pointer my-auto gap-2
                             dark:text-white text-black
                             `} onClick={toggleDarkMode}   >
                    {isDarkMode ? <WbSunnyOutlinedIcon className="text-2xl cursor-pointer" /> : <Brightness2OutlinedIcon className="text-2xl ml-0.5" />}
                  </span>
                </div>
              </div>
            </div>
          </ThemeProvider>
   </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}