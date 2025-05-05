import { PhoneOutlined } from "@mui/icons-material";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";


export default function AddressCard({ id,title, address, isSelected,isprofile,name,phone }) {

    return (
        <>
            <div className={`box-content w-full border-1 rounded-2xl ${isSelected ? "border-green-600" : "border-black"} mb-5 `}>
                <div className="flex flex-col">
                    <div className="flex flex-row-reverse justify-between mr-10 mt-2 ml-5">
                        <span className="font-semibold text-lg text-right">{title}</span>
                        <div className="flex flex-row-reverse gap-4">
                            <FaRegEdit className=" h-5 w-5 text-green-600"/>
                            <HiOutlineTrash className="h-5 w-5 text-red-500"/>
                        </div>  
                    </div>
                    <div className="flex flex-row-reverse gap-2 mb-3">
                    <button className={`h-5 w-5 mr-3 mt-1 rounded-full border-1
                                            ${isSelected ? "bg-green-600" : "bg-white"}`}></button>
                        <span className="text-right overflow-hidden break-words 
                                         font-medium text-md text-gray-500 max-w-160 leading-[2rem]">{address}</span>
                    </div>                      
                </div>

            </div>
        </>
    );
}