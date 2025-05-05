import React, { useState } from 'react';
import { useTheme } from "../../theme"
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function AddressModal  ({ onClose }){
  
    return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">ویرایش آدرس</h2>
        {/* Your form or content goes here */}
        <button 
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded" 
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
    )
};