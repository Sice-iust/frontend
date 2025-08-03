"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  category: string;
  box_color: string;
  photo: string;
}

interface CategoryContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (categoryData: FormData) => Promise<true | undefined>;
  removeAdmincat: (id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  fetchCategories: async () => { return undefined; },
  addCategory: async () => { return undefined; },
  removeAdmincat: async () => Promise.resolve() ,
});

export const CategoryProvider = ({ children }) => {
  
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
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://nanziback.liara.run/nanzi/admin/categories/name/",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (Array.isArray(response.data)) {
        setCategories(response.data);
        setData(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const removeAdmincat = async (id: number) => {
      setData(prev => prev.filter(item => item.id !== id));
      console.log("i am hereee");
      try {
          await axios.delete(`https://nanziback.liara.run/nanzi/admin/category/modify/${id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
      } catch (error) {
          console.error("Error deleting item:", error);
          fetchCategories();
      }
  };

  const addCategory = async (categoryData: FormData) => {
    try {
      const response = await axios.post(
        "https://nanziback.liara.run/nanzi/admin/category/create/",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        await fetchCategories(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ removeAdmincat,categories, fetchCategories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);