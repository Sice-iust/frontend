import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

export default function AdminItemCard({ id, title, stock, price, image }) {
    return (
        <div className="border border-gray-200 w-full p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {stock <= 10 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        کمبود موجودی
                    </span>
                )}
            </div>
            
            {/* تصویر محصول */}
            <div className="mb-4">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>
            
            {/* اطلاعات قیمت و موجودی */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-600">موجودی: {stock}</p>
                    <p className="text-lg font-bold">{price.toLocaleString()} تومان</p>
                </div>
                
                {/* دکمه‌های اقدام */}
                <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                        <FaRegEdit />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <HiOutlineTrash />
                    </button>
                </div>
            </div>
        </div>
    );
}