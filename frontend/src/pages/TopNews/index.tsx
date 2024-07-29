import { News } from "@/types/news";
import NewsCard from "../../components/TopNews/NewsCard";
import { useEffect, useState } from "react";
import getNews from "@/apis/news/getNews";
import { Link, useLocation } from "react-router-dom";
import { categories, countries } from "./const";
import { toast } from "sonner"; 
import { useNews } from "@/context/newsContext";
import Pagination from "@/components/TopNews/Pagination";
import { Skeleton } from "@/components/ui/skeleton"


const TopNews = () => {
    const [news, setNews] = useState<News[]>([]);
    // const {news} = useNews();
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        getNews(country, category, page).then((response) => {
            setNews(response.articles);
            setTotalResults(response.totalResults);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            toast.error('Error fetching news');
        });
    }, [location, country, category, page]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(totalResults / 20); 

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form className="mb-4  flex flex-col md:flex-row items-center justify-end space-x-4">
                <div className="flex flex-col md:flex-row items-center">
                    {/* <label htmlFor="country" className="mr-2 text-sm">Country:</label> */}
                    <select
                        id="country"
                        value={country}
                        onChange={handleCountryChange}
                        className="border bg-background rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">Select a country</option>
                        {countries.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    {/* <label htmlFor="category" className="mr-2 text-sm">Category:</label> */}
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="border bg-background rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">Select a category</option>
                        {categories.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
            </form>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className="h-60 w-full" />
                    ))}
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {news.map((newsItem, index) => (
                            <div className="max-h-full" key={index}>
                                <Link
                                    to={`/news/details`}
                                    state={{ newsItem }}
                                >
                                    <NewsCard news={newsItem} />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )} 
        </div>
    );
}

export default TopNews;
