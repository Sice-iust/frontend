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
    removeAddress: (id: number) => Promise<void>;
}

const CartContext = createContext<AddressItemsType>({
    data:[],
    removeAddress: async () => Promise.resolve() ,
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
          fetchData();
      }, []);   

      const removeAddress = async (id: number) => {
          setData(prev => prev.filter(item => item.id !== id));

          try {
              await axios.delete(`https://nanziback.liara.run/users/locations/modify/${id}/`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              });
          } catch (error) {
              console.error("Error deleting item:", error);
              fetchData();
          }
      };
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
    


    const value = { data,removeAddress };     
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>

    );
};

export const useADDRESS = () => useContext(CartContext);