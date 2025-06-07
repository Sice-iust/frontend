'use client'
import React, { useEffect, useState } from "react";
import { LuFilterX } from "react-icons/lu";
import {  FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useAdminItem } from "../../../context/AdminAddItem";

export default function AddFilter() {
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const {categories,applyFilters,origindata}=useAdminItem();
    const [onlyDiscounts, setOnlyDiscounts] = useState(false);
    const [showQuantity, setShowQuantity] = useState(false);
    const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showProductSearch, setShowProductSearch] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const filteredProducts = origindata.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const quantities = [
        { id: 1, label: "بسته تکی" },
        { id: 2, label: "بسته ۲ تایی" },
        { id: 4, label: "بسته ۴ تایی" },
        { id: 6, label: "بسته ۶ تایی" },
        { id: 8, label: "بسته ۸ تایی" }
    ];
const toggleProduct = (productName: string) => {
    setSelectedProducts(prev =>
        prev.includes(productName)
            ? prev.filter(p => p !== productName)
            : [...prev, productName]
    );
};
    const toggleQuantity = (qtyId: number) => {
        setSelectedQuantities(prev =>
            prev.includes(qtyId)
                ? prev.filter(q => q !== qtyId)
                : [...prev, qtyId]
        );
    };
    useEffect(() => {
        applyFilters(selectedCategories, onlyDiscounts,selectedQuantities,selectedProducts);
    }, [selectedCategories, onlyDiscounts,selectedQuantities,selectedProducts]);
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleDiscountToggle = () => {
        setOnlyDiscounts(prev => !prev);
    };
    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedProducts([]);
        setSelectedQuantities([]);
        setOnlyDiscounts(false);
        setSearchTerm("");
    };
    return (
        <>
            <div className="box-content mr-5 mt-15 mb-10 min-h-90 w-70 rounded-2xl bg-white ">
                <div className="flex flex-col mt-5 mb-5 px-4">
                    <div className="flex flex-row-reverse justify-between">
                        <span className="font-bold text-lg">فیلترها</span>
                        <button className="flex flex-row gap-1 box-content bg-gray-300 w-26  h-7 rounded-2xl cursor-pointer
                                            hover:bg-gray-200 hover:scale-105 hover:transition-normal"
                                            onClick={clearAllFilters}>
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


                    <div className="border-b border-gray-200 pb-3 mb-3 mt-1">
                    <div 
                        className="flex flex-row-reverse gap-1 items-center cursor-pointer"
                        onClick={() => setShowProductSearch(!showProductSearch)}
                    >
                        <span className="font-semibold text-gray-700">نام محصول</span>
                        {showProductSearch ? (
                        <FiChevronUp className="text-gray-500" />
                        ) : (
                        <FiChevronDown className="text-gray-500" />
                        )}
                    </div>

                    {showProductSearch && (
                        <div className="mt-3 space-y-2">
                        <div className="flex items-center bg-gray-300 rounded-2xl px-2 py-1 gap-2 text-md">
                            <input
                            type="text"
                            placeholder="نام محصول را وارد کنید"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent text-right outline-none"
                            />
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#f18825]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z" />
                            </svg>
                        </div>

                        <div className="space-y-2 overflow-y-auto max-h-60" >
                            {filteredProducts.map(product => (
                            <div key={product.id} className="flex flex-row items-center" dir="rtl">
                                <label htmlFor={`prod-${product.id}`} className="relative cursor-pointer flex flex-row gap-1 items-right">
                                <input
                                    type="checkbox"
                                    id={`prod-${product.id}`}
                                    checked={selectedProducts.includes(product.name)}
                                    onChange={() => toggleProduct(product.name)}
                                    className="hidden"
                                />
                                <div className={`w-4  mt-1 h-4 border-2 rounded flex items-center justify-center ${
                                    selectedProducts.includes(product.name)
                                    ? "bg-[#f18825] border-[#f18825]"
                                    : "bg-white border-gray-400"
                                }`}>
                                    {selectedProducts.includes(product.name) && (
                                    <span className="text-white text-sm font-bold">✓</span>
                                    )}
                                </div>
                                <span className="text-gray-600 ml-2">{product.name}</span>
                                </label>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>


                    <div className="border-b border-gray-200 pb-3 mb-3 mt-1">
                    <div 
                        className="flex flex-row-reverse gap-1 items-center cursor-pointer"
                        onClick={() => setShowQuantity(!showQuantity)}
                    >
                        <span className="font-semibold text-gray-700">تعداد</span>
                        {showQuantity ? (
                        <FiChevronUp className="text-gray-500" />
                        ) : (
                        <FiChevronDown className="text-gray-500" />
                        )}
                    </div>
                    {showQuantity && (
                        <div className="mt-3 space-y-2 pr-5">
                        {quantities.map(q => (
                            <div key={q.id} className="flex flex-row-reverse items-center">
                            <label htmlFor={`qty-${q.id}`} className="relative cursor-pointer flex flex-row-reverse gap-1 items-center">
                                <input
                                type="checkbox"
                                id={`qty-${q.id}`}
                                checked={selectedQuantities.includes(q.id)}
                                onChange={() => toggleQuantity(q.id)}
                                className="hidden"
                                />
                                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                                selectedQuantities.includes(q.id) ? "bg-[#f18825] border-[#f18825]" : "bg-white border-gray-400"
                                }`}>
                                {selectedQuantities.includes(q.id) && (
                                    <span className="text-white text-sm font-bold">✓</span>
                                )}
                                </div>
                                <span className="text-gray-600 ml-2">{q.label}</span>
                            </label>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>


                    <div className="mt-1 flex items-center " dir="rtl">
                    <label className="inline-flex items-center cursor-pointer ">
                        <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={onlyDiscounts}
                        onChange={handleDiscountToggle}
                        />
                        <span className="ml-3 text-gray-700 font-semibold dark:text-gray-300">فقط تخفیف‌دارها</span>

                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
                            peer-focus:ring-blue-300 dark:peer-focus:ring-orange-800 rounded-full peer
                             dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                             peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                              after:transition-all dark:border-gray-600 peer-checked:bg-[#f18825]
                              dark:peer-checked:bg-[#f18825]"></div>
                    </label>
                    </div>


                </div>
            </div>
        </>
    );
}

