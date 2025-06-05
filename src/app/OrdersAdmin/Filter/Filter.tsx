import React, { useState } from "react";

interface FilterOptions {
  orderNumber: string;
  selectedOrders: string[];
  startDate: string;
  endDate: string;
  timeRanges: string[];
  archivedOrders: boolean;
  canceledOrders: boolean;
}

const Filter = () => {
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
    setFilters((prev) => ({
      ...prev,
      // [name]: type === "checkbox" ? (checked ? [...prev[name as keyof FilterOptions], value] : (prev[name as keyof FilterOptions] as string[]).filter((v) => v !== value)) : value,
    }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      orderNumber: "",
      selectedOrders: [],
      startDate: "1403-03-03",
      endDate: "1403-03-03",
      timeRanges: [],
      archivedOrders: false,
      canceledOrders: false,
    });
  };

  return (
    <div className="bg-[#f5f5f5]"> 
      <div className="box-content ml-10 mt-10 mb-10 min-h-40 w-100 rounded-2xl bg-white">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6 text-right">فیلترها</h1>
          
          <div className="filter-section mb-6">
            <h2 className="text-lg font-medium mb-3 text-right">شماره سفارش</h2>
            <input 
              type="text" 
              id="orderNumber" 
              name="orderNumber" 
              value={filters.orderNumber} 
              onChange={handleInputChange} 
              className="border rounded-lg px-4 py-2 w-full text-right" 
              placeholder="۱۲۳۴" 
            />
            <div className="order-options mt-3 space-y-2">
              {["۱۲۳۴۵۶", "۱۲۳۴۵۶۷", "۱۲۳۴۵۶۷۸"].map((order) => (
                <div key={order} className="flex items-center justify-end">
                  <label htmlFor={order} className="ml-3 text-right cursor-pointer">{order}</label>
                  <input 
                    type="checkbox" 
                    id={order} 
                    name="selectedOrders" 
                    value={order} 
                    checked={filters.selectedOrders.includes(order)} 
                    onChange={handleInputChange} 
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section mb-6">
            <h2 className="text-lg font-medium mb-3 text-right">زمان تحویل</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <input 
                  type="text" 
                  id="startDate" 
                  name="startDate" 
                  value={filters.startDate} 
                  onChange={handleInputChange} 
                  className="border rounded-lg px-4 py-2 w-full text-right" 
                  placeholder="۱۴۰۳/۰۳/۰۳"
                />
              </div>
              <div className="text-right">
                <input 
                  type="text" 
                  id="endDate" 
                  name="endDate" 
                  value={filters.endDate} 
                  onChange={handleInputChange} 
                  className="border rounded-lg px-4 py-2 w-full text-right" 
                  placeholder="۱۴۰۳/۰۳/۰۳"
                />
              </div>
            </div>
          </div>

          <div className="filter-section mb-6">
            <h2 className="text-lg font-medium mb-3 text-right">بازه</h2>
            <div className="time-options space-y-3">
              {["۱۲ تا ۹", "۱۶ تا ۱۳"].map((range) => (
                <div key={range} className="flex items-center justify-end">
                  <label htmlFor={range} className="ml-3 text-right cursor-pointer">{range}</label>
                  <input 
                    type="checkbox" 
                    id={range} 
                    name="timeRanges" 
                    value={range} 
                    checked={filters.timeRanges.includes(range)} 
                    onChange={handleInputChange} 
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="toggle-options space-y-3">
              <div className="flex items-center justify-end">
                <label htmlFor="archivedOrders" className="ml-3 text-right cursor-pointer">سفارش های آرشیو شده</label>
                <input 
                  type="checkbox" 
                  id="archivedOrders" 
                  name="archivedOrders" 
                  checked={filters.archivedOrders} 
                  onChange={handleToggleChange} 
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-end">
                <label htmlFor="canceledOrders" className="ml-3 text-right cursor-pointer">سفارش های لغو شده</label>
                <input 
                  type="checkbox" 
                  id="canceledOrders" 
                  name="canceledOrders" 
                  checked={filters.canceledOrders} 
                  onChange={handleToggleChange} 
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleClearFilters} 
            className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg float-left transition-colors"
          >
            حذف فیلترها
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;