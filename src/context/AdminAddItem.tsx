'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AddItemModal from "../components/Admin/Add/AddItem/AddModal";


interface AdminItemCard {
    data:Array<{
        id: number,
        category: string,
        name: string,
        price: number,
        stock: number,
        box_type: number,
        box_color: string,
        color: string,
        image: string,
        average_rate: number,
        discount:number,
      }>;
    // removeAddress: (id: number) => Promise<void>;
    // selectAddress:(id: number) => Promise<void>;
    fetchData:() => Promise<void>;
}

const ItemContext = createContext<AdminItemCard>({
    data:[],
    // removeAddress: async () => Promise.resolve() ,
    // selectAddress:async () => Promise.resolve(),
    fetchData:async () => Promise.resolve(),   
});

export const ItemProvider = ({ children }) => {

    const [data, setData] = useState<Array<{
        id: number,
        category: string,
        name: string,
        price: number,
        stock: number,
        box_type: number,
        box_color: string,
        color: string,
        image: string,
        average_rate: number,
        discount:number
      }>>([]);
      useEffect(() => {
          fetchData();
      }, []);   

    //   const removeAddress = async (id: number) => {
    //       setData(prev => prev.filter(item => item.id !== id));

    //       try {
    //           await axios.delete(`https://nanziback.liara.run/users/locations/modify/${id}/`, {
    //               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //           });
    //       } catch (error) {
    //           console.error("Error deleting item:", error);
    //           fetchData();
    //       }
    //   };
    //   const selectAddress = async (id) => {   
    //       try {
    //           await axios.put(`https://nanziback.liara.run/users/locations/choose/location/${id}`, {}, {
    //               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //           });
    //           fetchData(); 
    //       } catch (error) {
    //           console.error("Error adding to cart:", error);
    //       }
    //   };
    const fetchData = async () => {
        console.log("admin add");
        try {
            const response = await axios.get("https://nanziback.liara.run/nanzi/admin/product/show/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            console.log("Raw Response:", response.data);

            if (Array.isArray(response.data)) {
                const sortedData = response.data
                    .map((item) => ({
                        id: item.id,
                        category: item.category,
                        name: item.name,
                        price: item.price,
                        stock: item.stock,
                        box_type: item.box_type,
                        box_color: item.box_color,
                        color: item.color,
                        image: item.image,
                        average_rate: item.average_rate,
                        discount:item.discount
                    }))
                    .sort((a, b) => a.stock - b.stock); 

                setData(sortedData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };
        


    const value = { data,fetchData };     
    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>

    );
};

export const useAdminItem = () => useContext(ItemContext);