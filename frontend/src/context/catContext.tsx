import { CategoryRes } from "@/types/category";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { usePreference } from "./prefContext";
import getCategory from "@/apis/news/getCategory";

import load from "../assets/icons8-loading.gif"
import newsload from '../assets/icons8-newspaper.gif'

interface CategoryContextType {
    categories: CategoryRes[];
    setCategories: (categories: CategoryRes[]) => void;
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    setCategories: () => { }
});

const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const { pref } = usePreference();
    const [categories, setCategories] = useState<CategoryRes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            if (pref) {
                try {
                    const cats = await getCategory(pref.categories);
                    if (cats) {
                        setCategories(cats);
                    }
                } catch (error) {
                    console.error("Error fetching categories:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCategories();
    }, [pref]);

    if (loading) {
        return <div className="w-screen h-screen flex flex-col items-center justify-center">
                <img src={newsload} alt="loading" className="w-20 h-20 mx-auto" />
                <img src={load} alt="loading" className="w-20 h-20 mx-auto" />
        </div>
    }

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;
