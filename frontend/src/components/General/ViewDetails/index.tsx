import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { News } from '@/types/news';
import { useNews } from '@/context/newsContext';
import { loremIpsum } from './const';

import fallback from '../../../assets/fallbackNews.png';

const getRandomIndices = (max: number, count: number) => {
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
};

const ViewDetails: React.FC = () => {
  const location = useLocation();
  const { news } = useNews();
  const { newsItem } = location.state as { newsItem: News };

  const randomNews = useMemo(() => {
    if (news.length <= 8) return news;
    const indices = getRandomIndices(news.length, 8);
    return indices.map(index => news[index]);
  }, [news]);

  if (!newsItem) {
    return (
      <div className=" mx-auto p-4">
        <p>News item not found.</p>
        <Link to="/" className="text-blue-500">Go back to homepage</Link>
      </div>
    );
  }

  return (
    <div className=" mx-8 p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <img src={newsItem.urlToImage || fallback} alt={newsItem.title} className="w-full h-auto mb-4 rounded-lg shadow-md" />
          <h1 className="text-3xl font-bold mb-2">{newsItem.title}</h1>
          <div className="text-gray-600 mb-4 text-end">
            <span>By {newsItem.author.slice(0, 10)}</span>
            <span className="mx-2">|</span>
            <span>{new Date(newsItem.publishedAt).toLocaleString()}</span>
          </div>
          <p className="text-foreground/70 mb-4">{newsItem.description}</p>
          <p className="text-foreground/70 mb-4">{newsItem.content}</p>
          <p className="text-foreground/70">{loremIpsum}</p>
        </div>
        <div className="md:w-1/3 md:pl-4">
          <div className='flex items-center justify-between'>
            <h2 className="text-xl font-bold my-8 md:mb-4">Related News</h2>
            <Link to="/" className="text-blue-500 md:mb-4 inline-block">View All</Link>
          </div>
          <div>
            {randomNews.map((relatedItem, index) => (
              <div className="flex mb-4" key={index}>
                <img src={relatedItem.urlToImage || fallback} alt={relatedItem.title} className="w-1/3 h-auto mr-4 rounded-lg shadow-md" style={{ objectFit: 'cover' }} />
                <Link to={`/news/details`} state={{ newsItem: relatedItem }} className="w-2/3">
                  <div>
                    <span className="text-xs text-red-500">{relatedItem.source.name}</span>
                    <p className="text-foreground/70 font-semibold">{relatedItem.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
