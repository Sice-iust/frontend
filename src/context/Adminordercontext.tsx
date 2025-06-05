import React, { createContext, useState, useContext, useEffect } from "react";

interface Order {
  id: number;
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
  removeOrder: (orderId: number) => void;
  updateStatus: (orderId: number, status: number) => void;
  archiveOrder: (orderId: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://nanziback.liara.run/nanzi/admin/delivered/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const removeOrder = (orderId: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const updateStatus = (orderId: number, status: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const archiveOrder = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, is_archive: true } : order))
    );
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrders: orders.filter((order) => !order.is_archive),
        pastOrders: orders.filter((order) => order.is_archive),
        removeOrder,
        updateStatus,
        archiveOrder,
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