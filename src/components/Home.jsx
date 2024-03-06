import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const quoteOfTheDay = { 
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  };

  return (
    <div>
      <h3>Quote of the Day</h3>
      <div>
        <blockquote>{quoteOfTheDay.quote}</blockquote>
        <p>- {quoteOfTheDay.author}</p>
      </div>
      <h3>Categories</h3>
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
  );
}

export default Home;
