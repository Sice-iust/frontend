import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import {convertPrice} from "../../../utils/Coversionutils"
import { useCart } from "../../../context/Receiptcontext";





export default function ProductCard({ img_src, text, ref, percent, price, discountedprice ,stock, type, rate,onOpenModal }) {
    const { userquantity, incrementQuantity, decrementQuantity, removeItem, handleAdd } = useCart();
    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    
  return (
    <div className='flex flex-col content-center
      bg-white dark:bg-neutral-900 dark:text-white
      mx-3 border-1 h-60 rounded-2xl p-4
      hover:drop-shadow-xl/30 cursor-pointer
      'onClick={() => onOpenModal(ref)}
     >

      <div dir='rtl' style={{ height: '30px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        {type == "dis" ? (
          <p style={{
            background: "#5BCD79", color: 'white',
            padding: '5px 10px',
            borderRadius: '60px',
            fontSize: '0.8rem',
            minWidth: '50px',
            textAlign: 'center'
          }}>
            {e2p(String(percent))}%
          </p>
        ) : (
            <div dir='rtl' style={{
            background: "LightGray", color: 'black',
            padding: '5px 10px',
            borderRadius: '60px',
            fontSize: '0.8rem',
            minWidth: '70px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
            }}>
            <FaStar color="orange" size={14}
             style={{
                    transform: 'translateY(-1px)',
                    marginLeft: '4px'
                }}
             />
            {e2p(String(rate.toFixed(1)))}
            </div>
        )}
      </div>

     <Image
        src={img_src}
        width={100}
        height={100}
        alt="Nanzi Logo"
        className='m-auto'
        style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
        }}
        loading="lazy"
    />

      <div dir='rtl' style={{ height: '60px', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <h3>{text}</h3>
      </div>

      <div style={{ height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div dir='rtl' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {percent != 0 ? (
                <>
                <span style={{
                    fontSize: '1rem'
                }}>
                    {convertPrice(discountedprice)} تومان
                </span>
                <span style={{
                    textDecoration: 'line-through',
                    color: 'gray',
                    fontSize: '0.9rem',
                    marginBottom: '2px'
                }}>
                    {convertPrice(price)} 
                </span>
                
                </>
            ) : (
                <span style={{
                    fontSize: '1rem'
                }}>
                {convertPrice(price)} تومان
                </span>
            )}
            </div>
        {userquantity[ref] > 0 ? (
        <div className="md:block hidden">
            <div className="flex space-x-2">
            <button
                className={`bg-white dark:bg-black ml-1 border-3 ${
                userquantity[ref] >= stock
                    ? "border-gray-300 text-gray-300 cursor-not-allowed"
                    : "border-green-500 text-green-500 cursor-pointer"
                } font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                  transition-transform duration-200 ${
                userquantity[ref] >= stock
                    ? "hover:bg-white"
                    : "hover:bg-green-500 hover:text-white hover:scale-110"
                }`}
                onClick={(e) => {
                e.stopPropagation();
                incrementQuantity(ref);
                }}
                disabled={userquantity[ref] >= stock}
            >
                +
            </button>

            <span className="text-black dark:text-white text-lg font-semibold">
                {e2p(String(userquantity[ref] || 0))}
            </span>

            {userquantity[ref] === 1 ? (
                <button
                className={`bg-white dark:bg-black cursor-pointer border-3 border-gray-300 
                          text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center 
                          rounded-full transition-transform duration-200 hover:bg-gray-300 
                          hover:text-gray-500 hover:scale-110`}
                onClick={(e) => {
                    e.stopPropagation();
                    removeItem(ref);
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
                className={`bg-white dark:bg-black cursor-pointer border-3 
                            border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex 
                            items-center justify-center rounded-full transition-transform duration-200 
                            hover:bg-red-500 hover:text-white hover:scale-110`}
                onClick={(e) => {
                    e.stopPropagation();
                    decrementQuantity(ref);
                }}
                disabled={userquantity[ref] <= 1}
                >
                -
                </button>
            )}
            </div>
        </div>
        ) : (
        <button
            className={`${
            stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110 cursor-pointer"
            } rounded-xl w-23 h-9 text-white text-lg font-vazir font-md`}
            onClick={(e) => {
            e.stopPropagation();
            handleAdd(ref);
            }}
            disabled={stock === 0}
        >
            افزودن
        </button>
        )}
      </div>
    </div>
  );
}