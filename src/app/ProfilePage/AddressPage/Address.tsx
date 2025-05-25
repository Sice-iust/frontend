'use client'
import React, { useEffect, useState } from 'react';
import AddressCard from '../../../components/AddressCard/AddressCard';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useADDRESS } from '../../../context/GetAddress';
import LocationPopup from '../../OrderSubmission/AddressModal/EditLocation';
import Map from "../../locationWindow/MapPopUp";



const Address: React.FC = () => {  

    const { data } = useADDRESS();
    const [showPopup, setShowPopup] = useState(false);
    const [isMapOpen, SetIsMapOpen] = useState(false);
    const OpenMap = () => {
        SetIsMapOpen(true);  
    };

    const CloseMap = () => SetIsMapOpen(false);

    return (
        <div className="container bg-white rounded-xl mt-4 mx-4 ml-4 p-10 w-auto mb-4">
            <h2 className="text-xl font-semibold mb-4">انتخاب آدرس</h2>


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
                    className="bg-[#F18825] rounded-2xl w-auto p-2 pl-4 pr-3 flex items-center gap-2 text-white font-medium cursor-pointer 
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

export default Address;  