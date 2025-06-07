import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import ProductPage from '../ProductPage/ProductPage';
import Head from "next/head";
import { useCart } from "../../context/Receiptcontext";
import { convertToPersianNumbers } from '../../utils/Coversionutils';

interface DataType {
    photo_url: string;
    discounted_price: string;
    average_rate: string;
    name: string;
    id: number;
    price: string;
    discount: number;
    stock: number;

}

export default function CategoryList({ category }) {
    const { userquantity, incrementQuantity, decrementQuantity, removeItem, handleAdd, fetchDatauser } = useCart();
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
                    params: { category: category },
                });
                setData(response.data);
                setDataLength(response.data.length);
                console.log("response here",response.data)
            } catch (error) {
                console.error("Error fetching data:", error.response ? error.response.data : error.message);
            }
        };

        if (category) {
            fetchData();
        }
    }, [category]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width , initial-scale=1.0" />
            </Head>
            <div className={` 
                            md:flex
                            md:flex-row-reverse
                            md:flex-wrap
                            md:box-content
                            md:m-10
                            md:ml-8
                            md:w-full
                            md:h-auto
                            md:rounded-2xl
                            md:gap-6 `
                +
                "flex flex-col  flex-wrap box-content w-full h-auto  rounded-2xl"
            }>
                {dataLength > 0 ? (
                    data.map(item => (
                        <div key={item.id}
                            onClick={() => handleOpenModal(item.id)}
                            className={`md:flex 
                                md:flex-col 
                                md:box-content
                                md:rounded-2xl
                                bg-white
                                dark:bg-[#191919]
                                md:w-79
                                md:h-77
                                md:cursor-pointer
                                hover:scale-105
                                transition
                                duration-300 ` +
                                " flex flex-row   box-content w-full  h-40 cursor-pointer gap-1 xs:bg-red "}>
                            {/* phone */}
                            <div className={`
                                md:hidden
                                flex
                                justify-between  border-b-1 border-b-gray-500
                                w-full `}>
                                <div
                                    className={"rounded-xl bg-[#d9d9d9] flex items-center mt-5 flex-col  " +
                                        "w-[60px] h-7 ml-4 mt-8.5 " // mobile
                                    }>
                                    <span className={" flex flex-row font-vazir items-center justify-between px-1.5 ml-1 " +
                                        "text-[15px]" // mobile
                                    }>

                                        {convertToPersianNumbers(item.average_rate)}
                                        <FaStar className="m-1.5 "
                                            color="orange" />
                                    </span>

                                    {userquantity[item.id] === undefined || userquantity[item.id] === 0 ? (
                                        <button
                                            className={`${item.stock === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} rounded-xl w-15 min-h-8 text-white text-[12px] font-vazir font-md mr-0 mt-7`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAdd(item.id);
                                            }}
                                            disabled={item.stock === 0}
                                        >
                                            افزودن
                                        </button>
                                    ) : (
                                        <div className="flex mr-0 mt-6 space-x-2">
                                            <button
                                                className={`bg-white dark:bg-black ml-5 border-3 ${userquantity[item.id] >= item.stock ?
                                                    "border-gray-300 text-gray-300 cursor-not-allowed"
                                                    : "border-green-500 text-green-500 cursor-pointer"} 
                                                font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                                                transition-transform duration-200 ${userquantity[item.id] >= item.stock ? "cursor-not-allowed hover:bg-white"
                                                        : "hover:bg-green-500 hover:text-white hover:scale-110"}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    incrementQuantity(item.id);
                                                }}
                                                disabled={userquantity[item.id] >= item.stock}
                                            >
                                                +

                                            </button>
                                            <span className={`text-black dark:text-white text-lg font-semibold`}>{convertToPersianNumbers(userquantity[item.id] || 0) || 0}</span>
                                            {userquantity[item.id] === 1 ? (
                                                <button
                                                    className={` cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newQuantities = { ...userquantity };
                                                        delete newQuantities[item.id];
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
                                                    className={`bg-white dark:bg-black cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110`}
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

                                <div className={`text-black dark:text-white  md:hidden font-vazir text-md font-semibold text-right mr-2 mt-10 `}>
                                    {item.name}

                                    <div className="md:hidden flex flex-col items-end mt-7 ">
                                        <div className={`text-black dark:text-white font-vazir text-md text-right`}>
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
                                    className={`bg-[#d9d9d9] dark:bg-[#383535] sm:mt-1 sm:box-content sm:place-items-start sm:rounded-2xl  sm:w-auto sm:h-7 sm:ml-1 `}>
                                    <span className={`text-black dark:text-white sm:flex sm:flex-row sm:font-vazir sm:items-center sm:justify-between sm:w-full sm:px-2 sm:ml-3 sm:text-xl `}>
                                        {convertToPersianNumbers((+item.average_rate).toFixed(1))}
                                        <FaStar className="md:m-1 md:mr-3  "
                                            color="orange" />
                                    </span>
                                </div>
                                <div className="md:flex md:flex-row md:justify-center md:items-center">
                                    <div className={
                                        "md:relative " +
                                        "md:w-30 md:h-40 md:mb-3 md:ml-5 md:mt-5 "  // desktop (adjust size as needed)

                                    }>
                                        <Image
                                            className="md:rounded-2xl"
                                            src={item.photo_url}
                                            alt="productImg"
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`
                                text-black
                                dark:text-white
                                hidden md:block
                                md:font-vazir
                                md:text-medium
                                md:font-semibold
                                md:text-right
                                md:mr-5
                                md:mt-4
                                `}>
                                {item.name}
                            </div>
                            <div className="md:flex md:flex-row-reverse  hidden">
                                <div className='md:flex md:flex-col'>
                                    <div className={` text-black dark:text-white md:font-vazir md:text-md md:text-right md:mr-6 md:mt-2`}>
                                        {convertToPersianNumbers(Math.round(parseFloat(item.discounted_price)).toLocaleString())} :قیمت
                                    </div>

                                    {item.discount > 0 && (
                                        <div className="md:flex md:flex-row-reverse md:mr-5">
                                            <div className="md:bg-[#F18825] md:text-md md:w-9 md:h-5 md:text-white md:text-[14px] md:pl-1.5 md:rounded-md">
                                                %{convertToPersianNumbers(item.discount)}
                                            </div>
                                            <div className="md:mr-2 md:text-gray-500 md:line-through">
                                                {convertToPersianNumbers(Math.round(parseFloat(item.price)).toLocaleString())}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {userquantity[item.id] === undefined || userquantity[item.id] === 0 ? (

                                    <button
                                        className={`${item.stock === 0 ?
                                             "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"}
                                              rounded-xl w-23 h-9 text-white text-lg font-vazir font-md mr-24 mt-2`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAdd(item.id);
                                        }}
                                        disabled={item.stock === 0}
                                    >
                                        افزودن
                                    </button>

                                ) : (
                                    <div className='md:block hidden '>
                                        <div className="flex mr-27 mt-2 space-x-2">
                                            <button
                                                className={`
                                                    bg-white
                                                    dark:bg-black 
                                                    ml-5
                                                    border-3 ${userquantity[item.id] >= item.stock ?
                                                        "border-gray-300 text-gray-300 cursor-not-allowed"
                                                        : "border-green-500 text-green-500 cursor-pointer"} 
                                                font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                                                transition-transform duration-200 ${userquantity[item.id] >= item.stock ? "cursor-not-allowed hover:bg-white"
                                                        : "hover:bg-green-500 hover:text-white hover:scale-110"}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    incrementQuantity(item.id);
                                                }}
                                                disabled={userquantity[item.id] >= item.stock}
                                            >
                                                +
                                            </button>
                                            <span className={`text-black dark:text-white text-lg font-semibold`}>{convertToPersianNumbers(userquantity[item.id] || 0) || 0}</span>
                                            {userquantity[item.id] === 1 ? (
                                                <button
                                                    className={`bg-white dark:bg-black cursor-pointer
                                                        border-3 border-gray-300 text-gray-400 font-semibold
                                                        text-3xl w-8 h-8 flex items-center justify-center rounded-full
                                                        transition-transform duration-200 hover:bg-gray-300
                                                        hover:text-gray-500 hover:scale-110`}
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
                                                    className={`bg-white dark:bg-black cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110`}
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

                    <div className="flex justify-center items-center w-full h-full">
                        <div className="font-vazir w-full h-full flex items-center justify-center py-2.5 px-5 text-xl font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg aria-hidden="true" role="status" className="w-8 h-8 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                            <div className='flex flex-row-reverse'>
                                در حال آماده سازی
                                <span>... </span>
                            </div>
                        </div>
                    </div>

                )}
                {isOpen && <ProductPage onClose={handleCloseModal} open={isOpen} itemid={selectedItem} />}
            </div>
        </>
    );
}  