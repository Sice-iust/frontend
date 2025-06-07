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
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  fetchCategories: async () => { return undefined; },
  addCategory: async () => { return undefined; },
});

export const CategoryProvider = ({ children }) => {
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
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
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
    <CategoryContext.Provider value={{ categories, fetchCategories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);