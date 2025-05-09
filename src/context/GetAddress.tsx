'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface AddressItemsType {
    data:Array<{
        id: number;
        username: string;
        address: string;
        name: string;
        receiver: string;
        phone: string;
        isChosen: boolean;
      }>;
}

const CartContext = createContext<AddressItemsType>({
    data:[]
});

export const AddressProvider = ({ children }) => {

    //get address
    const [data, setData] = useState<Array<{
        id: number;
        username: string;
        address: string;
        name: string;
        receiver: string;
        phone: string;
        isChosen: boolean;
      }>>([]);
    
      useEffect(() => {
        const fetchData = async () => {
          console.log("Fetching data...");
          try {
            const response = await axios.get("https://nanziback.liara.run/users/locations/mylocation/", {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            console.log("Raw Response:", response.data);
    
            if (Array.isArray(response.data)) {
              setData(response.data.map((item) => ({
                id: item.id,
                username: item.user?.username || "Unknown",
                address: item.address,
                name: item.name,
                receiver: item.reciver,
                phone: item.phonenumber,
                isChosen: item.is_choose
              })));
            } else {
              setData([]);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
          } 
        };
    
        fetchData();
      }, []);

    const value = { data };     
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>

    );
};

export const useADDRESS = () => useContext(CartContext);