import React, { useState, useEffect } from 'react';
import OrderCard from './Orders-cards';
import { convertPrice } from '../../../utils/Coversionutils';
import { convertPhoneNumberToPersian } from '../../../utils/Coversionutils';
import { useOrderContext } from '../../../context/Adminordercontext'

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
  

  const {currentfilter, filteredCurrentOrders, currentOrders, removeOrder ,  archiveOrder, updatestatus  ,error , loadingCurrent}=useOrderContext()

  

  if (loadingCurrent) return <div className="text-center py-4">در حال بارگذاری...</div>;
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

  console.log("isfilter",currentfilter);

  const ordersToDisplay = currentfilter ? filteredCurrentOrders : currentOrders;

  return (
    <div className='mb-5'>
      <div className="flex flex-col pr-6 pl-6 pt-2 pb-2 h-[calc(120vh-120px)] overflow-y-auto bg-white dark:bg-[#191919]">
        {ordersToDisplay.map((order) => {
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
              statusupdate={updatestatus}
              archiveupdate={archiveOrder}
              isCurrent={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;