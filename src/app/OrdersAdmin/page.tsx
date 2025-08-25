'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from "../../components/theme"
import Filter from './Filter/Filter'
import Tab from './Orders/Orders-menu'


export default function OrderSubmission() {

  const { isDarkMode } = useTheme();

  return (
    <div className={`flex-shrink-0 dark:bg-[#383535] bg-[#f5f5f5] flex  flex-row-reverse`}>
        <div className={`flex-shrink-0 dark:bg-[#383535]bg-[#f5f5f5] hidden sm:flex 
                         flex-col justify-center items-center flex-grow h-full sticky top-1 mr-10 ml-0 mt-5`}>
           <Filter />
        </div>
        <div className='flex flex-col w-full ml-10  mb-10 overflow-x-hidden'>   
            <Tab />
        </div>
    </div>
  );
}