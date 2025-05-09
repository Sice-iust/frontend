import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {convertToPersianNumbers} from "../utils/Coversionutils"
import ProductPage from "./ProductPage/ProductPage";
import { ClassNames } from '@emotion/react';


interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  discounted_price: number;
}

interface SearchProps {
  isDarkMode: boolean;
}

const Search: React.FC<SearchProps> = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isOpen, setIsOpen] = useState(false); 
  const [selectedItem, setSelectedItem] = useState<number | null>(null); 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://nanziback.liara.run/product/all/');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems = products.filter(item => {
    if (!searchTerm) return false;
    const searchTermLower = searchTerm.toLowerCase();


    return (
      item.name.toLowerCase().includes(searchTermLower) ||
      item.category.toLowerCase().includes(searchTermLower)
    );
  });
const handleOpenModal = (itemId: number) => {
    setSelectedItem(itemId);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const groupedResults = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Product[]>);

  const highlightMatch = (text) => {
    if (!searchTerm) return text;

    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const parts = text.split(regex);

    return (
      <span className="whitespace-nowrap">
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase()
            ? <span key={index} className="text-[#B8681D]">{part}</span>
            : part
        )}
      </span>
    );
  };

  // if (error) return <div>{error}</div>;

  return (
    <div  dir="rtl">
      <div 
        className={`
        flex 
        items-center 
        rounded-3xl p-2 
        dark:bg-[#383535] bg-[#D9D9D9]
        mx-auto `} dir='rtl'>
        <span className="text-[#B8681D]"><SearchOutlinedIcon /></span>
        <input
          type="text"
          className={` px-2 py-1 
            focus:outline-none font-vazir
             w-full rounded-full text-right
              bg-transparent  text-[16px]  dark:placeholder:[#D9D9D9] placeholder:[#696363]`}
          placeholder="نام کالای مورد نظر را جستجو کنید ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          dir="rtl"
        />
      </div>

      {isFocused && searchTerm && (
        <div className={`md:absolute mt-2 
        w-full md:w-182 max-h-[500px] overflow-y-scroll z-[1000] 
        rounded-3xl shadow-lg p-4 dark:bg-[#383535] bg-[#D9D9D9]`}>
          {Object.entries(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="mb-5 last:mb-0">
                <div className={`dark:text-white text-black flex ml-1 items-center pb-2 mb-2 font-bold border-b border-[#696363]`}>
                  <span>دسته بندی:</span> 
                  <span className='flex text-right items-center'>{highlightMatch(category)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleOpenModal(item.id)}
                    >
                      <div className={`flex items-center dark:text-gray-300 text-gray-700 `}>
                        <span className={`mr-2 font-bold dark:text-gray-300 text-gray-700 font-vazir`}>نام محصول:</span>
                        <span className="text-[#B8681D] font-bold">🔍</span>
                        {highlightMatch(item.name)}
                      </div>
                      <div className={`flex items-center dark:text-gray-300 `}>
                        <span className={`mr-2 font-bold dark:text-gray-300 font-vazir`}>قیمت:</span>
                       <span>
                          {convertToPersianNumbers(item.price ? item.
                            discounted_price.toLocaleString()
                            : item.price.toLocaleString())}{' '}
                          تومان
                        </span>
                      </div>
                      {item.stock > 0 ? (
                      <div className={`flex items-center dark:text-gray-300 `}>
                          <span className={`mr-2 font-bold dark:text-gray-300  font-vazir`}>موجودی: <span className={`font-medium ${isDarkMode ? "text-white " : "text-gray-700"}`}>{convertToPersianNumbers(item.stock)}</span></span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="text-gray-700">ناموجود</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700">نتیجه‌ای یافت نشد</div>
          )}
        </div>
      )}
      <div dir='ltr'>
       {isOpen && <ProductPage onClose={handleCloseModal} open={isOpen} itemid={selectedItem} />}
</div>
    </div>
   
  );
};

export default Search;