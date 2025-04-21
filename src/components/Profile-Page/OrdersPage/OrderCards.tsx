import React from 'react';
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import Image, { StaticImageData } from 'next/image';  

interface OrderCardProps {  
    id: string;  
    total_price: string;  
    delivery_day: string;  
    delivery_clock: string;  
    distination: string;  
    product_count: string;  
    product_photos: StaticImageData[]; 
  }  

const OrderCard: React.FC<OrderCardProps> = ({  
  id,  
  total_price,  
  delivery_day,  
  delivery_clock,  
  distination,  
  product_count,  
  product_photos,   
}) => {  
  return (  
    <div className="mx-auto bg-white rounded-2xl  
                    shadow-lg p-4 mt-4 mb-2 border border-black w-full xl:w-[98%] 
                    text-right">
        <div className="flex justify-between items-center ">
            <span className="flex font-vazir text-black font-bold ml-auto  text-sm 
                            sm:text-lg
                            md:text-xl">
                سفارش&zwnj;{id}
                <RiCheckboxCircleFill className="text-green-600 rounded ml-1 text-lg relative 
                                                sm:text-xl
                                                md:text-2xl " />
            </span>
        </div>
        
        <div className="flex flex-wrap  items-center mb-2 ">  
            <div className="flex items-center mt-4">  
                <span className="text-black font-vazir text-xs lg:ml-7
                                 sm:text-lg
                                 md:text-lg ">تومان</span>  
                <span className="text-black font-vazir ml-1 font-vazir font-bold text-sm
                                 sm:text-lg
                                 md:text-lg">{total_price}</span>  
            </div>  
            <div className="flex items-center  mt-6 ml-85 mt-4 space-x-1 sm:space-x-2 md:space-x-3 ml-auto">  
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{delivery_clock}
                    <FaRegClock className='ml-1 text-xs sm:text-base md:text-base '/></span>  
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{delivery_day}
                    <LuCalendar className='ml-1 text-xs sm:text-base md:text-base'/></span>  
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{distination}
                    <IoLocationSharp className='text-xs sm:text-base md:text-base '/></span>  
            </div>
        </div>    

        
        <p className="font-vazir text-black text-semibold mb-4 text-left mr-auto mt-1 lg:ml-7 
                    text-xs 
                    sm:text-base 
                    md:text-base">  
            {"به سفارش خود چه امتیازی میدهید؟"}{' '}  
            <span className="font-vazir text-green-500 font-semibold mt-1 underline">ثبت نظر</span>  
        </p>
        <div className="flex space-x-4">  
            <button className="font-vazir bg-gray-200 text-gray-700 rounded-md px-4 py-2 
                               hover:bg-gray-300 transition duration-300 
                               lg:ml-7 text-xs sm:text-sm md:text-md lg:text-lg">  
            {"سفارش مجدد"}  
            </button>  
            <button className="font-vazir bg-orange-500 text-white rounded-md px-4 py-2 
                              hover:bg-orange-600 transition duration-300 
                              text-xs sm:text-sm md:text-md lg:text-lg">  
            {"فاکتور سفارش"}  
            </button>  
        

            <div className="-mt-3 flex flex-wrap items-center justify-start ml-auto">
                <div className="flex space-x-1">
                    <span className="text-gray-500 text-sm sm:text-base md:text-md lg:text-lg">نان دیگر</span>
                    <span className="text-gray-500 text-sm  sm:text-base md:text-md lg:text-lg">{product_count}+</span>
                </div>

                <div className="flex space-x-2 ml-1">
                    {product_photos.map((photo, index) => (
                    <div key={index} className="relative">
                        <Image
                        src={photo}
                        alt="product"
                        className="w-10 h-10 rounded-md -mt-2"
                        layout="intrinsic"
                        />
                        <span className="absolute bottom-0 left-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex 
                                        items-center justify-center -mb-1 -ml-1">
                        {product_count}
                        </span>
                    </div>
                    ))}
                </div>
                </div>
        </div>
    </div>  
  );  
};  

export default OrderCard;  