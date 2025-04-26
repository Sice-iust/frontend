import React, {useEffect,useState} from 'react';  
import { RxCross1 } from "react-icons/rx";
import {Item} from './Orders-invoice-popup'
import { convertToPersianNumbers } from '../../../../utils/Coversionutils';
import { convertPrice } from '../../../../utils/Coversionutils';

interface InvoiceProps {  
    orderId: number;
    payment:string;
    shippingfee:string;
    discount:string;
    Product:Item[];
    total_price:string;

}  

const Invoice: React.FC<InvoiceProps> = ({orderId,payment,shippingfee,discount,Product,total_price}) => {
    
    console.log("price:",total_price);
    return ( 
        <>
        {Product.length > 0 && (
            <div className=" flex flex-col pt-2 lg:p-3">
                {Product.map(({ id, name, price, quantity }) => (
                    <div key={id} className="flex flex-wrap flex-row-reverse py-2">
                       <span className="text-sm font-vazir font-medium text-right ml-auto -ml-auto 
                                        break-words whitespace-wrap max-w-[45%] 
                                        sm:w-auto sm:text-base">{name}</span>
                        <div className="flex items-center whitespace-nowrap flex-row-reverse flex-shrink-0 ">
                            <span className="text-sm ml-1 text-gray-500 sm:text-base">× {convertToPersianNumbers(quantity)}</span>
                            <span className="text-sm sm:text-base">{convertPrice(price)}</span>
                            <span className="text-sm font-vazir font-medium text-right mr-2 text-gray-600 
                                            sm:text-base">تومان</span>
                        </div>
                    </div>
                ))}

                {[
                    { label: "جمع کل", value: convertPrice(payment)},
                    { label: "هزینه ارسال", value: convertPrice(shippingfee) },
                    { label: "تخفیف", value: convertPrice(discount), color: "text-[#F18825]" },
                    { label: "مبلغ پرداخت شده", value: total_price, bold: true ,color: 'gray-400' }
                ].map(({ label, value, color = "text-gray-500", bold = false }, index) => (
                    <div key={index} className={`flex flex-row-reverse py-2 ${index === 0 || index === 3 ? 
                        "border-t mt-2" : ""}`}>
                        <span className={`text-sm font-vazir font-medium text-right ml-auto -ml-auto sm:text-[17px] 
                            ${bold ? "font-semibold" : ""}`}>
                            {label}
                        </span>
                        <span className={`ml-1 ${color} ${bold ? "font-bold font-2xl" : ""}`}>{(value)}</span>
                        <span className="text-sm font-vazir font-medium text-right mr-2 text-gray-600 ">تومان</span>
                    </div>
                ))}

                
            </div>
        )}
        </> 
        
    );  
};  

export default Invoice;  