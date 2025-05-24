'use client'
import React, { useState, useEffect } from "react";
import Menu from "./OrdersPage-menu";
import OrderCard from "./OrderCards";
import CurrentOrder from "./CurrentOrder";
import axios from "axios";
import { 
  convertDateInPersian, 
  convertPrice, 
  convertTimeToPersian, 
  convertToPersianNumbers,
  convertPhoneNumberToPersian 
} from "../../../utils/Coversionutils";
import { useTheme } from "../../../components/theme";

interface Product {
  photo: string;
  quantity: number;
}

interface Order {
  id: number;
  total_price: string;
  status: number;
  delivery: {
    delivery_date: string;
    end_time: string;
    shipping_fee: string;
  };
  location: {
    name: string;
    reciver: string;
    address: string;
    phonenumber: string;
  };
}

interface OrderItem {
  order: Order;
  product: Product;
  quantity: number;
}

interface OrdersResponse {
  past_orders: OrderItem[];
  current_orders: OrderItem[];
}

const ProfileOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for past, 1 for current
  const { isDarkMode } = useTheme();

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://nanziback.liara.run/user/order/myorder/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders({
        past_orders: response.data.past_orders ?? [],
        current_orders: response.data.current_orders ?? []
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Group orders by ID
  const groupOrders = (orderItems: OrderItem[]) => {
    return orderItems?.reduce((acc, orderItem) => {
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
  };

  const pastOrders = groupOrders(orders?.past_orders || []);
  const currentOrders = groupOrders(orders?.current_orders || []);

  const pastOrdersArray = pastOrders ? Object.values(pastOrders) : [];
  const currentOrdersArray = currentOrders ? Object.values(currentOrders) : [];

  const displayedOrders = selectedTab === 0 ? pastOrdersArray : currentOrdersArray;

  return (
    <div className={`sm:rounded-xl dark:bg-[#191919] bg-white sm:shadow-md sm:p-4 sm:mb-10 sm:w-full sm:h-screen sm:mt-0 sm:overflow-hidden sm:mx-auto sm:block hidden md:w-[70%] md:mx-7 lg:w-[70%] lg:mx-0 xl:mx-7 xl:mt-10 xl:w-[70%]`}>
      <Menu 
        currentOrdersCount={convertToPersianNumbers(currentOrdersArray.length)}
        finalOrdersCount={convertToPersianNumbers(pastOrdersArray.length)}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {/* Orders Container with Vertical Scroll */}
      <div className="overflow-y-auto h-[calc(100%-60px)] pr-2">
        {displayedOrders.length > 0 ? (
          displayedOrders.map((orderItem) => (
            <div key={orderItem.id} className="mb-4">
              {selectedTab === 0 ? (
                <OrderCard
                  orderkey={orderItem.id}
                  id={convertToPersianNumbers(orderItem.id)}
                  total_price={convertPrice(orderItem.total_price)}
                  delivery_day={orderItem.delivery.delivery_date ? convertDateInPersian(orderItem.delivery.delivery_date) : "Date not available"}
                  delivery_clock={orderItem.delivery.end_time ? convertTimeToPersian(orderItem.delivery.end_time) : "Time not valid"}
                  distination={orderItem.location.name}
                  product_count={convertToPersianNumbers(orderItem.products.length - 3)}
                  product_photos={orderItem.products.slice(0, 3).map(prod => prod)}
                />
              ) : (
                <CurrentOrder
                  orderkey={orderItem.id}
                  id={convertToPersianNumbers(orderItem.id)}
                  total_price={convertPrice(orderItem.total_price)}
                  delivery_day={orderItem.delivery.delivery_date ? convertDateInPersian(orderItem.delivery.delivery_date) : "Date not available"}
                  delivery_clock={orderItem.delivery.end_time ? convertTimeToPersian(orderItem.delivery.end_time) : "Time not valid"}
                  distination={orderItem.location.name}
                  address={orderItem.location.address}
                  reciver={orderItem.location.reciver}
                  product_count={convertToPersianNumbers(orderItem.products.length)}
                  status={orderItem.status}
                  phone_number={convertPhoneNumberToPersian(orderItem.location.phonenumber)}
                />
              )}
            </div>
          ))
        ) : (
          <p className={`flex justify-center items-center h-full ${isDarkMode ? "text-white" : "text-[#191919]"}`}>
            هیچ سفارشی یافت نشد
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileOrders;