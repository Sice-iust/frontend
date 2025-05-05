import React, { useEffect, useState } from 'react';
import { useTheme } from "../../theme"
import { IoLocationOutline } from "react-icons/io5";

export default function AddressPart() {

  const { isDarkMode } = useTheme();

  return (
    <div className='box-content bg-white w-full ml-10 mr-10 mt-10'>
        <div className='flex flex-row justify-between'>
            <IoLocationOutline className='text-color-[#F18825] mr-5'/>
        </div>

    </div>
  );
}