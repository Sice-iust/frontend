import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Receipt from '../ShoppingReceipt/ShoppingReceipt';
import Image from 'next/image';
import emptyReceipt from "../../assets/emptyReceipt.png";
import { FaStar } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function CategoryList({category}) {

    const [catNumber, setCategoryNumber] = useState(category);
    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    };  
    const [data, setData] = useState(null);
    const [dataLength,setDataLength]=useState(0);
    const fetchData = async () => {  
        try {  
          const response = await axios.get("https://nanziback.liara.run/product/category/", {  
            params: { category : catNumber },  
          });  
          setData(response.data);  
          setDataLength(response.data.length);
          console.log(`Data from back:`, data);  
        } catch (error) {  
          console.error("Error fetching data:", error.response ? error.response.data : error.message);  
        }  
      };  
    
      useEffect(() => {  
        fetchData();  
      }, []);  
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
                                <Image src={emptyReceipt} alt="productImg" className="rounded-2xl w-70 h-55 mr-1" />  
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
                            <button className="bg-[#F18825] rounded-xl w-25 h-10 text-white text-lg font-vazir font-md mr-18 mt-2">افزودن</button>  
                        </div>  
                    </div>  
                ))  
            ) : (  
                <div>No items found</div>  
            )}  
        </div>  
    );   
};