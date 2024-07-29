import { axiosInstance } from "@/config/axios";
import { CategoryRes } from "@/types/category";

const getCategory = async (categories: string[]): Promise<CategoryRes[]> => {
    try {
        const response = await axiosInstance.post(`/news/categories`, { categories });
        if (!response.data) throw new Error('Error fetching news');
        // console.log('response:', response.data.data);
        return response.data.data;
    } catch (error) {
        // console.error('Error fetching news:', error);
        return [];
    }
};

export default getCategory;
