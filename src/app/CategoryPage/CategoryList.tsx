import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import emptyReceipt from "../../assets/emptyReceipt.png";
import { FaStar } from "react-icons/fa";

interface Item {  
    id: number;  
    name: string;  
    price: number;  
    quantity: number;  
    discount: number;
    after : number;
    total:number;
    stock: number;
    image:string;
    rate: number;  
}  
export default function CategoryList({catNumber}) {

    const initialItems: Item[] = [  
        { id: 1, name: 'نان سنگک ساده', price: 20000, quantity: 3, discount: 13, after: 10000, total: 30000, stock: 3 ,rate:4.5,image:"\assets\emptyReceipt.png"},  
        { id: 1, name: 'نان سنگک ساده', price: 20000, quantity: 3, discount: 13, after: 10000, total: 30000, stock: 3 ,rate:4,image:"\assets\emptyReceipt.png"}, 
        { id: 1, name: 'نان سنگک ساده', price: 20000, quantity: 3, discount: 13, after: 10000, total: 30000, stock: 3 ,rate:4,image:"\assets\emptyReceipt.png"}, 
        { id: 1, name: 'نان سنگک ساده', price: 20000, quantity: 3, discount: 13, after: 10000, total: 30000, stock: 3 ,rate:4,image:"\assets\emptyReceipt.png"},
    ];   
    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    };  
    const [items, setItems] = useState<Item[]>(initialItems);  
    return (  
        // <div className='flex flex-row'>  
        //     <div className='flex-shrink-0'>  
        //         <Receipt />  
        //     </div>  
            <div className="flex flex-row-reverse flex-wrap box-content m-10 ml-8  w-full h-auto rounded-2xl gap-6">  
                {items.map(item => (   
                    <div key={item.id} className='flex flex-col box-content border-1 rounded-2xl bg-white w-79 h-77 '>  
                        <div className='flex flex-row'>
                            <div className=' mt-1   box-content place-items-start rounded-2xl bg-[#d9d9d9] w-auto h-7 ml-1 mt-1'>
                                <span className='flex flex-row text-xl font-vazir ml-3 mb-1'>{convertToPersianNumbers(item.rate)}<FaStar className='m-1 mr-3' color="orange"/></span>
                            </div>
                            <div className="flex flex-row justify-center items-center">  
                                <Image src={emptyReceipt} alt="productImg" className="rounded-2xl w-70 h-55 mr-1" />  
                            </div> 
                        </div> 
                        <div className='font-vazir text-xl font-semibold text-right mr-5'> {item.name}</div>
                        <div className='flex flex-row-reverse'>
                            <div className='font-vazir text-lg font-md text-right mr-5 mt-4'>{convertToPersianNumbers(item.price.toLocaleString())} :قیمت</div>
                            <button className='bg-[#F18825] rounded-xl w-30 text-white text-lg font-vazir font-md mr-18 mt-2' >افزودن</button>
                        </div>
                    </div>  
                ))}  
            </div>  
        // </div>  
    );   
};