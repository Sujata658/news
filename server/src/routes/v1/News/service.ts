import { getNews } from "./repository";


const NewsService = {
    async getNews(uri: string) {
        const response = await getNews(uri);
        return response;
    },
};

export default NewsService;
