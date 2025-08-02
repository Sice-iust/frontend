'use client';
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import HamburgerButton from './hamburgerbutton';
import OrdersPage from './OrdersPage/OrdersPage';
import AddressesPage from './AddressPage/Address';
import SupportPage from './SupportPage/SupportPage'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  

  // useEffect(() => {
  //   if (isMobileOpen && window.innerWidth < 1024) {
  //     document.body.style.overflow = 'auto';
  //   } else {
  //     document.body.style.overflow = 'hidden';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'hidden';
  //   };
  // }, [isMobileOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders': return <OrdersPage />;
      case 'addresses': return <AddressesPage />;
      case 'support' : return <SupportPage/>;
      default: return <OrdersPage />;
    }
  };

  return (
    <div className="dark:bg-[#383535] bg-[#f5f5f5] min-h-screen ">
      <HamburgerButton 
        isOpen={isMobileOpen} 
        toggle={() => setIsMobileOpen(!isMobileOpen)} 
      />
      
      <div className="flex flex-col lg:flex-row w-full">
        {/* Content Area */}
        <div className={`
          flex-grow lg:w-[70%] xl:w-[75%] 2xl:w-[80%]
          ${isMobileOpen ? 'lg:block hidden' : 'block'}
          ${isMobileOpen ? 'overflow-auto' : 'overflow-auto'}
        `}>
          {renderContent()}
        </div>
        
        {/* Sidebar */}
        <div className={`
            w-full lg:w-[50%] xl:w-[25%] 2xl:w-[20%]
            fixed lg:sticky top-0 left-0
            transform transition-transform duration-300 ease-in-out
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-white dark:bg-[#191919]
            h-[calc(100vh-5rem)] 
            pb-20 
            overflow-y-auto mr-4 lg:my-4 lg:rounded-xl
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