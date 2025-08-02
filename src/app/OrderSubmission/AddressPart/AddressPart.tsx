import React, { useState } from 'react';
import { useTheme } from "../../../components/theme"
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import AddressModal from "../AddressModal/AddressModal"
import { useADDRESS } from '../../../context/GetAddress';

export default function AddressPart() {
  const { isDarkMode } = useTheme();
  const { data = [] } = useADDRESS();  
  const selected = data?.find((add) => add.isChosen === true);
  console.log("this",selected);
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='box-content bg-white dark:bg-[#191919] rounded-2xl h-auto '>
        <div className='flex flex-col'>
          <div className='flex flex-row-reverse justify-between mr-10 ml-10'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <IoLocationOutline className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl dark:text-white'>آدرس</span>
            </div>
            <div onClick={handleEditClick} className='flex flex-row-reverse mt-3 gap-2 cursor-pointer'>
              <FaRegEdit className="h-4 w-4 text-green-600" />
              <span className='font-semibold text-md text-green-600'>تغییر آدرس</span>
            </div> 
          </div>
          <div className='flex flex-row-reverse mt-3 mr-15 mb-5'>
            <span className='font-medium text-md text-gray-500 dark:text-[#B0ABAB]'>
              {selected?.address}
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && <AddressModal onClose={handleCloseModal} id_user={localStorage.getItem("token")} />}
    </>
  );
}