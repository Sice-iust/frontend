import React, { useState, useEffect } from 'react';
import OrderCard from './Orders-cards';
import { convertPrice } from '../../../utils/Coversionutils';
import { convertPhoneNumberToPersian } from '../../../utils/Coversionutils';

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
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://nanziback.liara.run/nanzi/admin/process/', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Order[] = await response.json();
        setOrders(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const removeOrder = (orderId: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const statusupdate = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 4 } : order // Corrected: Set status to 4
      )
    );
  };

  if (loading) return <div className="text-center py-4">در حال بارگذاری...</div>;
  if (error) return <div className="text-center py-4 text-red-500">خطا: {error}</div>;

  const formatDestination = (location: Order["location"]) => {
    return [
      location.name,
      location.address,
      location.home_plaque ? `پلاک ${location.home_plaque}` : null,
      location.home_unit ? `واحد ${location.home_unit}` : null,
      location.home_floor ? `طبقه ${location.home_floor}` : null,
    ].filter(Boolean).join("-");
  };

  return (
    <div className='mb-5'>
      <div className="flex flex-col pr-6 pl-6 pt-2 pb-2 h-[calc(100vh-120px)] overflow-y-auto">
        {orders.map((order) => {
          const startHour = order.delivery.start_time.split(':')[0];
          const endHour = order.delivery.end_time.split(':')[0];
          const deliveryTime = `${startHour}-${endHour}`;
          const deliveryDate = new Date(order.delivery.delivery_date).toLocaleDateString('fa-IR');

          return (
            <OrderCard
              key={order.id}
              orderkey={order.id}
              id={order.id.toString()}
              total_price={convertPrice(order.total_price)}
              delivery_day={deliveryDate}
              distination={formatDestination(order.location)}
              delivery_clock={deliveryTime}
              phone={convertPhoneNumberToPersian(order.reciver_phone)}
              Description={order.discription}
              Reciever={order.reciver}
              isarchived={false}
              iscancled={false}
              iscompleted={false}
              admin_reason={null}
              status={1}
              removeOrder={removeOrder}
              statusupdate={statusupdate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;