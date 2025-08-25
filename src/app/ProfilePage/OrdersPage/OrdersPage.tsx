'use client'
import React, { useState,useEffect } from "react";  
// import Navbar from "../../navbar"; -  
import Menu from "./OrdersPage-menu";   
import OrderCard from "./OrderCards";
import axios from "axios";
import { convertDateInPersian } from "../../../utils/Coversionutils";
import { convertPrice } from "../../../utils/Coversionutils";
import { convertTimeToPersian } from "../../../utils/Coversionutils";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { convertPhoneNumberToPersian } from "../../../utils/Coversionutils";

import { useTheme } from "../../../components/theme";
import CurrentOrder from "./CurrentOrder";
export interface Product { 

   
  
  photo: string; 
  quantity: number; 
  
}  

interface Order {  
  id: number;  
  total_price: string;  
  status:number,
  reciver:string,
  reciver_phone:string,
  description:string;


  delivery : {
    delivery_date: string;  
    end_time: string; 
    shipping_fee: string;

  } 
  location: {  
    name: string; 
    address:string;
  };  
  
}  

interface OrderItem {  
  order: Order;  
  product: Product;  
  quantity: number;
}

interface CompletedOrdersResponse {  
  past_orders: OrderItem[];  
}  

interface CurrentOrdersResponse {  
  current_orders: OrderItem[];  
}  



const ProfileOrders: React.FC = () => {  
  
const [Completed, setCompleted] = useState<CompletedOrdersResponse | null>({ past_orders: [] });
const [Current, setCurrent] = useState<CurrentOrdersResponse | null>({ current_orders: [] }); 

  const [selectedTab, setSelectedTab] = useState(0);
  const { isDarkMode, toggleDarkMode } = useTheme();
  

  const Completed_Orders = async () => {
        try {
          const response = await axios.get("https://nanziback.liara.run/user/order/myorder/", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setCompleted({ past_orders: response.data.past_orders ?? [] });
          setCurrent({ current_orders: response.data.current_orders ?? [] }); 
          //console.log(response.data.current_orders);   
          console.log(`data from back: ${response.data}`);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
  };

  console.log(Completed);
  const groupedOrders = Completed?.past_orders?.reduce((acc, orderItem) => {  
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
  const groupedCurrentOrders = Current?.current_orders?.reduce((acc, orderItem) => {  
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
 
  const PastArray = groupedOrders ? Object.values(groupedOrders) : [];
  const CurrentArray=  groupedCurrentOrders ? Object.values(groupedCurrentOrders) : [];
  
    
  useEffect(() => {
    Completed_Orders();
  }, []);



  return (
    <>

      <div className={`sm:rounded-xl dark:bg-[#191919] lg:mx-6 p-4
                bg-white sm:shadow-md 
                 xl:mt-4 min-h-screen mb-4`}>  
      <Menu currentOrdersCount={convertToPersianNumbers(CurrentArray.length)}
       finalOrdersCount={convertToPersianNumbers(PastArray.length)} 
       selectedTab={selectedTab} // 👈 Pass selectedTab  
        setSelectedTab={setSelectedTab} // 👈 Pass setSelectedTab  
/> 
        {/* <CurrentOrder></CurrentOrder> */}
      
     {selectedTab == 0 ? (
  PastArray && PastArray.length > 0 ? (
    PastArray.map(orderItem => (
      <OrderCard
        key={orderItem.id}
        orderkey={orderItem.id}
        id={convertToPersianNumbers(orderItem.id)}
        total_price={convertPrice(orderItem.total_price)}
        delivery_day={orderItem.delivery.delivery_date ? convertDateInPersian(orderItem.delivery.delivery_date) : "Date not available"}
        delivery_clock={orderItem.delivery.end_time ? convertTimeToPersian(orderItem.delivery.end_time) : "Time not valid"}
        distination={""}
        product_count={convertToPersianNumbers(orderItem.products.length - 3)}
        product_photos={orderItem.products.slice(0, 3).map(prod => prod)}
      />
        ))
      ) : (
        <p className={`flex mt-25 justify-center ${isDarkMode ? "text-white" : "text-[#191919]"}`}>
          هیچ سفارشی یافت نشد
        </p>
      )
    ) : (
      CurrentArray && CurrentArray.length > 0 ? (
    CurrentArray.map(orderItem => (
      <CurrentOrder
        key={orderItem.id}
        orderkey={orderItem.id}
        id={convertToPersianNumbers(orderItem.id)}
        total_price={orderItem.total_price}
        delivery_day={orderItem.delivery.delivery_date ? convertDateInPersian(orderItem.delivery.delivery_date) : "Date not available"}
        delivery_clock={orderItem.delivery.end_time ? convertTimeToPersian(orderItem.delivery.end_time) : "Time not valid"}
        distination={""}
        address={orderItem.location.address}
        reciver={orderItem.reciver}
        product_count={convertToPersianNumbers(orderItem.products.length )}
        status={orderItem.status}
        phone_number={convertPhoneNumberToPersian(orderItem.reciver_phone)}
        description={orderItem.description || "فاقد توضیحات"}
      />
        ))
      ) : (
        <p className={`flex mt-25 justify-center dark:text-white`}>
          هیچ سفارشی یافت نشد
        </p>
      )
    )}
    </div> 
    </> 
  );  
};  

export default ProfileOrders;  