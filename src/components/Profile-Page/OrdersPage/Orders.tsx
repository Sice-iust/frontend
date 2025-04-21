import React from "react";  
import Navbar from "../../HomePage/navbar";   
import Menu from "./OrdersPage-menu";   
import OrderCard from "./OrderCards";
import sampleimg from "../../../assets/naan-10-1.jpg"  

const ProfileOrders: React.FC = () => {   

  const convertToPersianNumbers = (num: string | number): string => {  
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
  };   
  
  const convertPrice = (price: string) => {   
    const numberValue = parseFloat(price);   
    return numberValue.toLocaleString("fa-IR");  
  };  

  const order = [  
    {   
      id: 2,   
      distination: "خانه",  
      delivery_day: "1404/01/30",  
      delivery_clock: "18:27",  
      total_price: "200000.00",  
      product_count: 5  
    },  
    {  
      id: 4,  
      distination: "خانه",  
      delivery_day: "1404/01/30",  
      delivery_clock: "18:27",  
      total_price: "200000.00",  
      shipping_fee: 30.0,  
      profit: "0.00",  
      product_count: 5  
    },   
  ];  
  
  return (  
    <div className="rounded-2xl bg-white shadow-md p-4 mb-10 w-full h-screen mt-0 overflow-hidden mx-auto   
                sm:w-[90%] sm:mx-7  
                md:w-[70%] md:mx-7  
                lg:w-[70%] lg:mx-7 
                xl:mx-7 xl:mt-10 xl:w-[70%]">  
      <Menu currentOrdersCount={convertToPersianNumbers(2)} finalOrdersCount={convertToPersianNumbers(3)} />   
      {order.map(orderItem => (  
        <OrderCard   
          key={orderItem.id}   
          id={convertToPersianNumbers(orderItem.id)}   
          total_price={convertPrice(orderItem.total_price)}   
          delivery_day={orderItem.delivery_day}   
          delivery_clock={orderItem.delivery_clock}   
          distination={orderItem.distination}   
          product_count={convertToPersianNumbers(orderItem.product_count)}   
          product_photos={[sampleimg,sampleimg,sampleimg]}
        />  
      ))}  
    </div>  
  );  
};  

export default ProfileOrders;  