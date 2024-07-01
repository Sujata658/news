import { News } from "@/types/news";
import NewsCard from "../../components/TopNews/NewsCard";
import { useEffect, useState } from "react";
import getNews from "@/apis/news/getNews";
import makeNewsQuery from "@/utils/makeNewsQuery";


const TopNews = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNews(makeNewsQuery('top-headlines')).then((response) => {
            setNews(response.data.articles);
            setLoading(false);
        });
    }, []);



    return (
        <>
            {
                loading ? <div className="loader"></div> : <div>
                    {news.map((newsItem, index) => (
                        <NewsCard key={index} news={newsItem} />
                    ))}
                </div>
            }
        </>

    )
}

export default TopNews