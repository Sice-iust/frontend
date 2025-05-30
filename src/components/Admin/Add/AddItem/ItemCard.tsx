import { FaBoxOpen, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { convertToPersianNumbers } from "../../../../utils/Coversionutils";
import Image from "next/image";


export default function AdminItemCard({ id, title, stock, price, image }) {
    return (
        <div className="border border-gray-200 w-full p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative">
            <div className="absolute left-4 top-4 flex items-center bg-gray-100 px-2 py-1 rounded-full">
                <FaBoxOpen className="text-gray-600 ml-1" size={14} />
                <span className="text-gray-700 text-sm font-medium">{convertToPersianNumbers(stock)}</span>
            </div>
            {stock <= 10 && (
                <div className="absolute right-4 top-4 bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                    <div className="flex flex-row-reverse gap-1">                   
                        موجودی رو به اتمام است
                        <RiErrorWarningLine className="w-4 h-5"/>
                    </div>
                </div>
            )}

            <div className="mb-3 mt-8 flex-grow">
                <Image 
                    src={image} 
                    alt={title} 
                    className="w-full h-32 object-contain rounded-2xl"
                />
            </div>

            <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>

            <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-700">
                    قیمت: <span className="font-bold">{convertToPersianNumbers(price.toLocaleString())} تومان</span>
                </p>
                
                <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                        <FaRegEdit size={20} className="text-green-600" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <HiOutlineTrash size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}