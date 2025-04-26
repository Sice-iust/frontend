

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
    const parts = dateString.split(' '); 
    const [day, persianDate] = parts; 
    const [year, month, dayOfMonth] = persianDate.split('/'); 
    const persianYear = convertToPersianNumbers(year);  
    const persianMonth = convertToPersianNumbers(month);  
    const persianDayOfMonth = convertToPersianNumbers(dayOfMonth);  

    return `${persianYear}/${persianMonth}/${persianDayOfMonth}`; 
};  

