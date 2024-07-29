import { axiosInstance } from "@/config/axios";

const getNews = async (country: string, category: string, page: number) => {
    try {
        const response = await axiosInstance.post(`/news`, { country: country? country: 'us', category: category? category: 'general', page: page? page.toString(): '1' });
        if (!response.data) throw new Error('Error fetching news');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
};

export default getNews;
