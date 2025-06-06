import React, { useState } from "react";
import { LuFilterX } from "react-icons/lu";


export default function AddFilter() {

    return (
        <>
            <div className="box-content mr-5 mt-15 mb-10 min-h-90 w-70 rounded-2xl bg-white ">
                <div className="flex flex-col m-2 px-2">
                    <div className="flex flex-row-reverse justify-between">
                        <span className="font-bold text-lg">فیلترها</span>
                        <button className="flex flex-row gap-1 box-content bg-gray-300 w-26  h-7 rounded-2xl cursor-pointer
                                            hover:bg-gray-200 hover:scale-105 hover:transition-normal">
                            <span className=" text-sm ml-2 mt-1">حذف فیلترها</span>
                            <LuFilterX className="text-[#f18825] mt-1 mr-1"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

