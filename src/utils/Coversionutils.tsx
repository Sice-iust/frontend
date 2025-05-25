import moment from 'jalali-moment';


// Digits
export const convertToPersianNumbers = (num: string | number): string => {  
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
};  

// Time
export const convertTimeToPersian = (time: string): string => {  
    const [hours, minutes] = time.split(':');  
    return `${convertToPersianNumbers(hours)}:${convertToPersianNumbers(minutes)}`;  
};  

// Price
export const convertPrice = (price: string): string => {  
    const numberValue = parseFloat(price);  
    return numberValue.toLocaleString("fa-IR");  
};  

// Date
export const convertDateInPersian = (dateString: string): string => {  
    const parts = dateString.split('-'); 
    const [year,month, day] = parts; 
    // console.log(parts)
    // const [year, month, dayOfMonth] = persianDate.split(' '); 
    // const persianYear = convertToPersianNumbers(year);  
    // const persianMonth = convertToPersianNumbers(month);  
    // const persianDayOfMonth = convertToPersianNumbers(dayOfMonth);  

    return `${convertToPersianNumbers(year)}/${convertToPersianNumbers(month)}/${convertToPersianNumbers(day)}`; 
};  

//Number
export const convertPhoneNumberToPersian = (phoneNumber: string | null): string => {
    if (!phoneNumber) {
        return ""; // Or return a default value like "Invalid number"
    }
    const localNumber = phoneNumber.startsWith("+98") ? "0" + phoneNumber.slice(3) : phoneNumber;
    return convertToPersianNumbers(localNumber);
};


export const convertDateInPersianwithmonth = (dateString: string): string => {  
    const persianDate = moment(dateString, 'YYYY-MM-DD')
    .locale('fa')
    .format('D MMMM');
  const [day, month] = persianDate.split(' ');
  return `${month} ${convertToPersianNumbers(day)}  `;
};

const persianWeekDays = [
    "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"
  ];
  
export const dayname = (dateString: string): string => {
    const dayOfWeekIndex = moment(dateString, 'YYYY-MM-DD')
      .locale('fa')
      .day(); 
    return persianWeekDays[dayOfWeekIndex]; 
};
  

