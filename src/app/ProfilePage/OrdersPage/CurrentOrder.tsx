'use client';

import { useParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';
import { IoMdPerson } from "react-icons/io";

type OrderStatus = 'تحویل داده شد' | 'در حال پردازش' | 'لغو شده' | 'در راه';

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
  const orderId = params.orderId as string; 

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-lg p-4 mt-4 mb-2 border border-black w-full xl:w-[98%] text-right">
      <div className="flex flex-col lg:flex-row gap-6 lg:flex-row-reverse"> 
        {/* Right Side: Order Details */}
        <div className="w-full lg:w-1/2" dir="rtl">
          {/* Order Status Tracker */}
          <div className="flex justify-center items-center gap-4 mb-6">
            {[1, 2, 3].map(step => (
              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step <= status ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                {step}
              </div>
            ))}
          </div>

          {/* Order Status Header */}
          <div className={`p-3 rounded-lg mb-6 ${status === 3 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            <div className="flex items-center gap-2">
              {status === 4 && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{status}</span>
            </div>
          </div>

          {/* Order Details */}
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
              <p className="font-medium text-[#B8681D]">تاریخ تحویل: <span className='text-[#2A2828] mr-1.5'>{delivery_day}</span></p>
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
      </div>
    </div>
  );
}