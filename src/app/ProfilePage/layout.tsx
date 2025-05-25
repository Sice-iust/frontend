'use client';
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import HamburgerButton from './hamburgerbutton';
import OrdersPage from './OrdersPage/OrdersPage';
import AddressesPage from './AddressPage/Address';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  // useEffect(() => {
  //   if (isMobileOpen && window.innerWidth < 1024) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isMobileOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders': return <OrdersPage />;
      case 'addresses': return <AddressesPage />;
      default: return <OrdersPage />;
    }
  };

  return (
    <div className="dark:bg-[#383535] bg-[#f5f5f5] min-h-screen">
      <HamburgerButton 
        isOpen={isMobileOpen} 
        toggle={() => setIsMobileOpen(!isMobileOpen)} 
      />
      
      <div className="flex flex-col lg:flex-row w-full">
        {/* Content Area */}
        <div className={`
          flex-grow lg:w-[70%] xl:w-[75%] 2xl:w-[80%]
          ${isMobileOpen ? 'lg:block hidden' : 'block'}
          ${isMobileOpen ? 'overflow-hidden' : 'overflow-auto'}
        `}>
          {renderContent()}
        </div>
        
        {/* Sidebar */}
        <div className={`
          w-full lg:w-[30%] xl:w-[25%] 2xl:w-[20%] mr-4
           lg:sticky top-0  z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white dark:bg-[#191919]
          h-screen lg:h-[calc(100vh-2rem)] lg:my-4
          overflow-y-auto lg:overflow-y-hidden
        `}>
          <Sidebar 
            setIsMobileOpen={setIsMobileOpen}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
}