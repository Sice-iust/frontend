"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface Order {
  id: number;
  location: {
    user: {
      username: string;
      phonenumber: string;
    };
    address: string;
    name: string;
    home_floor: string | null;
    home_unit: string | null;
    home_plaque: string | null;
  };
  delivery: {
    id: number;
    start_time: string;
    end_time: string;
    delivery_date: string;
    max_orders: number;
    current_fill: number;
    shipping_fee: string;
  };
  total_price: string;
  status: number;
  profit: string;
  discription: string;
  delivered_at: string | null;
  reciver: string;
  reciver_phone: string;
  is_admin_canceled: boolean;
  admin_reason: string | null;
  is_archive: boolean;
  
}


interface OrderContextType {
  currentOrders: Order[];
  pastOrders: Order[];
  loading: boolean;
  error: string | null;
  fetchCurrentOrders: () => Promise<void>;
  fetchPastOrders: () => Promise<void>;
  removeOrder: (orderId: number, isCurrent: boolean) => void;
  archiveOrder: (orderId: number) => void;
  updatestatus: (orderId: number, isCurrent: boolean) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://nanziback.liara.run/nanzi/admin/process/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Order[] = await response.json();
      setCurrentOrders(data);
    } catch (err) {
      setError("خطا در دریافت سفارش‌های جاری");
      console.error("Error fetching current orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://nanziback.liara.run/nanzi/admin/delivered/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Order[] = await response.json();
      setPastOrders(data);
    } catch (err) {
      setError("خطا در دریافت سفارش‌های گذشته");
      console.error("Error fetching past orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentOrders();
    fetchPastOrders();
  }, []);

  const removeOrder = (orderId: number, isCurrent: boolean) => {
    if (isCurrent) {
      setCurrentOrders(prev => prev.filter(order => order.id !== orderId));
    } else {
      setPastOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const archiveOrder = (orderId: number) =>{ 
    setPastOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? 
        { ...order, is_archive: true } : order)) ); 
    };


    const updatestatus = (orderId: number, isCurrent: boolean) => {
    if (isCurrent) {
        const orderToUpdate = currentOrders.find(order => order.id === orderId);
        if (orderToUpdate) {
        setCurrentOrders(prev => prev.filter(order => order.id !== orderId));
        setPastOrders(prev => [...prev, { ...orderToUpdate, status: 2 }]);
        return;
        }
    } else {
        const orderToUpdate = pastOrders.find(order => order.id === orderId);
        if (orderToUpdate) {
        setPastOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: 4 } : order
        ));
        }
    }
    };
    
    

  return (
    <OrderContext.Provider
      value={{
        currentOrders,
        pastOrders,
        loading,
        error,
        fetchCurrentOrders,
        fetchPastOrders,
        removeOrder,
        archiveOrder,
        updatestatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
};