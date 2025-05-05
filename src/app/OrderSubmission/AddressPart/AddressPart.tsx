import React, { useEffect, useState } from 'react';
import { useTheme } from "../../theme"
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function AddressPart() {

  const { isDarkMode } = useTheme();

  return (
    <div className='box-content bg-white rounded-2xl h-auto '>
        <div className='flex flex-col'>
            <div className='flex flex-row-reverse justify-between mr-10 ml-10'>
                <div className='flex flex-row-reverse mt-3 gap-1 '>
                    <IoLocationOutline className='h-5 w-5 text-[#F18825]'/>
                    <span className='font-semibold text-xl'>آدرس</span>
                </div>
                <div className='flex flex-row-reverse mt-3 gap-2'>
                    <FaRegEdit className="h-4 w-4 text-green-600" />
                    <span className='font-semibold text-md text-green-600'>تغییر آدرس</span>
                </div> 
            </div>
            <div className='flex flex-row-reverse mt-3 mr-15 mb-5'>
                <span className='font-medium text-md text-gray-500'>تهران، شهرآرا، خیابان فلان، کوچه بهمان، پلاک ۱۰ واحد ۳</span>
            </div>
        </div>
    </div>
  );
}