import React from 'react';
import OrderCard from './Orders-cards';

const OrderList = () => {
  const orders = [
    {
      id: '12345',
      total_price: '120,000',
      recipientName: 'محمد احمدی',
      delivery_day: '1402/03/03',
      distination: 'ت23، طبقه 2',
      delivery_clock: '13-15',
      phone: '09123456789',
      Description: 'به فلانی تحویل داده بشه',
      isarchived : false,
      iscancled: false ,
    },
    {
      id: '12346',
      total_price: '130,000',
      recipientName: 'مینا راد',
      delivery_day: '1402/03/03',
      distination: 'تهران، خیابان شریعتی، پلاک 45',
      delivery_clock: '13-15',
      phone: '09123456789',
      Description: 'به فلانی تحویل داده بشه',
      isarchived : false,
      iscancled: true ,
    },
    {
      id: '12347',
      total_price: '140,000',
      recipientName: 'سارا نیکخواه',
      delivery_day: '1402/03/03',
      distination: 'اصفهان، خیابان چهارباغ، پلاک 89',
      delivery_clock: '13-15',
      phone: '09123456789',
      Description: 'به فلانی تحویل داده بشه',
      isarchived : true,
      iscancled: false ,
    },
    // Add more orders to test scrolling
    {
      id: '12348',
      total_price: '150,000',
      recipientName: 'علی محمدی',
      delivery_day: '1402/03/04',
      distination: 'مشهد، بلوار وکیل آباد، پلاک 12',
      delivery_clock: '14-16',
      phone: '09123456790',
      Description: 'تحویل به درب منزل',
      isarchived : false,
      iscancled: false ,
    },
    {
      id: '12349',
      total_price: '160,000',
      recipientName: 'فاطمه زهرا',
      delivery_day: '1402/03/04',
      distination: 'شیراز، خیابان زند، پلاک 34',
      delivery_clock: '15-17',
      phone: '09123456791',
      Description: 'تحویل به نگهبان',
      isarchived : false,
      iscancled: false ,
    },
    {
      id: '12350',
      total_price: '170,000',
      recipientName: 'رضا کریمی',
      delivery_day: '1402/03/05',
      distination: 'تبریز، خیابان امام، پلاک 56',
      delivery_clock: '16-18',
      phone: '09123456792',
      Description: 'تحویل به صاحبخانه',
      isarchived : false,
      iscancled: false ,
    }
  ];

  return (
    <div className="flex flex-col pr-6 pl-6 pt-2 pb-2 h-[calc(100vh-120px)] overflow-y-auto">
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderkey={index}
          id={order.id}
          total_price={order.total_price}
          delivery_day={order.delivery_day}
          distination={order.distination}
          delivery_clock={order.delivery_clock}
          phone={order.phone}
          Description={order.Description}
          Reciever={order.recipientName}
          isarchived={order.isarchived}
          iscancled={order.iscancled}
          iscompleted={true}
        />
      ))}
    </div>
  );
};

export default OrderList;