import React, { useState} from "react"; 
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import {FaPhone} from 'react-icons/fa';




interface OrderCardProps {  
    orderkey:number;
    id: string;  
    Reciever : string;
    phone : string;
    total_price: string;  
    delivery_day: string;  
    delivery_clock: string;  
    distination: string;  
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
}) => {   

  return (  
    <div className={`mx-auto dark:bg-[#191919] bg-white rounded-2xl  
                    p-4 mt-4 mb-2 border dark:border-white border-black  w-full xl:w-[98%] 
                    text-right`}>
        <div className="flex justify-between items-center ">
            <span className={`flex font-vazir dark:text-white text-[#191919] font-bold ml-auto text-sm 
                            sm:text-lg
                            md:text-xl`}>
                سفارش &zwnj;{id}
                <RiCheckboxCircleFill className="text-green-600 rounded ml-1 text-lg relative 
                                                sm:text-xl
                                                md:text-2xl " />
            </span>
        </div>
        
        <div className="flex flex-wrap  items-center mb-2 ">  
            <div className="flex items-center mt-4">  
                <span className={`dark:text-white text-[#191919] font-vazir text-xs lg:ml-7
                                 sm:text-lg
                                 md:text-lg `}>تومان</span>  
                <span className={`dark:text-white text-[#191919]  font-vazir ml-1 font-vazir font-bold text-sm
                                 sm:text-lg
                                 md:text-lg`}>{total_price}</span>  
            </div>  
            
            <div className="flex flex-wrap items-center  mt-6 space-x-1 sm:space-x-2 md:space-x-3 ml-auto mr-2"> 
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{phone}
                    <FaPhone className='ml-1 text-xs sm:text-base md:text-sm rotate-90'/></span>  
                 <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{Reciever}
                    <IoMdPerson className='ml-1 text-xs sm:text-base md:text-base'/></span>   
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{delivery_clock}
                    <FaRegClock className='ml-1 text-xs sm:text-base md:text-base '/></span>  
                <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{delivery_day}
                    <LuCalendar className='ml-1 text-xs sm:text-base md:text-base'/></span>  
               
                {/* <span className='flex text-[#877F7F] font-semibold font-vazir text-xs 
                        sm:text-sm
                        md:text-sm '>{distination}
                    <IoLocationSharp className='text-xs sm:text-base md:text-base '/></span>   */}
            </div>
        </div>    

        
       
        <div className="flex space-x-4">  
            <button className="font-vazir bg-[#F18825] text-white rounded-md px-4 py-2  cursor-pointer
                               transition duration-300 
                               lg:ml-7 text-xs sm:text-sm md:text-md lg:text-lg"
                               >  
            {"فاکتور سفارش"}  
            </button>  
            <button className="font-vazir bg-[#34A853] text-white rounded-md px-4 py-2  cursor-pointer
                            transition duration-300 
                              text-xs sm:text-sm md:text-md lg:text-lg"
                             >  
                              
            {"تحویل به پیک"}   
            </button>  
        

           
            
        </div>
        
    </div>  
  );  
};  

export default OrderCard;  