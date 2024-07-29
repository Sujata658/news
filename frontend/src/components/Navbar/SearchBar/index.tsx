import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import searchNews from '@/apis/news/search';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { News } from '@/types/news';
import fallback from '../../../assets/fallbackNews.png';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length >= 3) {
        try {
          const data = await searchNews(query);
          if (!data) {
            throw new Error('Error fetching news');
          } else {
            setSuggestions(data.slice(0, 8));
          }
        } catch (error) {
          console.error('Error fetching news:', error);
          toast.error('Error fetching news');
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(fetchData, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleSuggestionClick = (suggestion: News) => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative flex-1 mx-4">
      <div className="absolute inset-y-0 left-0 pl-2 z-10 md:pl-4 flex items-center">
        <IoSearch className="text-gray-500 cursor-pointer" />
      </div>
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-background border text-sm sm:text-sm md:text-md rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:border-none focus-visible:none :border-white focus-visible::shadow-md block"
      />
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 border rounded-md shadow-lg z-20 w-full">
          {suggestions.map((suggestion, index) => (
            <div className='flex bg-background p-2' key={index}>
              {
                suggestion.urlToImage ? <img src={suggestion.urlToImage} alt={suggestion.title} className="w-10 h-10" /> : <img src={fallback} alt={suggestion.title} className="w-10 h-10" />
              }
              <Link to={`/news/details`} state={{ newsItem: suggestion }} onClick={() => handleSuggestionClick(suggestion)}>
                <li className="px-4 py-2 w-full cursor-pointer hover:bg-muted">
                  {suggestion.title}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
