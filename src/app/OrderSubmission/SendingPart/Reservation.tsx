import { useState } from "react";
import {startOfMonth, format, getMonth, getDaysInMonth } from "date-fns-jalali";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { IoMdClose } from "react-icons/io";

const persianMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور","مهر", "آبان",
                        "آذر", "دی", "بهمن", "اسفند"];
const persianWeekDays =["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

const Reservation = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<{ [key: string]: string }>({});
    const currentDate = new Date();
    const currentYear = format(currentDate, "yyyy"); 
    const monthIndex = getMonth(currentDate);
    const currentMonth = persianMonths[monthIndex];
    const daysInMonth = getDaysInMonth(currentDate);
    const today = format(currentDate, "dd");
    const firstDayOfMonth = format(startOfMonth(currentDate), "EEEE"); 
    const firstDayIndex = persianWeekDays.indexOf(firstDayOfMonth);

    
    const handleDayClick = (day: number) => {
        if (day >= parseInt(today)) 
        {
            setSelectedDate(`${day}`);
        }
    };
    
    const handleTimeSelection = (time: string) => {
        if (selectedDate) 
        {
            if (timeSlots[selectedDate] === time) 
            {
              const updatedSlots = { ...timeSlots };
              delete updatedSlots[selectedDate]; 
              setTimeSlots(updatedSlots);
            } 
            else 
            {
              setTimeSlots({ ...timeSlots, [selectedDate]: time });
            }
        }
    };
    
    return (
        <div className="p-6 max-w-xl mx-auto rounded-lg" style={{ direction: "rtl" }}>
            <h2 className="text-lg font-bold text-center text-black">
                {currentMonth} {convertToPersianNumbers(currentYear)}
            </h2>

            <div className="grid grid-cols-7 gap-3 text-center mt-4 bg-white p-4 rounded-lg shadow-md">
                {persianWeekDays.map((day) => (
                <div key={day} className="font-bold text-gray-700">{day}</div>
                ))}

                {Array(firstDayIndex).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="opacity-0">X</div>
                ))}

                {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const isSelected = timeSlots[day]; 
                const isPast = day <= parseInt(today);

                return (
                    <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={isPast}
                        className={`p-3 rounded-full w-12 h-12 font-semibold transition cursor-pointer
                            ${isSelected ? "bg-[#F18825] text-white" 
                            : isPast ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : "bg-white text-gray-700 hover:bg-gray-200"}`}
                        >
                        {convertToPersianNumbers(day)}
                    </button>
                );
                })}
            </div>

            {selectedDate && (
                <div className="fixed inset-0 flex justify-center items-center z-10">
                    <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 max-w-xs">
                        <IoMdClose 
                        className="absolute right-3 top-3 h-6 w-6 text-gray-500 hover:text-gray-700 
                                    cursor-pointer transition" 
                        onClick={() => setSelectedDate(null)} 
                        />

                        <h3 className="text-lg font-semibold text-center mb-4">
                            {convertToPersianNumbers(selectedDate)} {currentMonth}
                        </h3>

                        <div className="flex flex-col space-y-2">
                            {["09:00", "12:00", "15:00"].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelection(time)}
                                    className={`p-2 border-2 rounded text-center transition font-semibold cursor-pointer
                                        ${timeSlots[selectedDate] === time ? "bg-[#F18825] text-white" 
                                            : "bg-white border-[#F18825] text-black"}
                                    `}
                                    >
                                    {convertToPersianNumbers(time)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservation;