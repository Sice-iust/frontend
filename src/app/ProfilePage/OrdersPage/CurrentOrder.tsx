'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaInfoCircle, FaTruck } from 'react-icons/fa';
import { IoMdPerson } from "react-icons/io";
import Invoice from './Invoice/invoice-detail';

export interface Item { 
    id : number;
    name:string;
    price:string; 
    photo: string; 
    quantity: number; 
} 

interface OrderStatusPageProps { 
  orderkey: number;
  id: string;  
  total_price: string;  
  delivery_day: string;  
  delivery_clock: string;  
  distination: string;  
  address: string;
  reciver: string;
  product_count: string;  
  status: number;
  phone_number: string;
}

export default function OrderStatusPage({ orderkey, id, total_price, delivery_day, delivery_clock, distination, address, reciver, product_count, status, phone_number }: OrderStatusPageProps) {  
  const params = useParams();
  const [invoiceData, setInvoiceData] = useState<any>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {  
    const fetchInvoiceData = async () => {  
      try {  
        const response = await fetch(`https://nanziback.liara.run/user/order/invoice/${orderkey}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {  
          throw new Error('Failed to fetch invoice data');  
        }  
        const data = await response.json();  
                console.log("dataatatta");

        console.log(data);
        setInvoiceData(data);  
      } catch (err) {  
        setError(err.message);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchInvoiceData();  
  }, [orderkey]);  


  return (
<div className="mx-auto bg-white rounded-2xl shadow-lg p-4 mt-4 mb-2 border border-black w-full xl:w-[98%] text-right overflow-auto max-h-screen">    
    <div className="flex flex-col  gap-6 lg:flex-row-reverse"> 
        <div className="w-full lg:w-1/2" dir="rtl">
            <h2 className="text-xl font-bold mb-4">جزئیات سفارش:</h2>
          
            <div className="flex items-center relative">
                {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                    <div className="relative ">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${step <= status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                        {step}
                    </div>
                    
                    </div>
                    
                    {index < 3 && (
                    <div className={`h-1 w-16 mx-1 relative
                        ${step < status ? "bg-green-500" : "bg-gray-200"}`}>
                        <div className={`absolute inset-0  bg-green-500 origin-left scale-x-0 transition-all duration-500
                        ${step < status ? "scale-x-100" : ""}`}></div>
                    </div>
                    )}
                </React.Fragment>
                ))}
            </div>
            <div className={`p-3 rounded-lg mb-3 mt-5` }>
                <div className="flex items-center gap-2">
                    
                    <FaTruck className="text-amber-500 text-xl" />
                    <span className="font-medium">
                    {status === 4 ? "بسته تحویل مقصد داده شده است" :
                    status === 3 ? "بسته تحویل پیک داده شده است" :
                    status === 2 ? "در حال آماده سازی بسته" :
                    status === 1 ? "در انتظار تایید فروشکاه" :
                    "لغو شده"}
                    </span>
                </div>
            </div>

          <h2 className="text-xl font-semibold mb-4">جزئیات ارسال:</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[#B8681D] mt-1" />
              <p className="font-medium text-[#B8681D]">مقصد: 
                <span className='text-[#2A2828] mr-1.5 font-bold'>{distination} - 
                  <span className='font-normal'>{address}</span>
                </span>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <IoMdPerson className="text-[#B8681D] mt-1" />
              <p className="font-medium text-[#B8681D] ">تحویل گیرنده: <span className='text-[#2A2828] mr-1.5'>{reciver}</span></p>
            </div>
            <div className="flex items-start gap-2">
              <FaCalendarAlt className="text-[#B8681D] mt-1" />
              <p className="font-medium text-[#B8681D]">تاریخ تحویل: <span className='text-[#2A2828] mr-1.5'>
                <span className='font-bold'> شنبه -</span>
                {delivery_day} - {delivery_clock}</span></p>
            </div>
            <div className="flex items-start gap-2">
              <FaInfoCircle className="text-[#B8681D] mt-1" />
              <p className="font-medium text-[#B8681D]">توضیحات سفارش: <span className='text-[#2A2828] mr-1.5'>فاقد توضیحات.</span></p>
            </div>
            <div className="flex items-start gap-2">
              <FaPhone className="text-[#B8681D] mt-1" />
              <p className="font-medium text-[#B8681D]">شماره تماس: <span className='text-[#2A2828] mr-1.5'>{phone_number}</span></p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2  rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">فاکتور سفارش</h2>
         <Invoice orderId={orderkey} 
            payment={invoiceData?.payment ?? "0"} 
            shippingfee={invoiceData?.shipping_fee ?? "0"} 
            discount={invoiceData?.discount ?? "0"} 
            total_price={total_price}
            Product={(invoiceData?.items ?? []).map(item => ({
                id: item?.product?.id ?? 0,
                name: item?.product?.name ?? "نامشخص",
                price: item?.product?.price ?? "0",
                photo: item?.product?.photo ?? "",
                quantity: item?.quantity ?? 0,
            }))}
        />
        </div>

      </div>
    </div>
  );
}