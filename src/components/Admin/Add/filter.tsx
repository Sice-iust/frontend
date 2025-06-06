import React, { useState } from "react";
import { LuFilterX } from "react-icons/lu";
import {  FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useAdminItem } from "../../../context/AdminAddItem";

export default function AddFilter() {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {categories,fetchFilter}=useAdminItem();

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    fetchFilter(category);
  };
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


                    <div className="border-b border-gray-200 pb-3 mb-3 mt-5">
                    <div 
                        className="flex flex-row-reverse gap-1 items-center cursor-pointer"
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        <span className="font-semibold text-gray-700">دسته بندی</span>
                        {showCategories ? (
                        <FiChevronUp className="text-gray-500" />
                        ) : (
                        <FiChevronDown className="text-gray-500" />
                        )}
                    </div>

                    {showCategories && (
                        <div className="mt-3 space-y-2 pr-5">
                        {categories.map(category => (
                            <div key={category} className="flex flex-row-reverse items-center">
                            <label key={category} htmlFor={`cat-${category}`} className="relative cursor-pointer flex flex-row-reverse gap-1 items-center">
                                <input
                                    type="checkbox"
                                    id={`cat-${category}`}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                    className="hidden"
                                />
                                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                                    selectedCategories.includes(category) ? "bg-[#f18825] border-[#f18825]" : "bg-white border-gray-400"
                                }`}>
                                    {selectedCategories.includes(category) && (
                                    <span className="text-white text-sm font-bold">✓</span>
                                    )}
                                </div>
                                <span className="text-gray-600 ml-2">{category}</span>
                            </label>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>


                </div>
            </div>
        </>
    );
}

