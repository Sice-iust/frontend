import React, { useState } from "react";  
import Navbar from "../HomePage/navbar";  

interface Item {  
    id: number;  
    name: string;  
    price: number;  
    quantity: number;  
    discount: number;  
    after: number;  
    total: number;  
}  

const Receipt: React.FC = () => {  
    const initialItems: Item[] = [  
        { id: 1, name: 'نان سنگک ساده', price: 20000, quantity: 3, discount: 3, after: 10000, total: 30000 },  
        { id: 2, name: 'نان بربری کنجدی', price: 26000, quantity: 1, discount: 0, after: 26000, total: 26000 },  
    ];   

    const [items, setItems] = useState<Item[]>(initialItems);  
    
    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    };  

    const incrementQuantity = (id: number) => {  
        setItems(items.map(item =>   
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item  
        ));  
    };  

    const decrementQuantity = (id: number) => {  
        setItems(items.map(item =>   
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item  
        ));  
    };  

    const n: number = items.length;   

    return (  
        <div className="box-content ml-10 mt-10 mb-10 min-h-130 w-95 rounded-2xl bg-white shadow-[5px_7px_5px_rgba(0,0,0,0.25)]">   
            <h2 className="text-[25px] text-center p-5 font-vazir font-bold ">سبد خرید ({convertToPersianNumbers(n)})</h2>  
            {items.map((item) => (  
                <div key={item.id} className="box-content mt-5 ml-5 w-78 h-25 border border-gray-400 rounded-lg">  
                    <div className="flex flex-col">  
                        <span className="text-[18px] text-right mr-3 mt-2 font-vazir font-semibold">  
                            {item.name}  
                        </span>  
                        <div className="flex justify-between items-center mr-6 mt-2">
                            <div className="flex items-center space-x-2">
                                <button   
                                    className="bg-white ml-5 cursor-pointer border-4 border-green-500 text-green-500 font-bold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-green-500 hover:text-white hover:scale-110"    
                                    onClick={() => incrementQuantity(item.id)}  
                                >  
                                    +  
                                </button>  
                                <span className="text-lg font-semibold">  
                                    {convertToPersianNumbers(item.quantity)}  
                                </span>  
                                <button   
                                    className="bg-white cursor-pointer border-4 border-red-500 text-red-500 font-bold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110"     
                                    onClick={() => decrementQuantity(item.id)}  
                                >  
                                    -  
                                </button>  
                            </div>  
                            <span className="text-[15px] text-right font-vazir font-medium"> 
                                قیمت: {convertToPersianNumbers(item.price.toLocaleString())} تومان  
                            </span>  
                        </div>  
                    </div>  
                </div>  
            ))}  
        </div>    
    );   
};  
  
export default Receipt;  