'use client'
import React , {useState,useEffect} from 'react';
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import TimeCard from '../TimeCard/TimeCard';
import { convertDateInPersianwithmonth, dayname } from '../../../utils/Coversionutils';
import { convertPrice } from '../../../utils/Coversionutils';
import { useCart } from "../../../context/Receiptcontext";

const TimeChoosing: React.FC = () => {
  const [times, setTimes] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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
          slots: dateObj.slots.map((slot) => ({
            startTime: slot.start_time,
            endTime: slot.end_time,
          })),
          isSelected: false,
        }));

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
            <div className='flex flex-row-reverse mt-6 mb-5 ml-10 gap-5 overflow-x-auto '>
                {times.map((time)=>
                    <TimeCard 
                        id={time.id} 
                        title={time.label} 
                        date={time.date}
                        shippingfee={time.shippingFee}  
                        isSelected={time.isSelected}
                        onSelect={handleSelect}/>
                )}               
            </div>           

        </div>}
    </>
  );
};

export default TimeChoosing;