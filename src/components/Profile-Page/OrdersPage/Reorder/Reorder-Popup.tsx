import React, {useEffect,useState} from 'react';  
import { RxCross1 } from "react-icons/rx";


interface InvoicePopupProps {  
    isOpen: boolean;  
    onClose: () => void;  
}  

const InvoicePopup: React.FC<InvoicePopupProps> = ({ isOpen, onClose}) => {
    
    if (!isOpen) return null;  
    
    return (  
        <div className="fixed inset-0 z-10 overflow-y-auto ">  
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity  " aria-hidden="true"></div>  
                <div className="flex items-center justify-center min-h-full  text-center lg:p-4">  
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left 
                                    shadow-xl transition-all h-screen w-full
                                    sm:my-8 sm:w-full sm:max-w-lg sm:h-auto">  
                        <div className="bg-white px-6 pt-5 pb-4 text-right"> 
                            <RxCross1 className="cursor-pointer ml-auto" onClick={onClose}  />

                            <div className="bg-white  font-vazir   overflow-y-auto lg:p-1 lg:mt-0">  
                            <p className="font-vazir text-base text-center text-gray-800 mt-1 mb-4 font-bold">
                                    {"لطفا برای سفارش مجدد آدرس خود را مشخص کنید"}
                            </p> 
                                <div className="flex justify-center space-x-4 mt-5">
                                    <button className="font-vazir bg-gray-200 text-gray-700 rounded-md px-9 py-2 cursor-pointer 
                                                        transition duration-300 text-xs font-bold
                                                        sm:text-sm md:text-md lg:text-base">
                                        {"ادامه با آدرس جدید"}
                                    </button>  
                                    <button className="font-vazir bg-[#F18825] text-white rounded-md px-9 py-2 cursor-pointer 
                                                        transition duration-300 text-xs font-bold
                                                        sm:text-sm md:text-md lg:text-base">
                                        {"ادامه با آدرس سفارش"}
                                    </button>
                                </div>
        
                            </div>  
                        </div>  
                    </div>  
                </div>  
        </div>  
    );  
};  

export default InvoicePopup;  