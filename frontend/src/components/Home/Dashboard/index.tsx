import getNews from "@/apis/news/getNews";
import { useEffect, useState } from "react";
import NewsCard from "../NewsCard";

const Dashboard = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNews('/top-headlines?country=us').then((response) => {
            setNews(response.data.articles);
            setLoading(false);
        });
    }, []);

    return (
        <div className="">
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
                    {news.map((news, index) => (
                        <NewsCard key={index} news={news} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
