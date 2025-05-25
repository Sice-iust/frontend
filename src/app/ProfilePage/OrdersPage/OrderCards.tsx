import React, { useState} from "react"; 
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import Image, { StaticImageData } from 'next/image'; 
import { Product } from "./OrdersPage"
import InvoicePopup from './Invoice/Orders-invoice-popup';
import CommentsPopup from "./Comments/comments-popup";
import ReorderPopup from "./Reorder/Reorder-Popup"
import { useTheme } from "../../../components/theme";




interface OrderCardProps {  
    orderkey:number;
    id: string;  
    total_price: string;  
    delivery_day: string;  
    delivery_clock: string;  
    distination: string;  
    product_count: string;  
    product_photos: Product[]; 
  }  

const OrderCard: React.FC<OrderCardProps> = ({  
  orderkey,
  id,  
  total_price,  
  delivery_day,  
  delivery_clock,  
  distination,  
  product_count,  
  product_photos,   
}) => {  
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);

  const handleInvoiceOpen = () => setIsInvoiceOpen(true); 
  const handleInvoiceClose = () => setIsInvoiceOpen(false); 

  const handleCommentsOpen = () => setIsCommentsOpen(true); 
  const handleCommentsClose = () => setIsCommentsOpen(false); 

  const handleReorderOpen = () => setIsReorderOpen(true); 
  const handleReorderClose = () => setIsReorderOpen(false); 

  return (  
    <div className={`mx-auto dark:bg-[#191919] bg-white rounded-2xl  
                    shadow-lg p-4 mt-4 mb-2 border dark:border-white border-black  w-full xl:w-[98%] 
                    text-right`}>
        <div className="flex justify-between items-center ">
            <span className={`flex font-vazir dark:text-white text-[#191919] font-bold ml-auto text-sm 
                            sm:text-lg
                            md:text-xl`}>
                سفارش&zwnj;{id}
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
            <div className="flex flex-wrap items-center  mt-6 space-x-1 sm:space-x-2 md:space-x-3 ml-auto">  
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

        
        <p className={`dark:text-white text-[#191919] font-vazir  text-semibold mb-4 text-center ml-auto 
                       mt-1 lg:ml-7 sm:text-left sm:mr-auto
                    text-xs 
                    sm:text-base 
                    md:text-base`}>  
            {"به سفارش خود چه امتیازی میدهید؟"}{' '}  
            <span className="font-vazir text-green-500 font-semibold mt-1 underline cursor-pointer" 
                            onClick={handleCommentsOpen}>ثبت نظر</span>  
        </p>
        <div className="flex space-x-4">  
            <button className="font-vazir bg-gray-200 text-gray-700 rounded-md px-4 py-2  cursor-pointer
                               transition duration-300 
                               lg:ml-7 text-xs sm:text-sm md:text-md lg:text-lg"
                               onClick={handleReorderOpen}>  
            {"سفارش مجدد"}  
            </button>  
            <button className="font-vazir bg-[#F18825] text-white rounded-md px-4 py-2  cursor-pointer
                            transition duration-300 
                              text-xs sm:text-sm md:text-md lg:text-lg"
                              onClick={handleInvoiceOpen}>  
                              
            {"فاکتور سفارش"}  
            </button>  
        

            <div className="flex items-center ml-auto">
                {product_count != "0" && (
                    <div className="flex items-center mr-2">
                    <span className="text-gray-500 text-sm  hidden lg:flex lg:text-lg">نان دیگر</span>
                    <span className="text-gray-500 text-sm hidden lg:flex lg:text-lg mr-1">+{product_count}</span>
                    </div>
                )}

                <div className="flex space-x-2 hidden lg:flex">
                    {product_photos?.map((prod, index) => (
                    <div key={index} className="relative w-8 h-12">
                        <Image
                        src={prod.photo}
                        alt="product"
                        className="w-full h-full rounded-md object-cover"
                        layout="fill"
                        />
                        <span className="absolute bottom-0 left-0 bg-[#F18825] text-white text-xs rounded-full 
                                    w-5 h-5 flex items-center justify-center transform translate-x-[-25%] 
                                    translate-y-[25%]">
                        {prod.quantity}
                        </span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        <InvoicePopup isOpen={isInvoiceOpen} onClose={handleInvoiceClose} orderId={orderkey} total_price_after={total_price} />  
        <CommentsPopup isOpen={isCommentsOpen} onClose={handleCommentsClose} orderId={orderkey} total_price_after={total_price} />
        <ReorderPopup isOpen={isReorderOpen} onClose={handleReorderClose} />  
    </div>  
  );  
};  

export default OrderCard;  