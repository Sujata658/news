import { useState } from "react";
import fallback from '../../../assets/fallbackNews.png';
import { CategoryRes } from "@/types/category";
import { Button } from "@/components/ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CategoryCarouselProps {
  cat: CategoryRes | undefined;
}

const CategoryCarousel = ({ cat }: CategoryCarouselProps) => {
  const news = cat?.articles || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="h-full flex flex-col justify-between rounded-[10px] relative overflow-hidden group">
      <div
        className="h-full w-full absolute top-0 left-0"
        style={{
          background: `url(${news[currentIndex]?.urlToImage || fallback}) no-repeat center center/cover`,
        }}
      ></div>
      <div className="absolute bottom-0 w-full min-h-[30%] bg-gray-900 bg-opacity-70 p-4 rounded-b-lg dark:bg-gray-800 dark:bg-opacity-80 transition-transform duration-500 ease-in-out transform translate-y-0">
        <Link to={`/news/details`} state={{ newsItem: news[currentIndex] }} className="text-xs text-red-500">
          <h1 className="text-sm md:text-lg text-white font-bold">
            {news[currentIndex]?.title}
          </h1>
        </Link>
      </div>
      <Button
        onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : news.length - 1))}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white py-2 px-4 rounded-full bg-gray-800 bg-opacity-70 hover:bg-gray-700 hover:bg-opacity-90 dark:bg-gray-600 dark:hover:bg-gray-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FaAngleLeft />
      </Button>
      <Button
        onClick={() => setCurrentIndex((prev) => (prev < news.length - 1 ? prev + 1 : 0))}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white py-2 px-4 rounded-full bg-gray-800 bg-opacity-70 hover:bg-gray-700 hover:bg-opacity-90 dark:bg-gray-600 dark:hover:bg-gray-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FaAngleRight />
      </Button>
    </div>
  );
};

export default CategoryCarousel;
