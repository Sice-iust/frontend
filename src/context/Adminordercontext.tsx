"use client";
import { set } from "date-fns-jalali";
import React, { createContext, useState, useContext, useEffect } from "react";

interface Order {
  id: number;
  selected?: boolean; 
  location: {
    user: { username: string; phonenumber: string };
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
  loadingCurrent: boolean;
  loadingPast: boolean;
  error: string | null;
  selectedTab: number;
  filteredCurrentOrders: Order[];
  filteredPastorders : Order[];
  currentfilter :boolean;
  pastfilter:boolean;
  selectedOrderscurrent:string[];
  selectedOrderspast:string[];
  selectedTimeSlotscurrent:string[];
  selectedTimeSlotspast:string[];
  setCurrentOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setPastOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setSelectedTab: (tab: number) => void;
  fetchCurrentOrders: () => Promise<void>;
  fetchPastOrders: () => Promise<void>;
  removeOrder: (orderId: number, isCurrent: boolean) => void;
  archiveOrder: (orderId: number) => void;
  updatestatus: (orderId: number, isCurrent: boolean) => void;
  getFilteredCurrentOrders: () => void;
  getFilteredOrdersByTimeSlots: () => void;
  setSelectedOrderscurrent: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedOrderspast: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTimeSlotscurrent: React.Dispatch<React.SetStateAction<string[]>>;
  setselectedtimeslotspast: React.Dispatch<React.SetStateAction<string[]>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [loadingCurrent, setLoadingCurrent] = useState<boolean>(false);
  const [loadingPast, setLoadingPast] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [filteredCurrentOrders, setFilteredCurrentOrders] = useState<Order[]>([]);
  const [pastfilter, setpastfilter] = useState<boolean>(false);
  const [filteredPastorders, setfilteredpastorders] = useState<Order[]>([]);
  const [currentfilter, setcurrentfilter] = useState<boolean>(false);
  const [selectedOrderscurrent, setSelectedOrderscurrent] = useState<string[]>([]);
  const [selectedOrderspast, setSelectedOrderspast] = useState<string[]>([]);
  const [selectedTimeSlotscurrent, setSelectedTimeSlotscurrent] = useState<string[]>([]);
  const [selectedTimeSlotspast, setselectedtimeslotspast] = useState<string[]>([]);



  const fetchCurrentOrders = async () => {
    setLoadingCurrent(true);
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
      setLoadingCurrent(false);
    }
  };

  const fetchPastOrders = async () => {
    setLoadingPast(true);
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
      setLoadingPast(false);
    }
  };

  useEffect(() => {
    fetchCurrentOrders();
    fetchPastOrders();
  }, []);

  const removeOrder = (orderId: number, isCurrent: boolean) => {
    if (isCurrent) {
      setCurrentOrders(prev => prev.filter(order => order.id !== orderId));
      fetchPastOrders();
    } else {
      setPastOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const archiveOrder = (orderId: number) => {
    setPastOrders(prevOrders =>
      prevOrders.map(order => (order.id === orderId ? { ...order, is_archive: true } : order))
    );
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
        setPastOrders(prev =>
          prev.map(order => (order.id === orderId ? { ...order, status: 4 } : order))
        );
      }
    }
  };

  const getFilteredCurrentOrders = () => {
    if(selectedTab==1)
    {
        if(selectedTimeSlotscurrent.length>0)
        {
            const filteredOrders = filteredCurrentOrders.filter(order => selectedOrderscurrent.includes(String(order.id)));
            setFilteredCurrentOrders(filteredOrders); 
        }
        if(selectedTimeSlotscurrent.length==0)
        {
            const filteredOrders = currentOrders.filter(order => selectedOrderscurrent.includes(String(order.id)));
            setFilteredCurrentOrders(filteredOrders); 
        }
        if(selectedOrderscurrent.length>0)
        {
            setcurrentfilter(true);
        }
        else
        {
            setcurrentfilter(false);
        }
    }
    if(selectedTab==0)
    {
        if(selectedOrderspast.length>0)
        {
            const filteredOrders = filteredPastorders.filter(order => selectedOrderspast.includes(String(order.id)));
            setfilteredpastorders(filteredOrders); 
        }
        if(selectedOrderspast.length==0)
        {
            const filteredOrders = pastOrders.filter(order => selectedOrderspast.includes(String(order.id)));
            setfilteredpastorders(filteredOrders); 
        }
        if(selectedOrderspast.length>0)
        {
            setpastfilter(true);
        }
        else
        {
            setpastfilter(false);
        }
    }
};


const getFilteredOrdersByTimeSlots = () => {
  if (selectedTab === 1) {
    if(selectedOrderscurrent.length>0)
    {
        const filteredOrders = filteredCurrentOrders.filter(order =>
        selectedTimeSlotscurrent.includes(`${order.delivery.start_time.split(':')[0]}-${order.delivery.end_time.split(':')[0]}`)
        );
        setFilteredCurrentOrders(filteredOrders);
    }
    if(selectedOrderscurrent.length==0)
    {
        const filteredOrders = currentOrders.filter(order =>
        selectedTimeSlotscurrent.includes(`${order.delivery.start_time.split(':')[0]}-${order.delivery.end_time.split(':')[0]}`)
        );
        setFilteredCurrentOrders(filteredOrders);
    }
    if(selectedTimeSlotscurrent.length>0)
    {
        setcurrentfilter(true);
    }
    else
    {
        setcurrentfilter(false);
    }
  } else if (selectedTab === 0) {
    if(selectedOrderspast.length>0)
    {
        const filteredOrders = filteredPastorders.filter(order =>
        selectedTimeSlotspast.includes(`${order.delivery.start_time.split(':')[0]}-${order.delivery.end_time.split(':')[0]}`)
        );
        setfilteredpastorders(filteredOrders);
    }
    if(selectedOrderspast.length==0)
    {
        const filteredOrders = pastOrders.filter(order =>
        selectedTimeSlotspast.includes(`${order.delivery.start_time.split(':')[0]}-${order.delivery.end_time.split(':')[0]}`)
        );
        setfilteredpastorders(filteredOrders);
    }
    if(selectedTimeSlotspast.length>0)
    {
        setpastfilter(true);
    }
    else
    {
        setpastfilter(false);
    }
  }
};

  

  return (
    <OrderContext.Provider
      value={{
        currentOrders,
        pastOrders,
        loadingCurrent,
        loadingPast,
        error,
        selectedTab,
        filteredCurrentOrders,
        currentfilter,
        filteredPastorders,
        pastfilter,
        selectedOrderscurrent,
        selectedOrderspast,
        selectedTimeSlotscurrent,
        selectedTimeSlotspast,
        setSelectedOrderspast,
        setCurrentOrders, 
        setPastOrders,
        setSelectedTab, 
        fetchCurrentOrders,
        fetchPastOrders,
        removeOrder,
        archiveOrder,
        updatestatus,
        getFilteredCurrentOrders,
        getFilteredOrdersByTimeSlots,
        setSelectedOrderscurrent,
        setselectedtimeslotspast,
        setSelectedTimeSlotscurrent
        
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