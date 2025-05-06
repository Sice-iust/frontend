import React, { useState } from 'react';
import { useTheme } from "../../theme"
import AddressModal from "../AddressModal/AddressModal"
import { CgNotes } from "react-icons/cg";
import { useCart } from "../../../context/Receiptcontext";
import Image from 'next/image';
import { convertToPersianNumbers } from '../../../utils/Coversionutils';
export default function SummaryPart() {
  const { isDarkMode } = useTheme();
  const { cartItems, counts, totalDiscount, totalActualPrice, loading ,
      incrementQuantity, decrementQuantity, removeItem} = useCart(); 
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='box-content bg-white rounded-2xl h-auto mt-5'>
        <div className='flex flex-col'>
          <div className='flex flex-row-reverse justify-between mr-10 ml-10'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <CgNotes className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl'>خلاصه سفارش</span>
            </div>
          </div>
          <div className='flex flex-row-reverse mt-6 mr-10 ml-10 mb-6 gap-7 overflow-x-auto max-w-230'>
                {cartItems.map((item)=>(
                    <div className='box-content border-1 min-w-50 h-55 w-auto rounded-2xl flex-shrink-0 '>
                        <div className='flex flex-col mt-3 gap-3 justify-center items-center'>
                            {/* <Image src={item.product.photo} alt='bread'/> */}
                            <span className='p-3 text-right text-md font-semibold'>{item.product.name}</span>
                            <div className="flex items-center space-x-2">  
                                <button  
                                    className={`${isDarkMode ? "bg-black" : "bg-white"}  border-3 ${item.quantity >= item.product.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" : "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 ${item.quantity >= item.product.stock ? "cursor-not-allowed hover:bg-white" : "hover:bg-green-500 hover:text-white hover:scale-110"}`}  
                                    onClick={() => incrementQuantity(item.product.id)}  
                                    disabled={item.quantity >= item.product.stock}  
                                    aria-label={`Increase quantity of ${item.product.name}`}  
                                >  
                                    +  
                                </button>  
                                <span className={`text-lg ${isDarkMode ? "text-[#ffffff]" : "text-black"} font-semibold`}>{convertToPersianNumbers(item.quantity)}</span>  
                                {item.quantity === 1 ? (  
                                    <button  
                                        className={`${isDarkMode ? "bg-black" : "bg-white"} cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110`}  
                                        onClick={() => removeItem(item.product.id)}  
                                        aria-label={`Remove ${item.product.name}`}  
                                    >  
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                                            <path d="M3 6h18" />  
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                            <path d="M10 11v6" />  
                                            <path d="M14 11v6" />  
                                            <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />  
                                        </svg>  
                                    </button>  
                                ) : (  
                                    <button  
                                        className={`${isDarkMode ? "bg-black" : "bg-white"} cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110`} 
                                        onClick={() => decrementQuantity(item.product.id)}  
                                        aria-label={`Decrease quantity of ${item.product.name}`}  
                                    >  
                                        <span className="text-xl">-</span>  
                                    </button>  
                                )}  
                            </div>
                            <span className={` ${isDarkMode ? "text-[#ffffff]" : "text-black"} text-[15px] text-right font-vazir font-medium`}>  
                                قیمت: {convertToPersianNumbers(Number(item.discounted_price).toLocaleString())} تومان  
                            </span>                               
                        </div>
                    </div>
                    
                ))
                }
            </div>
        </div>
      </div>

      {isModalOpen && <AddressModal onClose={handleCloseModal} id_user={localStorage.getItem("token")} />}
    </>
  );
}