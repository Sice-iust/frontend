import { PhoneOutlined } from "@mui/icons-material";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";


export default function AddressCard({ id,title, address, isSelected,isprofile,name,phone }) {

    const addresses = [
      {
        id: 1,
        label: "خانه",
        isselect:true,
        description:
          "تهران، شهرفرش، پایتخت، بزرگراه شهید چمران، باغ‌مشت غربی، دنباله بعد از فریزنبل، بلوک ۳۴، پلاک ۲، واحد ۲",
      },
      {
        id: 2,
        label: "دانشگاه",
        isselect:false,
        description:
          "تهران، صنعت، غدیر، بلور، بلوار تکاوران، دانشگاه علم و صنعت ایران، دبیرستان و دانشگاه",
      },
    ];

    return (
        <>
            <div className={`box-content w-full  ml-10 mr-10 mt-5 border-1 ${isSelected ? "border-green-600" : "border-black"} `}>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg text-right mr-5">{name}</span>
                    <div className="flex flex-row justify-between">
                        <div className="flex-flex-row-reverse">
                            <button className={`h-5 w-5 mr-5 rounded-full border-1
                                                ${isSelected ? "bg-green-600" : "bg-white"}`}></button>
                            <span className="mr-5 text-write overflow-hidden break-words 
                                             font-medium text-md text-gray-500">{address}</span>
                        </div>
                        <div className="flex-flex-row-reverse">
                            <FaRegEdit className="color-green-600"/>
                            <span className="mr-5 text-write overflow-hidden break-words 
                                             font-medium text-md text-gray-500">{address}</span>
                        </div>                        
                    </div>
                </div>

            </div>
        </>
    );
}