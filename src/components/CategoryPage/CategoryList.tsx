import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import Receipt from '../ShoppingReceipt/ShoppingReceipt';  
import Image from 'next/image';  
import emptyReceipt from "../../assets/emptyReceipt.png";  
import { FaStar } from "react-icons/fa";  

export default function CategoryList({ category }) {  

    
    const [catNumber, setCategoryNumber] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('category') || category;
        }
        return category;
    });

    useEffect(() => {
        if (typeof window !== "undefined" && category) {
            localStorage.setItem('category', category);
            setCategoryNumber(category);
        }
    }, [category]); 
    

    const [data, setData] = useState(null);  
    const [dataLength, setDataLength] = useState(0);  
    const [quantities, setQuantities] = useState({});  
    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    };  
    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get("https://nanziback.liara.run/product/category/", {  
                    params: { category: catNumber },  
                });  
                setData(response.data);  
                setDataLength(response.data.length);  
            } catch (error) {  
                console.error("Error fetching data:", error.response ? error.response.data : error.message);  
            }  
        };  

        if (catNumber) {  
            fetchData();  
        }  
    }, [catNumber]);  

    const handleAdd = (itemId) => {  
        setQuantities((prev) => ({  
            ...prev,  
            [itemId]: 1,
        }));  
    };  

    const incrementQuantity = (itemId) => {  
        setQuantities((prev) => ({  
            ...prev,  
            [itemId]: (prev[itemId] || 0) + 1,  
        }));  
    };  

    const decrementQuantity = (itemId) => {  
        setQuantities((prev) => {  
            const newQuantity = (prev[itemId] || 0) - 1;  
            return newQuantity > 0  
                ? { ...prev, [itemId]: newQuantity }  
                : { ...prev };  
        });  
    };  

    return (  
        <div className="flex flex-row-reverse flex-wrap box-content m-10 ml-8 w-full h-auto rounded-2xl gap-6">  
            {dataLength > 0 ? (  
                data.map(item => (  
                    <div key={item.id} className="flex flex-col box-content border rounded-2xl bg-white w-79 h-77">  
                        <div className="flex flex-row">  
                            <div className="mt-1 box-content place-items-start rounded-2xl bg-[#d9d9d9] w-auto h-7 ml-1 mt-1">  
                                <span className="flex flex-row text-xl font-vazir ml-3 mb-1">  
                                    {convertToPersianNumbers(item.average_rate)}  
                                    <FaStar className="m-1 mr-3" color="orange" />  
                                </span>  
                            </div>  
                            <div className="flex flex-row justify-center items-center">  
                                <div className="relative w-60 h-50 mb-3 mt-1">  
                                    <Image  
                                        className="rounded-2xl"  
                                        src={item.photo}  
                                        alt="productImg"  
                                        layout="fill"  
                                    />  
                                </div>  
                            </div>  
                        </div>  
                        <div className="font-vazir text-xl font-semibold text-right mr-5">{item.name}</div>  
                        <div className="flex flex-row-reverse">  
                            <div className='flex flex-col'>  
                                <div className="font-vazir text-lg text-right mr-5 mt-2">  
                                    {convertToPersianNumbers(Math.round(parseFloat(item.discounted_price)).toLocaleString())} :قیمت  
                                </div>  
                                {item.discount > 0 && (  
                                    <div className="flex flex-row-reverse mr-6">  
                                        <div className="bg-[#F18825] text-lg w-9 h-5 text-white text-[14px] pl-1.5 rounded-md">  
                                            %{convertToPersianNumbers(item.discount)}  
                                        </div>  
                                        <div className="mr-2 text-gray-500 line-through">  
                                            {convertToPersianNumbers(Math.round(parseFloat(item.price)).toLocaleString())}  
                                        </div>  
                                    </div>  
                                )}  
                            </div>  
                            {quantities[item.id] === undefined ? (  
                                <button  
                                    className="bg-[#F18825] rounded-xl w-25 h-10 text-white text-lg font-vazir font-md mr-18 hover:bg-orange-400 transition duration-300 hover:scale-110"  
                                    onClick={() => handleAdd(item.id)}  
                                >  
                                    افزودن  
                                </button>  
                            ) : (  
                                <div className="flex mr-19 mt-2 space-x-2">  
                                    <button  
                                        className={`bg-white ml-5 border-3 ${quantities[item.id] >= item.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" : "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 ${quantities[item.id] >= item.stock ? "cursor-not-allowed hover:bg-white" : "hover:bg-green-500 hover:text-white hover:scale-110"}`}  
                                        onClick={() => incrementQuantity(item.id)}  
                                        disabled={quantities[item.id] >= item.stock}  
                                    >  
                                        +  
                                    </button>  
                                    <span className="text-lg font-semibold">{convertToPersianNumbers(quantities[item.id]) || 0}</span>  
                                    {quantities[item.id] === 1 ? (  
                                        <button  
                                            className="bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110"  
                                            onClick={() => {  
                                                const newQuantities = { ...quantities };  
                                                delete newQuantities[item.id];   
                                                setQuantities(newQuantities);  
                                            }}  
                                        >  
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                                                <path d="M3 6h18" />  
                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
                                                <path d="M10 11v6" />  
                                                <path d="M14 11v6" />  
                                                <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />  
                                            </svg>  
                                        </button>  
                                    ) : (  
                                        <button  
                                            className="bg-white cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110"  
                                            onClick={() => decrementQuantity(item.id)}  
                                            disabled={quantities[item.id] <= 1}  
                                        >  
                                            <span className="text-xl">-</span>  
                                        </button>  
                                    )}  
                                </div>  
                            )}  
                        </div>  
                    </div>  
                ))  
            ) : (  
                <div>No items found</div>  
            )}  
        </div>  
    );  
}  