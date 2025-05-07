import { PhoneOutlined } from "@mui/icons-material";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCheck } from "react-icons/fa"; 


export default function TimeCard({ id,shippingfee,title, date, isSelected , onSelect }) {

    return (
        <>
            <div className={`box-content border-1 w-18 h-22 mb-5 rounded-2xl flex-shrink-0 cursor-pointer
                            ${isSelected? "border-black bg-orange-300" : "border-gray-500 bg-white"}`}
                            onClick={() => onSelect(id)}>
                <div className="flex flex-col mt-2 gap-1 justify-center items-center">
                    <span className="font-semibold text-sm">{title}</span>
                    <span className="text-xs text-gray-500" >{date}</span>
                    <div className="box-content bg-gray-300 rounded-4xl text-xs p-1">{shippingfee} </div>
                </div>
            </div>  
        </>
    );
}

