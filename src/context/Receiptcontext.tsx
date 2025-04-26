'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface CartContextType {
    cartItems: any[];
    loading: boolean;
    counts: number,
    totalDiscount: number,
    totalActualPrice: number,
    userquantity : Record<number, number>,
    incrementQuantity: (id: number) => Promise<void>;
    decrementQuantity: (id: number) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    handleAdd: (id: number) => Promise<void>;
    fetchDatauser: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    loading: true,
    counts:0,
    totalDiscount:0,
    totalActualPrice:0,
    userquantity:{},
    incrementQuantity: async () => Promise.resolve(), 
    decrementQuantity: async () => Promise.resolve(), 
    removeItem: async () => Promise.resolve() ,
    handleAdd: async () => Promise.resolve(), 
    fetchDatauser: async () => Promise.resolve() 
});

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [counts, setCounts] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userquantity, setUserQuantity] = useState<Record<number, number>>({});



    

    const fetchData = async () => {
        console.log("entered")
        setLoading(true);
        try {
            const response = await axios.get("https://nanziback.liara.run/user/cart/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setCartItems(response.data.cart_items || []);
            setCounts(response.data.counts || 0);
            setTotalDiscount(response.data.total_discount || 0);
            setTotalActualPrice(response.data.total_actual_price || 0);
            console.log("Data from server:", response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]);
            setCounts(0);
            setTotalDiscount(0);
            setTotalActualPrice(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(cartItems)
    }, []);

    const incrementQuantity = async (id) => {
        setUserQuantity((prev) => ({
            ...prev,
            [id]: (prev[id]) + 1, 
        }));
    
    
        try {
            await axios.put(`https://nanziback.liara.run/user/cart/modify/${id}/?update=add`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchData(); 
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const decrementQuantity = async (id) => {
        setUserQuantity((prev) => ({
            ...prev,
            [id]: (prev[id]) - 1, 
        }));
    
        try {
            await axios.put(`https://nanziback.liara.run/user/cart/modify/${id}/?update=delete`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchData();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const removeItem = async (id) => {
        setUserQuantity((prev) => {
            const updated = { ...prev };
            delete updated[id]; 
            return updated;
        });
    
        try {
            await axios.delete(`https://nanziback.liara.run/user/cart/modify/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchData();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleAdd = async (itemId) => {
        setUserQuantity((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1, 
        }));
    
        const token = localStorage.getItem('token'); 
        try {
            
            await axios.post(`https://nanziback.liara.run/user/cart/creat/${itemId}/`, {
              quantity: 1
            }, {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
            });
            fetchData();
          } catch (error) {
            if (error.response?.data?.error === "You already have this product in your cart") {
              await axios.put(`https://nanziback.liara.run/user/cart/modify/${itemId}/?update=${"add"}`, {
              }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
              });
              fetchData();
            } else {
              console.error(error.response?.data);
            }
          }
    };

    const fetchDatauser = async () => {  
        try {  
            const response = await axios.get("https://nanziback.liara.run/user/cart/quantity/", {   
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json", }
            });  
            const quantities = response.data.reduce((acc, item) => {
                acc[item.product_id] = item.quantity; 
                return acc;
            }, {});
    
            setUserQuantity(quantities);
    
        } catch (err) {  
            console.error("Error fetching data:", err);  
        } 
    };  

    



    return (
        <CartContext.Provider value={{ cartItems, counts, totalDiscount, totalActualPrice, loading, userquantity,
                                       incrementQuantity, decrementQuantity, removeItem ,handleAdd ,fetchDatauser}}>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);