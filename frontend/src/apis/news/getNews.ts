import { axiosInstance } from "@/config/axios";

const getNews = async (query: string) => {
    try {
        const response = await axiosInstance.post(`/news/`, { query });
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    } catch (error) {
        console.error('Error during getNews:', error);
        return [];
    }
}

export default getNews;
