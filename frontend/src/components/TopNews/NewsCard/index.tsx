import { Card } from "@/components/ui/card";
import { News } from "@/types/news";
import fallback from '../../../assets/fallbackNews.png'

const NewsCard = ({ news }: { news: News }) => {
    
    return (
        <Card className="w-full h-full bg-background rounded-[10px] shadow-lg overflow-hidden">
            {news.urlToImage ? 
                <div className="relative h-48">
                    <img
                        src={news.urlToImage}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                :
                <div className="relative h-48">
                    <img
                        src={fallback}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                </div>

            }
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-primary mb-2">{news.title}</h2>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <p className="text-sm font-bold text-primary">{news.source?.name ? news.source.name : news.name}</p>
                        <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                {/* {news.content && (
                    <p className="text-sm text-gray-700 mt-2">{news.content.slice(0, 300)}</p>
                )} */}
            </div>
        </Card>
    );
};

export default NewsCard;
