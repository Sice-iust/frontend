import React, { useEffect, useState } from 'react';
import AddressCard from '../../../components/AddressCard/AddressCard';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useADDRESS } from '../../../context/GetAddress';
import LocationPopup from './EditLocation';
import Map from "../../locationWindow/MapPopUp";

export default function AddressModal({ onClose, id_user }) {
    const { data } = useADDRESS();
    const [showPopup, setShowPopup] = useState(false);
    const [isMapOpen, SetIsMapOpen] = useState(false);
    const OpenMap = () => {
        SetIsMapOpen(true);  
    };

    const CloseMap = () => SetIsMapOpen(false);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-10">
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>

            {!isMapOpen && (
                <div className="relative bg-white p-4 rounded-lg shadow-lg min-w-120 min-h-30 w-auto ">
                    <div className="relative flex justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4">انتخاب آدرس</h2>
                        <IoMdClose
                            className="absolute right-0 top-0 h-7 w-5 text-gray-600 cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    <div className='overflow-y-scroll overflow-x-hidden max-h-90 ml-4 mr-4'>
                      <div className='mr-3 ml-2'>
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
                      </div>
                    </div>
                    <div className='flex flex-row-reverse mt-5'>
                        <button className='bg-[#F18825] rounded-2xl w-auto p-2 pl-4 pr-3 
                                flex items-center gap-2 text-white font-medium cursor-pointer 
                                hover:bg-orange-400 transition duration-300 hover:scale-105'
                            onClick={OpenMap}>
                            افزودن آدرس جدید <FaPlus />
                        </button>
                    </div>
                </div>
            )}
            {isMapOpen && <Map onClose={CloseMap} isOpen={isMapOpen} />}
        </div>
    );
}