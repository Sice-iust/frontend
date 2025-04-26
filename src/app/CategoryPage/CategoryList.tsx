import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import Receipt from '../ShoppingReceipt/ShoppingReceipt';  
import Image from 'next/image';  
import emptyReceipt from "../../assets/emptyReceipt.png";  
import { FaStar } from "react-icons/fa";  
import ProductPage from '../ProductPage/ProductPage';
import { useTheme } from '../theme';
import Head from "next/head";
import { useCart } from "../../context/Receiptcontext";
import { convertToPersianNumbers } from '../../utils/Coversionutils';


interface DataType {
    photo_url: string;
    discounted_price:string;
    average_rate:string;
    name:string;
    id:number;
    price:string;
    discount:number;
    stock_1:number;

}

export default function CategoryList({ category }) {  
    const { userquantity, incrementQuantity, decrementQuantity, removeItem , handleAdd,fetchDatauser} = useCart(); 
    const { isDarkMode, toggleDarkMode } = useTheme();
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
    const [selectedItem, setSelectedItem] = useState(null); 
    const [isOpen, setOpen] = useState(false);   
    const [data, setData] = useState<DataType[]>([]);  
    const [dataLength, setDataLength] = useState(0);  

    

    
    const handleOpenModal = (item) => {  
        setSelectedItem(item);  
        setOpen(true);  
    };  

    const handleCloseModal = () => {
        setOpen(false);
    }; 
    useEffect(() => {  
        fetchDatauser();
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


    


    return (  
        
        <><Head>
        <meta name="viewport" content="width=device-width , initial-scale=1.0" />      
        </Head> 
        <div className={`${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"}  sm:flex sm:flex-row-reverse sm:flex-wrap sm:box-content sm:m-10 sm:ml-8  sm:w-full sm:h-auto sm:rounded-2xl sm:gap-6 `+
        "flex flex-col  flex-wrap box-content w-full h-auto  rounded-2xl"
        }>  
            {dataLength > 0 ? (  
                data.map(item => (  
                    <div key={item.id} 
                    onClick={() => handleOpenModal(item.id)}
                     className={`sm:flex sm:flex-col sm:box-content sm:border sm:rounded-2xl  ${isDarkMode ? "bg-[#191919]" : "bg-white"} sm:w-79 sm:h-77  sm:cursor-pointer hover:scale-105 transition duration-300 `+
                        " flex flex-row   border-b box-content w-full  h-40 cursor-pointer gap-1 xs:bg-red "}>  
                           {/* phone */}
                        <div className={" sm:hidden flex justify-between  w-full  "}>  
                           <div 
                            className={ "rounded-xl bg-[#d9d9d9]   flex items-center mt-5 flex-col " +
                                "w-[60px] h-7 ml-4 mt-8.5 " // mobile
                                }>  
                                <span className={" flex flex-row font-vazir items-center justify-between px-1.5 ml-1 " +
                                "text-[15px]" // mobile
                               }>   
                               
                                    {convertToPersianNumbers(item.average_rate) }  
                                    <FaStar className="     m-1.5  "
                                     color="orange" />  
                                </span>  
                                
                                {userquantity[item.id] === undefined || userquantity[item.id] === 0 ? (  
                            <button  
                                className={`${item.stock_1 === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} rounded-xl w-15 min-h-8 text-white text-[12px] font-vazir font-md mr-0 mt-7`}  
                                onClick={(e) => {  
                                    e.stopPropagation(); 
                                    handleAdd(item.id);  
                                }}  
                                disabled={item.stock_1 === 0}  
                            >  
                                افزودن  
                            </button>  
                        ) : (  
                            <div className="flex mr-0 mt-2 space-x-2">  
                                <button  
                                    className={`bg-white ml-5 border-3 ${userquantity[item.id] >= item.stock_1 ? 
                                                "border-gray-300 text-gray-300 cursor-not-allowed" 
                                                : "border-green-500 text-green-500 cursor-pointer"} 
                                                font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                                                transition-transform duration-200 ${userquantity[item.id] >= item.stock_1 ? "cursor-not-allowed hover:bg-white" 
                                                    : "hover:bg-green-500 hover:text-white hover:scale-110"}`}  
                                    onClick={(e) => {  
                                        e.stopPropagation(); 
                                        incrementQuantity(item.id);  
                                    }}  
                                    disabled={userquantity[item.id] >= item.stock_1}  
                                >  
                                +
                                    
                                </button>  
                                <span className="text-lg font-semibold">{convertToPersianNumbers(userquantity[item.id] || 0) || 0}</span>  
                                {userquantity[item.id] === 1 ? (  
                                    <button  
                                        className="bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110"  
                                        onClick={(e) => {  
                                            e.stopPropagation();
                                            const newQuantities = { ...userquantity };    
                                            delete newQuantities[item.id];   
                                            // setQuantities(newQuantities);  
                                            removeItem(item.id);  
                                        }}  
                                    >  
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" 
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                                                    strokeLinecap="round" strokeLinejoin="round">  
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
                                        onClick={(e) => {  
                                            e.stopPropagation();   
                                            decrementQuantity(item.id);  
                                        }}  
                                        disabled={userquantity[item.id] <= 1}  
                                    >  
                                        <span className="text-xl">-</span>  
                                    </button>  
                                )}  
                            </div>  
                        )}  
                            </div>  

                            <div className={`${isDarkMode ? "text-white" : "text-black"}  sm:hidden font-vazir text-sm font-semibold text-right mr-2 mt-10 `}>
                                {item.name}

                            <div className="sm:hidden flex flex-col items-end mt-7 ">
                                <div className={`${isDarkMode ? "text-white" : "text-black"} font-vazir text-sm text-right`}>
                                    {convertToPersianNumbers(Math.round(parseFloat(item.discounted_price)).toLocaleString())} :قیمت
                                </div>
                                
                                  {item.discount > 0 && (
                                    <div className="flex flex-row-reverse items-center mt-1">
                                        
                                        <div className="bg-[#F18825] text-white text-xs w-7 h-4  mr-1 flex items-center justify-center rounded-md">
                                            %{convertToPersianNumbers(item.discount)}
                                        </div>
                                        <div className="text-gray-500 text-xs line-through mr-2">
                                            {convertToPersianNumbers(Math.round(parseFloat(item.price)).toLocaleString())}
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                            <div className={
                                    "relative " +
                                    "w-30 h-25 mr-3 mt-5" // mobile
                                }>
                                    <Image  
                                        className="rounded-2xl "  
                                        src={item.photo_url}  
                                        alt="productImg"  
                                        layout="fill"  
                                    />  
                               
                            </div>  
                        </div>   

                        {/* end of phone */}
                         
                         
                         <div className={" hidden sm:flex sm:flex-row   "}>  
                           <div 
                            className={ "sm:mt-1 sm:box-content sm:place-items-start sm:rounded-2xl sm:bg-[#d9d9d9] sm:w-auto sm:h-7 sm:ml-1 "    }>  
                                <span className={" sm:flex sm:flex-row sm:font-vazir sm:items-center sm:justify-between sm:w-full sm:px-2 sm:ml-3 sm:text-xl " }>   
                               
                                    {convertToPersianNumbers(item.average_rate) }  
                                    <FaStar className="sm:m-1 sm:mr-3  "
                                     color="orange" />  
                                </span>  
                            </div>  
                            <div className="sm:flex sm:flex-row sm:justify-center sm:items-center">  
                            <div className={
                                    "sm:relative " +
                                    "sm:w-40 sm:h-50 sm:mb-3 sm:ml-5 sm:mt-1 "  // desktop (adjust size as needed)
                                   
                                }>
                                    <Image  
                                        className="sm:rounded-2xl"  
                                        src={item.photo_url}  
                                        alt="productImg"  
                                        layout="fill"  
                                    />  
                               
                            </div>  
                            </div>
                        </div>  

                      
                        <div className={`${isDarkMode ? "text-white" : "text-black"} hidden sm:block sm:font-vazir  sm:text-sm sm:font-semibold sm:text-right sm:mr-5 ` }>
                            {item.name}</div>  
                        <div className="sm:flex sm:flex-row-reverse  hidden">  
                             <div className='sm:flex sm:flex-col'>  
                               <div className={` ${isDarkMode ? "text-white" : "text-black"} sm:font-vazir sm:text-sm sm:text-right sm:mr-5 sm:mt-2`}>  
                                    {convertToPersianNumbers(Math.round(parseFloat(item.discounted_price)).toLocaleString())} :قیمت  
                                </div> 
                                 
                                {item.discount > 0 && (  
                                    <div className="sm:flex sm:flex-row-reverse sm:mr-5">  
                                        <div className="sm:bg-[#F18825] sm:text-sm sm:w-9 sm:h-5 sm:text-white sm:text-[14px] sm:pl-1.5 sm:rounded-md">  
                                            %{convertToPersianNumbers(item.discount)}  
                                        </div>  
                                        <div className="sm:mr-2 sm:text-gray-500 sm:line-through">  
                                            {convertToPersianNumbers(Math.round(parseFloat(item.price)).toLocaleString())}  
                                        </div>  
                                    </div>  
                                )}  
                            
                            </div>   
                            
                            {userquantity[item.id] === undefined || userquantity[item.id] === 0 ? (
                              
                            <button  
                                className={`${item.stock_1 === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} rounded-xl w-23 h-9 text-white text-lg font-vazir font-md mr-24 mt-2`}  
                                onClick={(e) => {  
                                    e.stopPropagation(); 
                                    handleAdd(item.id);  
                                }}  
                                disabled={item.stock_1 === 0}  
                            >  
                                افزودن  
                            </button>  
                            
                        ) : ( 
                            <div className='sm:block hidden '> 
                            <div className="flex mr-27 mt-2 space-x-2">  
                                <button  
                                    className={`bg-white ml-5 border-3 ${userquantity[item.id] >= item.stock_1 ? 
                                                "border-gray-300 text-gray-300 cursor-not-allowed" 
                                                : "border-green-500 text-green-500 cursor-pointer"} 
                                                font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                                                transition-transform duration-200 ${userquantity[item.id] >= item.stock_1 ? "cursor-not-allowed hover:bg-white" 
                                                    : "hover:bg-green-500 hover:text-white hover:scale-110"}`}  
                                    onClick={(e) => {  
                                        e.stopPropagation(); 
                                        incrementQuantity(item.id);  
                                    }}  
                                    disabled={userquantity[item.id] >= item.stock_1}  
                                >  
                                  +     
                                </button>  
                                <span className="text-lg font-semibold">{convertToPersianNumbers(userquantity[item.id] || 0) || 0}</span>  
                                {userquantity[item.id] === 1 ? (  
                                    <button  
                                        className="bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110"  
                                        onClick={(e) => {  
                                            e.stopPropagation();
                                            const newQuantities = { ...userquantity };    
                                            delete newQuantities[item.id];   
                                            // setQuantities(newQuantities);  
                                            removeItem(item.id);  
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
                                        onClick={(e) => {  
                                            e.stopPropagation();   
                                            decrementQuantity(item.id);  
                                        }}  
                                        disabled={userquantity[item.id] <= 1}  
                                    >  
                                        <span className="text-xl">-</span>  
                                    </button>  
                                )}  
                            </div>
                              
                            </div>
                        )}  
                        
                    </div> 
                     
                </div>  
            ))  
        ) : (  
            <div>No items found</div>  
        )}  
        {isOpen && <ProductPage onClose={handleCloseModal} open={isOpen} itemid={selectedItem} />}  
    </div>  </>
);  
}  