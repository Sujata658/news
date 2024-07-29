import env from "../../../config/env";
import { getNews } from "./repository";
import { NewsRequestBody } from "./types";

const NewsService = {
    async getNews(params: NewsRequestBody) {
        const query = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (value) query.append(key, String(value));
        }

        const hasCountry = 'country' in params;
        const hasCategory = 'category' in params;

        let endpoint = '';

        if (hasCountry || hasCategory) {
            endpoint = '/top-headlines';
        } else {
            endpoint = '/everything';
        }

        const uri = `${env.newsUrl}${endpoint}?${query.toString()}&apiKey=${env.newsApiKey}`;
        console.log(uri);

        const response = await getNews(uri);
        return response;
    },
    async getCategories(categories: string[]) {
        const result = [];
        for (let i = 0; i < categories.length; i++) {
            const uri = `${env.newsUrl}/top-headlines?country=us&category=${categories[i]}&apiKey=${env.newsApiKey}`;
            const response = await getNews(uri);
            result.push({
                category: categories[i],
                articles: response.articles
            });
        }
        return result;
    }
    
};

export default NewsService;
