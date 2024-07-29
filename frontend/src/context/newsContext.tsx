import getNews from "@/apis/news/getNews";
import { News } from "@/types/news";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface NewsContextType {
    news: News[];
    setNewss: (news: News[]) => void;
}

const NewsContext = createContext<NewsContextType>({
    news: [],
    setNewss: () => {}
});

const NewsProvider = ({ children }: { children: ReactNode }) => {
    const [news, setNewss] = useState<News[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const n = await getNews("us", "general",1);
                if (!n) {
                    throw new Error('Error fetching news');
                } else {
                    setNewss(n.articles);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ news, setNewss }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => useContext(NewsContext);

export default NewsProvider;
