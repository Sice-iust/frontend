// components/Search.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './navbar.module.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  stock: number;
  photo: string;
  average_rate: number;
  discount: number;
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://nanziback.liara.run/product/popular/'); // Adjust the endpoint as needed
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

  const groupedResults = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Product[]>);

  const highlightMatch = (text: string) => {
    if (!searchTerm || !text) return text;
    
    const textLower = text.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const index = textLower.indexOf(searchTermLower);
    
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <span className={styles.highlightedPart}>
          {text.substring(index, index + searchTerm.length)}
        </span>
        {text.substring(index + searchTerm.length)}
      </>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.searchWrapper} dir="rtl">
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}><SearchOutlinedIcon /></span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="نام کالای مورد نظر را جستجو کنید ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          dir="rtl"
        />
      </div>
      
      {isFocused && searchTerm && (
        <div className={`${styles.searchResults} ${isDarkMode ? styles.dark : styles.light}`}>
          {Object.entries(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>
                  <span>دسته بندی: {highlightMatch(category)}</span>
                </div>
                <div className={styles.itemsList}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.resultItem}>
                      <div className={styles.itemDetails}>
                        <div className={styles.itemField}>
                          <span className={styles.fieldLabel}>نام محصول: </span>
                          <span className={styles.searchIcon}>🔍</span>
                          {highlightMatch(item.name)}
                        </div>
                        <div className={styles.itemField}>
  <span className={styles.fieldLabel}>قیمت: </span>
  {item.discounted_price ? item.discounted_price.toLocaleString() : item.price.toLocaleString()} تومان
</div>
                        {item.stock > 0 ? (
                          <div className={styles.itemField}>
                            <span className={styles.fieldLabel}>موجودی: </span>
                            <span className={styles.inStock}>در انبار</span>
                          </div>
                        ) : (
                          <div className={styles.itemField}>
                            <span className={styles.outOfStock}>ناموجود</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>نتیجه‌ای یافت نشد</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;