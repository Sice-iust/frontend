import React, { useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import Filterbyid from './Filterbyid';
import { useOrderContext } from '../../../context/Adminordercontext';
import Filterbyslot from './Filterbytimes';
import Filterswitch from './Filterswitch';


interface FilterOptions {
  orderNumber: string;
  selectedOrders: string[];
  startDate: string;
  endDate: string;
  timeRanges: string[];
  archivedOrders: boolean;
  canceledOrders: boolean;
}


const Filter= () => {

  const {selectedTab , currentOrders , pastOrders , handleClearFilters}=useOrderContext()

  const orderNumbers = selectedTab === 0 
  ? pastOrders.map(order => order.id.toString()) 
  : currentOrders.map(order => order.id.toString());

  


  const handleOrderSelect = (orderNumber: string) => {
    console.log('Selected order:', orderNumber);
  };

  return (
    <div className="bg-[#f5f5f5] dark:bg-[#383535]"> 
      <div className="box-content ml-10 mt-9 mb-10 min-h-40 w-100 rounded-2xl bg-white dark:bg-[#191919]">
        <div className="flex justify-between">
          <button
            className="flex items-center ml-5 mt-5 rounded-2xl bg-[#d9d9d9] dark:bg-[#383535] dark:text-[#f5f5f5]
                     text-black  px-2 py-1 boarder-2xl"
            onClick={handleClearFilters}
          >
            <span className="mr-0 cursor-pointer">حذف فیلترها</span>
            <MdOutlineFilterAltOff className="h-5 w-5 text-[#F18825]" />
          </button>
          <button className="text-black dark:text-white font-bold text-lg mt-3 px-4 py-0">فیلترها</button>
        </div>
              <Filterbyid 
                orders={orderNumbers} 
                onSelect={handleOrderSelect}
                placeholder="شماره سفارش را وارد کنید..."
                
              />
              <Filterbyslot />
              <Filterswitch/>
      </div>
    </div>
  );
};

export default Filter;