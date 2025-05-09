// app/profile/orders/[orderId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';

type OrderStatus = {
  status: string;
  destination: string;
  recipient: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  phoneNumber: string;
};

export default function OrderStatusPage() {
  const { orderId } = useParams();
  
  // Sample data - replace with your actual data fetching logic
  const orderData: OrderStatus = {
    status: "سفارش شما به یک تحویل داده شد",
    destination: "خانه - تهران، شهریار، خیابان فلان کوچه پهمان یانک ۲۳۰ طبقه ۷",
    recipient: "نام تحویل گیرنده",
    deliveryDate: "شنبه ۷ اسفند",
    deliveryTime: "بازه ۱۶ تا ۱۷",
    notes: "به درب منزل تحویل داده شود",
    phoneNumber: "۹۱۲۳۴۵۶۷۸۹"
  };

  return (
    <div className="p-4 font-vazir" dir="rtl">
      {/* Order Status Header */}
      <h1 className="text-xl font-bold mb-6">وضعیت سفارش: {orderId}</h1>
      <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6">
        {orderData.status}
      </div>

      {/* Delivery Details */}
      <h2 className="text-xl font-semibold mb-4">جزئیات ارسال:</h2>
      
      <div className="space-y-4">
        {/* Destination */}
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="text-[#B8681D] mt-1" />
          <div>
            <p className="font-medium text-[#B8681D]">مقصد: <span className='text-[#2A2828]'>{orderData.destination}</span></p>
            
          </div>
        </div>

        {/* Recipient */}
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="text-[#B8681D]  mt-1" />
          <div>
            <p className="font-medium text-[#B8681D] ">تحویل گیرنده:</p>
            <p>{orderData.recipient}</p>
          </div>
        </div>

        {/* Delivery Date/Time */}
        <div className="flex items-start gap-2">
          <FaCalendarAlt className="text-gray-500 mt-1" />
          <div>
            <p className="font-medium">تاریخ تحویل:</p>
            <p>{orderData.deliveryDate} - {orderData.deliveryTime}</p>
          </div>
        </div>

        {/* Order Notes */}
        <div className="flex items-start gap-2">
          <FaInfoCircle className="text-gray-500 mt-1" />
          <div>
            <p className="font-medium">توضیحات سفارش:</p>
            <p>{orderData.notes}</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-start gap-2">
          <FaPhone className="text-gray-500 mt-1" />
          <div>
            <p className="font-medium">شماره تماس:</p>
            <p>{orderData.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3">
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg">
          پیگیری پیک
        </button>
        <button className="border border-amber-600 text-amber-600 px-4 py-2 rounded-lg">
          تماس با پشتیبانی
        </button>
      </div>
    </div>
  );
}