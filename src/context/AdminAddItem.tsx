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
        description:string,
      }>;
    origindata:Array<{
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
        description:string,
      }>;
    categories:Array<string>;
    removeAdminItem: (id: number) => Promise<void>;
    fetchCategories: ()=>Promise<void>;
    AddItem:(img : File,name:string,price:string,stock:number,box:number,cat:number,des:string) => Promise<void>;
    UpdateItem:(img : File,name:string,price:string,stock:number,box:number,cat:number,des:string,id:number) => Promise<void>;
    fetchData:() => Promise<void>;
    applyFilters:(selectedCategories:Array<string>,onlyDiscounts:boolean,SelectedQuantities:Array<number>,selectedProducts:Array<string>)=> Promise<void>;
}

const ItemContext = createContext<AdminItemCard>({
    data:[],
    origindata:[],
    categories:[],
    removeAdminItem: async () => Promise.resolve() ,
    fetchCategories:async ()=> Promise.resolve(),
    AddItem:async () => Promise.resolve(),
    UpdateItem:async () => Promise.resolve(),
    fetchData:async () => Promise.resolve(),   
    applyFilters:async () => Promise.resolve(),   
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
        discount:number,
        description:string,
      }>>([]);
    const [origindata, setoriginData] = useState<Array<{
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
        description:string,
      }>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);
      useEffect(() => {
          fetchData();
          fetchCategories();
      }, []);   

      const removeAdminItem = async (id: number) => {
          setData(prev => prev.filter(item => item.id !== id));

          try {
              await axios.delete(`https://nanziback.liara.run/nanzi/admin/product/delete/${id}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              });
          } catch (error) {
              console.error("Error deleting item:", error);
              fetchData();
          }
      };
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
                        discount:item.discount,
                        description:item.description
                    }))
                    .sort((a, b) => a.stock - b.stock); 

                setData(sortedData);
                setoriginData(sortedData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    const applyFilters = async(selectedCategories,onlyDiscounts,SelectedQuantities,selectedProducts) => {
        let filteredData = origindata;
        console.log("selected",selectedProducts);
        if (selectedCategories.length > 0) {
            filteredData = filteredData.filter(item => 
            selectedCategories.includes(item.category)
            );
        }
        if (SelectedQuantities.length > 0) {
            filteredData = filteredData.filter(item => 
            SelectedQuantities.includes(item.box_type)
            );
        }
        if (onlyDiscounts) {
            filteredData = filteredData.filter(item => item.discount > 0);
        }
        if (selectedProducts.length > 0) {
            filteredData = filteredData.filter(item => 
            selectedProducts.includes(item.name)
            );
        }
        setData(filteredData);
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://nanziback.liara.run/nanzi/admin/categories/name/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const categoriesArray = response.data.map(item => item.category);
            setCategories(categoriesArray);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCategories([]); 
        }
    };    
    const AddItem = async (img, name, price, stock, box, cat,des) => {
        const token = localStorage.getItem('token');
        console.log("cat",cat);
        try {
            const formData = new FormData();
            formData.append('new_photo', img);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('box_type', box);
            formData.append('category_id', cat);
            formData.append('description', des);

            await axios.post(`https://nanziback.liara.run/nanzi/admin/product/create/`, 
                formData, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            fetchData();
        } catch (error) {
            console.error(error.response?.data);
        }
    };
    const UpdateItem = async (img, name, price, stock, box, cat,des,id) => {
        const token = localStorage.getItem('token');
        console.log("cat",cat);
        try {
            const formData = new FormData();
            formData.append('new_photo', img instanceof File ? img : "");            
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('box_type', box);
            formData.append('category_id', cat);
            formData.append('description', des);

            await axios.put(`https://nanziback.liara.run/nanzi/admin/product/delete/${id}`, 
                formData, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            fetchData();
        } catch (error) {
            console.error(error.response?.data);
        }
    };
    const value = {origindata, data,categories,applyFilters,fetchData ,removeAdminItem ,fetchCategories,AddItem,UpdateItem};     
    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>

    );
};

export const useAdminItem = () => useContext(ItemContext);