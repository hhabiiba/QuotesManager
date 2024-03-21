import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';
import '../CSS/home.css';

const Home = () => {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);// to hold quote of the day..

  useEffect(() => { // useEffect hook to run once on component mount..
    console.log(quotesData);
    if (quotesData && quotesData.length > 0) {
     const randomCategoryIndex = Math.floor(Math.random() * quotesData.length); // Select random cat. from quotesData..
     const randomCategory = quotesData[randomCategoryIndex];
     if (randomCategory.quotes && randomCategory.quotes.length > 0) { // Check if selected cat. has quotes..
       const randomQuoteIndex = Math.floor(Math.random() * randomCategory.quotes.length); // Select random quote from the selected cat.
       const randomQuote = randomCategory.quotes[randomQuoteIndex];
       setQuoteOfTheDay(randomQuote);
    }
  }
  }, []);

  const shareOnTwitter = () => {
    if (quoteOfTheDay) {
    const text = `${quoteOfTheDay.quote} - ${quoteOfTheDay.author}`;// text for tweet, combinin' the quote nd author..
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;// URL for the tweet, encodin' the text parameter..
    window.open(url, '_blank'); // Open a new window wid the Twitter intent URL..
    }
  };

  return (
    <div className='home'>
      <div className='quote'>
      <h3>Quote of the Day</h3>
      {quoteOfTheDay && ( // check if quoteOfTheDay is nt null..
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
        <li>
          <Link to="/category/Inspirational Quotes">Inspirational</Link>
        </li>
        <li>
          <Link to="/category/Motivational Quotes">Motivational</Link>
        </li>
        <li>
          <Link to="/category/Coders Quotes">Coders</Link>
        </li>
        <li>
          <Link to="/category/Love Quotes">Love</Link>
        </li>
        <li>
          <Link to="/category/Friendship Quotes">Friendship</Link>
        </li>
        <li>
          <Link to="/category/Funny Quotes">Funny</Link>
        </li>
        <li>
          <Link to="/category/Islamic Quotes">Islamic</Link>
        </li>
        <li>
          <Link to="/category/Urdu-Hindi Quotes">Urdu/Hindi</Link>
        </li>
        <li>
          <Link to="/category/Other Quotes">Other</Link>
        </li>
      </ul>
     </div>
    </div>
  );
}

export default Home;
