import { axiosInstance } from "@/config/axios";
import { News } from "@/types/news";

const searchNews = async (q: string) : Promise<News[] | null> => {
    try {
        const response = await axiosInstance.post(`/news`, { q});
        if (!response.data) throw new Error('Error fetching news');
        return response.data.data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
};

export default searchNews;
