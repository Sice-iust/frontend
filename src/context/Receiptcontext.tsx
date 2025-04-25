'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface CartContextType {
    cartItems: any[];
    loading: boolean;
    counts: number,
    totalDiscount: number,
    totalActualPrice: number,
    incrementQuantity: (id: number) => Promise<void>;
    decrementQuantity: (id: number) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    loading: true,
    counts:0,
    totalDiscount:0,
    totalActualPrice:0,
    incrementQuantity: async () => Promise.resolve(), 
    decrementQuantity: async () => Promise.resolve(), 
    removeItem: async () => Promise.resolve() 
});

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [counts, setCounts] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [loading, setLoading] = useState(true);



    

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
        try {
            await axios.delete(`https://nanziback.liara.run/user/cart/modify/${id}/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchData();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, counts, totalDiscount, totalActualPrice, loading, 
                                       incrementQuantity, decrementQuantity, removeItem }}>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);