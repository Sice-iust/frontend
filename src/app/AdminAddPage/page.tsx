'use client'
import React from "react";
import Tab from "../../components/Admin/Add/Switch";
import { useTheme } from "../../components/theme";
import AddFilter from "../../components/Admin/Add/filter";
export default function AddAdmin() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
    <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} flex flex-row-reverse `}>
        <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} hidden md:flex 
                         flex-col justify-center items-center flex-grow h-full sticky top-1`}>
           <AddFilter />
        </div>
        <div className='w-full mt-5 mr-5 ml-5 overflow-x-hidden'>
            <Tab/> 
        </div>
    </div>
    </>
  );
}; 