import { ReactNode, useContext,  useState } from "react";
import { createContext } from "react";

interface CategoryContextType {
    categories: string[];
    setCategorys: (categories: string[]) => void;
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    setCategorys: () => {}
});

const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategorys] = useState<string[]>([]);

    return (
        <CategoryContext.Provider value={{ categories, setCategorys }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;
