'use client'
import React , {useState,useEffect} from 'react';
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import TimeCard from '../TimeCard/TimeCard';
import { convertDateInPersianwithmonth, convertToPersianNumbers, dayname } from '../../../utils/Coversionutils';
import { convertPrice } from '../../../utils/Coversionutils';
import { useCart } from "../../../context/Receiptcontext";

const TimeChoosing: React.FC = () => {
  const [times, setTimes] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const selectedDay = times.find((t) => t.id === selectedDateId);
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get("https://nanziback.liara.run/user/delivery/");
        const data = response.data; 
        const formattedTimes = data.map((dateObj) => ({
          id: dateObj.delivery_date, 
          label: dayname(dateObj.delivery_date), 
          date: convertDateInPersianwithmonth(dateObj.delivery_date), 
          shippingFee: dateObj.slots.every(slot => slot.shipping_fee === "0.00")
            ? "ارسال رایگان"
            : `${convertPrice(dateObj.slots[0].shipping_fee)} تومان`, 
          slots: dateObj.slots,
          isSelected: false,
        }));
        if (formattedTimes.length > 0) {
          setSelectedDateId(formattedTimes[0].id);
        }
        formattedTimes.sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime());
        setTimes(formattedTimes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchTimes();
  }, []);

  const handleSelect = (id: string) => {
    setTimes((prevTimes) =>
        prevTimes.map((time) =>
            ({ ...time, isSelected: time.id === id }) 
        )
    );
 };
  const handleDateSelect = (id: string) => {
    setSelectedDateId(id);
  };
  return (
    <>
    {loading ? (
          <p className="text-center min-h-40">در حال بارگذاری...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : 
        <div className='flex flex-col mr-10 mt-3'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <IoMdTime className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl'>انتخاب زمان تحویل</span>
            </div>
            <div className='flex flex-row-reverse mt-6 ml-10 gap-5 overflow-x-auto '>
                {times.map((time)=>
                    <TimeCard 
                        id={time.id} 
                        title={time.label} 
                        date={time.date}
                        shippingfee={time.shippingFee}  
                        isSelected={time.id === selectedDateId}
                        onSelect={handleDateSelect} />
                )}               
            </div>           
            {selectedDay && (
            <div className='box-content border-1 ml-10 h-auto rounded-2xl mb-5'>
              {selectedDay.slots.map((slot, index) => (
                <div
                  key={index}
                  className={`box-content h-14 w-full flex flex-row justify-between ${
                    index !== selectedDay.slots.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className='flex flex-row-revrse gap-4'>
                    <button className='rounded-full border h-6 w-6 mt-4'></button>
                    <span className='mt-4 font-bold text-lg'>
                      {convertToPersianNumbers(slot.start_time.split(':')[0])} - {convertToPersianNumbers(slot.end_time.split(':')[0])} 
                    </span>
                  </div>
                  {slot.max_orders-slot.current_fill<1 

                  }
                </div>
              ))}
            </div>
          )}
        </div>}
    </>
  );
};

export default TimeChoosing;