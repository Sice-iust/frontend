import { FaBoxOpen, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

export default function AdminItemCard({ id, title, stock, price, image }) {
    return (
        <div className="border border-gray-200 w-full p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative">
            <div className="absolute left-4 top-4 flex items-center bg-gray-100 px-2 py-1 rounded-full">
                <FaBoxOpen className="text-gray-600 ml-1" size={14} />
                <span className="text-gray-700 text-sm font-medium">{stock}</span>
            </div>
            {stock <= 10 && (
                <div className="absolute right-4 top-4 bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                    موجودی رو به اتمام است
                </div>
            )}

            <div className="mb-3 mt-8 flex-grow">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-32 object-contain rounded-lg"
                />
            </div>

            <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>

            <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-700">
                    قیمت: <span className="font-bold">{price.toLocaleString()} تومان</span>
                </p>
                
                <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                        <FaRegEdit size={16} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <HiOutlineTrash size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}