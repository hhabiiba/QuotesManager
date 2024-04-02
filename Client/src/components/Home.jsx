import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/home.css';

const Home = () => {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const quotesData = useSelector(state => state.quote.quoteListData);

  useEffect(() => {
    if (quotesData && quotesData.length > 0) {
      const randomCategoryIndex = Math.floor(Math.random() * quotesData.length);
      const randomCategory = quotesData[randomCategoryIndex];
      if (randomCategory.quotes && randomCategory.quotes.length > 0) {
        const randomQuoteIndex = Math.floor(Math.random() * randomCategory.quotes.length);
        const randomQuote = randomCategory.quotes[randomQuoteIndex];
        setQuoteOfTheDay(randomQuote);
      }
    }
  }, [quotesData]);

  const shareOnTwitter = () => {
    if (quoteOfTheDay) {
      const text = `${quoteOfTheDay.quote} - ${quoteOfTheDay.author}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className='home'>
      <div className='quote'>
        <h3>Quote of the Day</h3>
        {quoteOfTheDay && (
          <div>
            <q>{quoteOfTheDay.quote}</q>
            <p>- {quoteOfTheDay.author}</p>
            <button onClick={shareOnTwitter}>Share on Twitter</button>
          </div>
        )}
      </div>
      <div className="category">
        <h3>Categories:</h3>
        <ul>
          {quotesData && quotesData.length > 0 && quotesData.map((category, index) => (
            <li key={index}>
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;