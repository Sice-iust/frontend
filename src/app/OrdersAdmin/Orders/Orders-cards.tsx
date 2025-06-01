import React from "react"; 
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { FaPhone } from 'react-icons/fa';
import { TbFileDescription } from "react-icons/tb";

interface OrderCardProps {  
    orderkey: number;
    id: string;  
    Reciever: string;
    phone: string;
    total_price: string;  
    delivery_day: string;  
    delivery_clock: string;  
    distination: string;  
    Description: string;
    iscancled?: boolean;
    isarchived?: boolean;
    iscompleted : boolean;
}  

const OrderCard: React.FC<OrderCardProps> = ({  
    orderkey,
    id,  
    Reciever,
    phone,
    total_price,  
    delivery_day,  
    delivery_clock,  
    distination, 
    Description, 
    iscancled = false,
    isarchived = false,
}) => {   

    return (  
        <div className={`mx-auto dark:bg-[#191919] bg-white rounded-2xl shadow-md 
                        p-4 mt-4 mb-2 border dark:border-white border-gray-300 w-full xl:w-[98%] 
                        text-right `}>
            <div className="flex justify-between items-center">
                <span className={`flex font-vazir dark:text-white text-[#191919] font-bold ml-auto text-sm 
                                sm:text-lg md:text-lg items-center`}>
                                    {isarchived && (
                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 
                                       text-xs px-2 py-1 rounded-full mr-2">
                            آرشیو
                        </span>
                    )}
                    {iscancled && (
                        <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 
                                       text-xs px-2 py-1 rounded-full mr-2">
                            لغو شده
                        </span>
                    )}
                    سفارش &zwnj;{id}
                    <RiCheckboxCircleFill className={`${
                        iscancled ? 'text-red-600' : 
                        isarchived ? 'text-gray-600' : 'text-green-600'
                        } rounded ml-1 text-lg relative sm:text-xl md:text-2xl`} />
                                            
                    
                </span>
            </div>
            
            <div className="flex flex-wrap items-center mb-2">  
                <div className="flex items-center mt-4">  
                    <span className={`dark:text-white text-[#191919] font-vazir text-xs lg:ml-8
                                     sm:text-lg md:text-lg`}>تومان</span>  
                    <span className={`dark:text-white text-[#191919] font-vazir ml-1 font-bold text-sm
                                     sm:text-lg md:text-lg`}>{total_price}</span>  
                </div>  
                
                <div className="flex flex-wrap items-center mt-6 space-x-1 sm:space-x-2 md:space-x-4 ml-auto mr-2"> 
                    <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {phone}
                        <FaPhone className='ml-1 text-xs sm:text-base md:text-sm rotate-90'/>
                    </span>  
                    <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {Reciever}
                        <IoMdPerson className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>   
                    <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {delivery_clock}
                        <FaRegClock className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>  
                    <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {delivery_day}
                        <LuCalendar className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>  
                </div>
            </div>  

            <div className="flex mt-3">
                <div className="flex space-x-4 mr-auto">
                    <button className="font-vazir bg-[#F18825] text-white rounded-md px-4 py-2 cursor-pointer 
                                    transition duration-300 lg:ml-7 text-xs sm:text-sm md:text-md lg:text-base">
                        {"فاکتور سفارش"}
                    </button>
                    <button className={`font-vazir bg-[#34A853] text-white rounded-md px-4 py-2 cursor-pointer 
                                    transition duration-300 text-xs sm:text-sm md:text-md lg:text-base
                                    ${iscancled || isarchived ? 'hidden' : ''}`}>
                        {"تحویل به پیک"}
                    </button>
                </div>

                <div className="flex flex-col text-right mr-2 min-w-[200px]">
                    <div className="flex items-start w-full">
                        <span className="text-[#877F7F] font-semibold font-vazir text-xs sm:text-sm md:text-sm text-right w-full">
                            {distination}
                        </span>
                        <IoLocationSharp className="text-[#877F7F] text-xs sm:text-base md:text-base ml-1 flex-shrink-0" />
                    </div>
                    <div className="flex items-start w-full mt-2">
                        <span className="text-[#877F7F] font-semibold font-vazir text-xs sm:text-sm md:text-sm text-right w-full">
                            {Description}
                        </span>
                        <TbFileDescription className="text-[#877F7F] text-xs sm:text-base md:text-base ml-1 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>  
    );  
};  

export default OrderCard;