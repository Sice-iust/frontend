'use client'
import React, { useEffect, useState } from 'react';
import AddressCard from '../../../components/AddressCard/AddressCard';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useADDRESS } from '../../../context/GetAddress';
import LocationPopup from '../../OrderSubmission/AddressModal/EditLocation';
import Map from "../../locationWindow/MapPopUp";
import { IoLocationOutline } from "react-icons/io5";


const Support: React.FC = () => {  

    const { data } = useADDRESS();
    const [showPopup, setShowPopup] = useState(false);
    const [isMapOpen, SetIsMapOpen] = useState(false);
    const OpenMap = () => {
        SetIsMapOpen(true);  
    };

    const CloseMap = () => SetIsMapOpen(false);

    return (
        <div className="container bg-white dark:bg-[#191919] rounded-xl mt-4 mx-4 ml-4 p-10 w-auto mb-4 min-h-screen">
            <div className='flex flex-row-reverse mb-7 gap-1  '>
              <IoLocationOutline className='h-6 w-6 text-[#F18825]'/>
              <span className='font-semibold text-2xl dark:text-white'>آدرس‌های من</span>
            </div>


            {data.map((add) => (
                <AddressCard
                    key={add.id}
                    id={add.id}
                    title={add.name}
                    address={add.address}
                    isSelected={add.isChosen}
                    isprofile={false}
                    name={add.receiver}
                    phone={add.phone}
                />
            ))}

            <div className="flex flex-row-reverse mt-5">
                <button
                    className="bg-[#F18825] rounded-2xl w-auto p-2 pl-4 pr-3 flex items-center gap-2 text-white dark:text-black font-medium cursor-pointer 
                        hover:bg-orange-400 transition duration-300 hover:scale-105"
                    onClick={OpenMap}
                >
                    افزودن آدرس جدید <FaPlus />
                </button>
            </div>

            {isMapOpen && <Map onClose={CloseMap} isOpen={isMapOpen} />}
        </div>
    );
};  

export default Support;  