import CustomError from "../../../utils/Error";
// import { Newsss } from "./const";

export const getNews = async (uri: string) => {
    try {
        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error(`Error fetching news: ${response.statusText}`);
            // return Newsss;
        }
        const news = await response.json();
        return news;
    } catch (error) {
        throw new CustomError(
            "Error fetching news",
            500
        );
    }
};
