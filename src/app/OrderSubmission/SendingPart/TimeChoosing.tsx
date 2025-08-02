'use client'
import React , {useState,useEffect} from 'react';
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import TimeCard from '../TimeCard/TimeCard';
import { convertDateInPersianwithmonth, convertToPersianNumbers, dayname } from '../../../utils/Coversionutils';
import { convertPrice } from '../../../utils/Coversionutils';
import { useCart } from "../../../context/Receiptcontext";

const TimeChoosing: React.FC = () => {

  const {fetchdeliverydata,handleSlotSelect,selectedDateId,selectedSlotId} = useCart();

  const [times, setTimes] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [changed , setchanged] = useState<string | null>(null);
  const selectedDay = times.find((t) => t.id === (changed));
 
  

  
 
  useEffect(() => {
    fetchdeliverydata();
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


  useEffect(() => {
    if (selectedDateId && times.length > 0) {
      setchanged(selectedDateId === "0" ? times[0]?.id : selectedDateId);
    }
  }, [selectedDateId, times]); 
  


  const handleDateSelect = (id: string) => {
    setchanged(id)

  };
  
  return (
    <>
    {loading ? (
          <p className="text-center min-h-90"> </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : 
        <div className='flex flex-col mr-10 mt-3'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <IoMdTime className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl dark:text-white'>انتخاب زمان تحویل</span>
            </div>
            <div className='flex flex-row-reverse mt-6 ml-10 gap-5 overflow-x-auto '>
                {times.map((time)=>
                    <TimeCard 
                        id={time.id} 
                        title={time.label} 
                        date={time.date}
                        shippingfee={time.shippingFee}  
                        isSelected={time.id === changed}
                        onSelect={handleDateSelect} />
                )}               
            </div>           
            {selectedDay && (
            <div className='box-content border-1 ml-10 h-auto rounded-2xl mb-5 dark:border-white'>
              {selectedDay.slots.map((slot, index) => (
                <div
                  key={index}
                  className={`box-content h-14 w-full flex flex-row-reverse justify-between ${
                    index !== selectedDay.slots.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className='flex flex-row-reverse gap-4'>
                  <button
                      className={`rounded-full border h-6 w-6 mt-4 mr-5 flex items-center justify-center
                                 ${slot.max_orders - slot.current_fill < 1 ? "border-gray-400 cursor-not-allowed" 
                                : "border-black cursor-pointer"} 
                        ${selectedSlotId === slot.id ? "bg-[#F18825]" : "bg-white" }`}
                      disabled={slot.max_orders - slot.current_fill < 1}
                      onClick={() => handleSlotSelect(slot.id)}
                    >
                      {selectedSlotId === slot.id && <div className='bg-white dark:bg-[#191919] w-2 h-2 rounded-full'></div>}
                    </button>
                    <span className={`mt-4 font-bold text-lg ${slot.max_orders - slot.current_fill < 1 ? "text-gray-400" : "text-black dark:text-white"}`}>
                      {convertToPersianNumbers(slot.start_time.split(':')[0])} - {convertToPersianNumbers(slot.end_time.split(':')[0])} 
                    </span>
                  </div>
                  {slot.max_orders - slot.current_fill < 1 && (
                    <div className='box-content h-8 w-20  rounded-4xl bg-orange-300 
                                    text-lg text-orange-600 pt-1 ml-5 mt-3 text-center items-center'>
                      تکمیل
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>}
    </>
  );
};

export default TimeChoosing;