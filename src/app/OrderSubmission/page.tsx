'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from "../theme"
import AddressPart from './AddressPart/AddressPart';
import Cart from './Cart/Cart'
import SummaryPart from './SummaryPart/SummaryPart';
import Tab from './SendingPart/SelectTab';

export default function OrderSubmission() {

  const { isDarkMode } = useTheme();

  return (
    <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} flex flex-row `}>
        <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} hidden sm:flex 
                         flex-col justify-center items-center flex-grow h-full sticky top-1`}>
           <Cart />
        </div>
        <div className='flex flex-col w-full m-10 overflow-x-hidden'>
            <AddressPart/>
            <SummaryPart/>
            <Tab/> 
        </div>
    </div>
  );
}