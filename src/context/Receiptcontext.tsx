'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface CartContextType {
    cartItems: any[];
    loading: boolean;
    counts: number,
    totalDiscount: number,
    totalActualPrice: number,
    shipping_fee: number,
    userquantity: Record<number, number>,
    userdelivery: any[],
    selectedSlotId: string,
    selectedDateId: string,
    totalActualPricewithshipp:number,
    shoppingNum:number;
    incrementQuantity: (id: number) => Promise<void>;
    decrementQuantity: (id: number) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    handleAdd: (id: number) => Promise<void>;
    fetchDatauser: () => Promise<void>;
    fetchdeliverydata: () => Promise<void>;
    handleSlotSelect: (id: string) => Promise<void>;

}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    loading: true,
    counts: 0,
    totalDiscount: 0,
    totalActualPrice: 0,
    shipping_fee: 0,
    userquantity: {},
    userdelivery: [],
    selectedSlotId: "",
    selectedDateId: "",
    totalActualPricewithshipp : 0,
    shoppingNum:0,
    incrementQuantity: async () => Promise.resolve(),
    decrementQuantity: async () => Promise.resolve(),
    removeItem: async () => Promise.resolve(),
    handleAdd: async () => Promise.resolve(),
    fetchDatauser: async () => Promise.resolve(),
    fetchdeliverydata: async () => Promise.resolve(),
    handleSlotSelect: async () => Promise.resolve()
});

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [counts, setCounts] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalActualPrice, setTotalActualPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userquantity, setUserQuantity] = useState<Record<number, number>>({});
    const [shipping_fee, setShipping_fee] = useState(0);
    const [userdelivery, setUserdelivery] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState<string>("");
    const [selectedDateId, setSelectedDateId] = useState<string>("");
    const [totalActualPricewithshipp ,setsetTotalActualPricewithshipp] = useState(0);
    const shoppingNum = Object.keys(userquantity).length;


    //Cart Data
    const fetchData = async () => {
        try {
            const response = await axios.get("https://nanziback.liara.run/user/cart/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            console.log(localStorage.getItem("token"));
            console.log("Data from server:", response.data);
            setCartItems(response.data.cart_items || []);
            setCounts(response.data.counts || 0);
            setTotalDiscount(response.data.total_discount || 0);
            setTotalActualPrice(response.data.total_actual_price|| 0);
            setsetTotalActualPricewithshipp(response.data.total_actual_price_with_shipp|| 0);
            setShipping_fee(response.data.shipping_fee || 0);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]);
            setCounts(0);
            setTotalDiscount(0);
            setTotalActualPrice(0);
            setShipping_fee(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(cartItems)
    }, []);

    //Start of Adding or Removing from Cart
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
    //End

    //fetching Quantity of Product in user cart
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

    //fetching user deliverydata
    const fetchdeliverydata = async () => {
        try {
            const response = await axios.get("https://nanziback.liara.run/user/cart/delivery/", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json", }
            });
            setUserdelivery(response.data);
            setSelectedSlotId(response.data.id);
            setSelectedDateId(response.data.delivery_date);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.error("No delivery data available (404 Not Found).");
                setUserdelivery([]);
                setSelectedSlotId("");
                setSelectedDateId("0");
            } else {
                console.error("Error fetching data:", err);
            }

        }
    };

    const handleSlotSelect = async (slotId: string) => {
        setSelectedSlotId(slotId);
        const token = localStorage.getItem('token');
        try {

            await axios.post(`https://nanziback.liara.run/user/cart/delivery/create/${slotId}/`, {
            }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
            });
            fetchData();
        } catch (error) {
            console.error(error.response?.data);
        }
    };


    return (
        <CartContext.Provider value={{
            cartItems, counts, totalDiscount, totalActualPrice, loading, shipping_fee,
            userquantity, userdelivery, selectedSlotId, selectedDateId,totalActualPricewithshipp,shoppingNum,
            incrementQuantity, decrementQuantity, removeItem, handleAdd, fetchDatauser,
            fetchdeliverydata, handleSlotSelect
        }}>
            {children}
        </CartContext.Provider>

    );
};

export const useCart = () => useContext(CartContext);