import React, { useState, useEffect } from "react";
import Navbar from "../HomePage/navbar";

interface Item {  
    id: number;  
    name: string;  
    price: number;  
    quantity: number;  
  }  

const Receipt: React.FC = () => {  
    const items: Item[] = [  
        { id: 1, name: 'نان سنگک سادة', price: 20000, quantity: 3 },  
        { id: 2, name: 'نان بری نان کنجدی', price: 26000, quantity: 1 },  
    ]; 
    const convertToPersianNumbers = (num: string | number): string => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
    };
    
    
    const n : number =2;
    return (  
        <div className="box-content ml-10 my-10 mb-10 min-h-130 w-90 rounded-2xl bg-white shadow-[5px_7px_5px_rgba(0,0,0,0.25)]"> 
            <h2 className="text-xl font-vazir font-bold mb-4">سبد خرید ({convertToPersianNumbers(n)})</h2>  
        </div>  
    ); 

  };  
  
  export default Receipt; 