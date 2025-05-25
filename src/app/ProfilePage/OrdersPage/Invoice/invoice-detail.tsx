import React from 'react';
import {Item} from './Orders-invoice-popup'
import { convertToPersianNumbers } from '../../../../utils/Coversionutils';
import { convertPrice } from '../../../../utils/Coversionutils';

interface InvoiceProps {  
    orderId: number;
    payment:string;
    profit ? : string;
    shippingfee?:string;
    discount:string;
    Product:Item[];
    total_price?:string;

}  

const Invoice: React.FC<InvoiceProps> = ({orderId,payment,shippingfee,discount,Product,total_price,profit}) => {
    
    console.log("shippingfee:",shippingfee);
    return ( 
        <>
        {Product.length > 0 && (
            <div className=" flex flex-col pt-2 lg:p-3">
                {Product.map(({ id, name, price, quantity }) => (
                    <div key={id} className="flex flex-wrap flex-row-reverse py-2">
                       <span className="text-sm font-vazir font-medium text-right ml-auto -ml-auto text-gray-600
                                        break-words whitespace-wrap max-w-[100%] 
                                        sm:w-auto sm:text-base">{name}</span>
                        <div className="flex items-center whitespace-nowrap flex-row-reverse flex-shrink-0 ">
                            <span className="text-sm ml-1 text-gray-500 sm:text-base">× {convertToPersianNumbers(quantity)}</span>
                            <span className="text-sm sm:text-base">{convertPrice(price)}</span>
                            <span className="text-sm font-vazir font-medium text-right mr-2 text-gray-600 
                                            sm:text-[14px]">تومان</span>
                        </div>
                    </div>
                ))}

                {profit? Number(profit) >0 && (
                    <div className="flex flex-row-reverse py-2 justify-between ">  
                        <span className="text-[14px] font-vazir font-medium 
                                         text-right text-green-600 font-semibold ">سود شما از این خرید</span>
                        <span className="flex flex-row-reverse">
                        <span className="text-green-600 font-semibold">{convertPrice(profit)}</span>    
                        <span className="text-[14px] font-vazir font-medium 
                                         text-right mr-2 text-green-600">تومان</span>    
                        </span>
                    </div>                            
                    ) : null
                }

                {[
                    { label: "جمع کل", value: convertPrice(payment),  color: 'black'},
                    shippingfee ? (
                        Number(shippingfee) === -1 ? { 
                          label:null, 
                          value:-1,
                          showCurrency: false
                        } :
                         {
                          label: "هزینه ارسال",
                          value: Number(shippingfee) === 0 ? "رایگان" : convertPrice(shippingfee),
                          showCurrency: Number(shippingfee) !== 0
                        }
                      ) : null,
                      
                    discount ? { label: "تخفیف", value: convertPrice(discount), color: "text-[#F18825]" }: null,
                    total_price ? { label: "مبلغ پرداخت شده", value: total_price, bold: true ,color: 'gray-400' } :null
                    ].filter(entry => entry !== null ) .map(({ label, value, color = "text-gray-500", bold = false , showCurrency=true }, index) => (
                    <div key={index} className={`flex flex-row-reverse py-2  ${index === 0 || index === 3 ? 
                        "border-t pt-4 mt-2" : ""}`}>
                        {label !== null && (
                        <span className={`text-sm font-vazir font-medium text-right ml-auto -ml-auto sm:text-[15px] 
                            ${bold ? "font-semibold" : ""}`}>
                            {label}
                        </span>)}
                        {showCurrency && value !== "رایگان" && (
                            <>
                            <span className={`ml-1 text-gray-600 ${bold ? "font-bold text-lg" : ""}`}>{value}</span>
                            <span className="text-[14px] font-vazir font-medium text-right mr-2 text-gray-600 mt-0.5">
                                تومان
                            </span>
                            </>
                        )}
                        {value === "رایگان" && (
                            <span className="text-[17px]  font-vazir font-medium text-[#F18825]">رایگان</span>
                        )}
                        {value===-1 && (
                            <div className="bg-[#FFD0A4] text-[#6C6464] text-xs font-medium p-2 
                                            text-right ml-auto rounded-2xl">
                                هزینه ارسال پس از انتخاب زمان تحویل محاسبه میشود
                            </div>
                      
                        )}
                       
                        

                    </div>
                ))}

                
            </div>
        )}
        </> 
        
    );  
};  

export default Invoice;  