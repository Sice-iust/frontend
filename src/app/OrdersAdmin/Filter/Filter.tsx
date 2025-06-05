import React, { useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import Filterbyid from './Filterbyid';
import { useOrderContext } from '../../../context/Adminordercontext';
import Filterbyslot from './Filterbytimes';


interface FilterOptions {
  orderNumber: string;
  selectedOrders: string[];
  startDate: string;
  endDate: string;
  timeRanges: string[];
  archivedOrders: boolean;
  canceledOrders: boolean;
}

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {

  const {selectedTab , currentOrders , pastOrders}=useOrderContext()

  const orderNumbers = selectedTab === 0 
  ? pastOrders.map(order => order.id.toString()) 
  : currentOrders.map(order => order.id.toString());


  const [filters, setFilters] = useState<FilterOptions>({
    orderNumber: "",
    selectedOrders: [],
    startDate: "1403-03-03",
    endDate: "1403-03-03",
    timeRanges: [],
    archivedOrders: false,
    canceledOrders: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [name]: type === "checkbox"
          ? checked
            ? [...(prev[name as keyof FilterOptions] as string[]), value]
            : (prev[name as keyof FilterOptions] as string[]).filter((v) => v !== value)
          : value,
      };

      // onFilterChange(updatedFilters); 
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    const resetFilters = {
      orderNumber: "",
      selectedOrders: [],
      startDate: "1403-03-03",
      endDate: "1403-03-03",
      timeRanges: [],
      archivedOrders: false,
      canceledOrders: false,
    };
    setFilters(resetFilters);
  };


  const handleOrderSelect = (orderNumber: string) => {
    console.log('Selected order:', orderNumber);
  };

  return (
    <div className="bg-[#f5f5f5]"> 
      <div className="box-content ml-10 mt-10 mb-10 min-h-40 w-100 rounded-2xl bg-white">
        <div className="flex justify-between">
          <button
            className="flex items-center ml-5 mt-5 rounded-2xl bg-[#d9d9d9] text-black px-2 py-1 boarder-2xl"
            onClick={handleClearFilters}
          >
            <span className="mr-0 cursor-pointer">حذف فیلترها</span>
            <MdOutlineFilterAltOff className="h-5 w-5 text-[#F18825]" />
          </button>
          <button className="text-black font-bold text-lg mt-3 px-4 py-2">فیلترها</button>
        </div>
              <Filterbyid 
                orders={orderNumbers} 
                onSelect={handleOrderSelect}
                placeholder="شماره سفارش را وارد کنید..."
              />
              <Filterbyslot />
      </div>
    </div>
  );
};

export default Filter;