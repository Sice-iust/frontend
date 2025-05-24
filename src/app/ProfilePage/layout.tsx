'use client';
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import HamburgerButton from './hamburgerbutton';
import { useTheme } from '../../components/theme';
import OrdersPage from './OrdersPage/OrdersPage';
import AddressesPage from "./AddressPage/Address"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  // const { isDarkMode } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersPage />;
      case 'addresses':
        return <AddressesPage />;
      default:
        return <OrdersPage />;
    }
  };

  return (
    <div className={`dark:bg-[#383535] bg-[#f5f5f5] min-h-screen`}>
      <HamburgerButton 
        isOpen={isMobileOpen} 
        toggle={() => setIsMobileOpen(!isMobileOpen)} 
      />
      
      <div className="flex flex-col lg:flex-row w-full">
        
        <div className={`
          flex-grow lg:w-[70%] xl:w-[75%] 2xl:w-[80%]
          order-1 lg:order-none 
          transition-opacity duration-300
          ${isMobileOpen ? 'lg:opacity-100 opacity-0 lg:block hidden' : 'opacity-100 block'}
        `}>
          {renderContent()}
        </div>
        
        
        <div className={`
          w-full lg:w-[30%] xl:w-[25%] 2xl:w-[20%]
          fixed overflow-x-auto lg:sticky top-0 z-40
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          dark:bg-white
          h-screen lg:h-[calc(100vh-2rem)] lg:my-4
          shadow-lg lg:shadow-none
        `}>
          <Sidebar 
            setIsMobileOpen={setIsMobileOpen}
            isMobileOpen={isMobileOpen}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
}