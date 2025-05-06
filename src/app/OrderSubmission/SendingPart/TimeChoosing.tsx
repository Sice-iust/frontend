import React from 'react';
import { IoMdTime } from "react-icons/io";
import TimeCard from '../TimeCard/TimeCard';

const TimeChoosing: React.FC = () => {
    const times = [
        {
          id: 1,
          label: "چهارشنبه",
          date:"۱۰ اسفند",
          isSelected:true,
        },
        {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
          {
            id: 1,
            label: "شنبه",
            date:"۱۰ اسفند",
            isSelected:false,
          },
      ];
  return (
    <>
        <div className='flex flex-col mr-10 mt-3'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <IoMdTime className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl'>انتخاب زمان تحویل</span>
            </div>
            <div className='flex flex-row-reverse mt-6 mr-10 ml-10 mb-6 gap-7 overflow-x-auto '>
                {times.map((time)=>
                    <TimeCard 
                        id={time.id} 
                        title={time.label} 
                        date={time.date} 
                        isSelected={time.isSelected}/>
                )}               
            </div>           

        </div>
    </>
  );
};

export default TimeChoosing;