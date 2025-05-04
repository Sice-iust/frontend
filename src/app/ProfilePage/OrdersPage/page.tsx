'use client'
import React, { useState,useEffect } from "react"; 
import Menu from "./OrdersPage-menu";   
import OrderCard from "./OrderCards";
import axios from "axios";
import { convertDateInPersian } from "../../../utils/Coversionutils";
import { convertPrice } from "../../../utils/Coversionutils";
import { convertTimeToPersian } from "../../../utils/Coversionutils";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { useTheme } from "../../theme";

export interface Product {  
  photo: string; 
  quantity: number; 
}  

interface Order {  
  id: number;  
  total_price: string;  
  delivery_day: string;  
  delivery_clock: string;  
  location: {  
    name: string; 
  };  
  
}  

interface OrderItem {  
  order: Order;  
  product: Product;  
  quantity: number;
}  

interface CompletedOrdersResponse {  
  current_orders: OrderItem[];  
}  




const ProfileOrders: React.FC = () => {  
  
  const [Completed, setCompleted] = useState<CompletedOrdersResponse | null>(null);  

  const { isDarkMode, toggleDarkMode } = useTheme();

  const Completed_Orders = async () => {
        try {
          const response = await axios.get("https://nanziback.liara.run/user/order/myorder/", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setCompleted(response.data);
          console.log(`data from back: ${Completed}`);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  };

  console.log(Completed);
  const groupedOrders = Completed?.current_orders?.reduce((acc, orderItem) => {  
  const orderId = orderItem.order.id;  

    if (!acc[orderId]) {  
      acc[orderId] = {  
        ...orderItem.order,   
        products: []   
      };  
    }  
    acc[orderId].products.push({  
      photo: orderItem.product.photo,  
      quantity: orderItem.quantity 
    });  
  
    return acc;  
  }, {} as Record<number, Order & { products: Product[] }>);  
 
  const ordersArray = groupedOrders ? Object.values(groupedOrders) : [];  
  
    
  useEffect(() => {
        Completed_Orders();
  }, []);


  
  return ( 
    <>
      
    <div className={`sm:rounded-xl    ${isDarkMode ? "bg-[#191919]" : "bg-white"}  sm:shadow-md sm:p-4 sm:mb-10 sm:w-full sm:h-screen sm:mt-0 sm:overflow-hidden sm:mx-auto sm:block hidden   
                sm:w-[90%] sm:mx-7  
                md:w-[70%] md:mx-7  
                lg:w-[70%] lg:mx-0 
                xl:mx-7 xl:mt-10 xl:w-[70%]`}>  
      <Menu currentOrdersCount={convertToPersianNumbers(3)} finalOrdersCount={convertToPersianNumbers(1)} /> 
 
      
      {ordersArray && ordersArray.length > 0 ? (
        ordersArray.map(orderItem => (
          <OrderCard
            key={orderItem.id}
            orderkey={orderItem.id}
            id={convertToPersianNumbers(orderItem.id)}
            total_price={convertPrice(orderItem.total_price)}
            delivery_day={convertDateInPersian(orderItem.delivery_day)}
            delivery_clock={convertTimeToPersian(orderItem.delivery_clock)}
            distination={orderItem.location.name}
            product_count={convertToPersianNumbers(orderItem.products.length-3)}
            product_photos={orderItem.products.slice(0, 3).map(prod => prod)}
          />
        ))
      ) : (
        <p className={` flex  mt-25  justify-center  ${isDarkMode ? "text-white" : "text-[#191919]"}`} >هیچ سفارشی یافت نشد</p>
      )}
    
    </div> 
    </> 
  );  
};  

export default ProfileOrders;  