import { Card } from "@/components/ui/card";
import { News } from "@/types/news";

const NewsCard = ({ news }: { news: News }) => {
    console.log(news)
    return (
        <Card className="w-full h-[50vh] bg-background rounded-[10px] shadow-lg flex flex-col justify-between">
            {news.urlToImage ? (
                <div>
            
                    <div className="w-full h-48">
                        <img
                            src={news.urlToImage}
                            alt={news.title}
                            className="w-full h-full object-cover rounded-t-[10px]"
                        />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="mb-2">
                            <h2 className="text-sm md:text-md font-semibold text-primary">{news.title}</h2>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                            <p className="text-sm font-bold text-primary">{news.source.name}</p>
                            <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
                        </div>
                        
                    </div>
                </div>
            ) : (
                <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="mb-2">
                            <h2 className="text-sm md:text-md font-semibold text-primary">{news.title}</h2>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                            <p className="text-sm font-bold text-primary">{news.source.name}</p>
                            <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
                        </div>
                        {
                            news.content ? (
                                <p className="text-xs md:text-sm text-gray-500">{news.content}</p>
                            ) : <div>

                            </div>
                        }
                        
                    </div>
            )}

        </Card>
    );
};

export default NewsCard;
