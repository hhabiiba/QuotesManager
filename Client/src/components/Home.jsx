import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';
import '../CSS/home.css';

const Home = () => {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);// to hold quote of the day..

  useEffect(() => { // useEffect hook to run once on component mount..
    const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);// generate a random index to select a random quote..
    const randomQuote = quotesData.quotes[randomIndex]; // get a random quote from quotesData usin' the random index
    setQuoteOfTheDay(randomQuote); // Set the random quote as quote of the day..
  }, []);

  const shareOnTwitter = () => {
    const text = `${quoteOfTheDay.quote} - ${quoteOfTheDay.author}`;// text for tweet, combinin' the quote nd author..
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;// URL for the tweet, encodin' the text parameter..
    window.open(url, '_blank'); // Open a new window wid the Twitter intent URL..
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
          <Link to="/category/Inspirational">Inspirational</Link>
        </li>
        <li>
          <Link to="/category/Motivational">Motivational</Link>
        </li>
        <li>
          <Link to="/category/Coders">Coders</Link>
        </li>
        <li>
          <Link to="/category/Love">Love</Link>
        </li>
        <li>
          <Link to="/category/Friendship">Friendship</Link>
        </li>
        <li>
          <Link to="/category/Funny">Funny</Link>
        </li>
        <li>
          <Link to="/category/Islamic">Islamic</Link>
        </li>
        <li>
          <Link to="/category/Urdu-Hindi">Urdu/Hindi</Link>
        </li>
        <li>
          <Link to="/category/Other">Other</Link>
        </li>
      </ul>
     </div>
    </div>
  );
}

export default Home;
