import env from "../../../config/env";

export const getNews = async (uri: string) => {
    console.log(env.newsUrl + uri + `&apiKey=${env.newsApiKey}`)
    const response = await fetch(env.newsUrl + uri + `&apiKey=${env.newsApiKey}`);
    const news = await response.json();
    return news;
}