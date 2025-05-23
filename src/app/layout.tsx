'use client'
import './globals.css';
import Footer2 from "./footer2";
import Header2 from './header2';
import Image from "next/image";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ThemeProvider, useTheme } from "./theme";
import { CartProvider } from "../context/Receiptcontext";
import Link from 'next/link';
import { useState } from 'react';
import { AddressProvider } from "../context/GetAddress";

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
              </div>
            </ThemeProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}