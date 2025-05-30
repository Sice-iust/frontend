import React from 'react';
import OrderCard from './Orders-cards';

const OrderList = () => {
  const orders = [
    {
      id: '12345',
      total_price: '120,000',
      recipientName: 'محمد احمدی',
      delivery_day: '1402/03/03',
      distination: 'تهران، خیابان فلامک، پلاک 23، طبقه 2',
      delivery_clock : '13-15',
      phone : '09123456789'
    },
    {
      id: '12346',
      total_price: '130,000',
      recipientName: 'مینا راد',
      delivery_day: '1402/03/03',
      distination: 'تهران، خیابان شریعتی، پلاک 45',
      delivery_clock : '13-15',
      phone : '09123456789'
    },
    {
      id: '12347',
      total_price: '140,000',
      recipientName: 'سارا نیکخواه',
      delivery_day: '1402/03/03',
      distination: 'اصفهان، خیابان چهارباغ، پلاک 89',
      delivery_clock : '13-15',
      phone : '09123456789'
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      {orders.map((order, index) => (
        <OrderCard
          orderkey={index}
          id={order.id}
          total_price={order.total_price}
          // recipientName={order.recipientName}
          delivery_day={order.delivery_day}
          distination={order.distination} 
          delivery_clock={order.delivery_clock}
          phone={order.phone}
          Reciever={order.recipientName} />
      ))}
    </div>

  );
};

export default OrderList;