import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';
import { setQuotes } from '../actions/categoryAction';
import '../CSS/category.css';

const Categories = ({ quotes, setQuotes }) => {
  const { name } = useParams(); // extracting the name parameter from the URL (/:name)
  const [votes, setVotes] = useState({}); // store the voting counts
  const [ratings, setRatings] = useState({}); // ratings for each quote

  useEffect(() => {
    console.log("Category:", name);
    const categoryData = quotesData.find((cat) => cat.name === name);
    console.log("categoryData:", categoryData);
    if (categoryData) {
      initializeVotesAndRatings(categoryData.quotes);
    } else {
      console.error(`No quotes found for category: ${name}`);
    }
  }, [name]);

  const initializeVotesAndRatings = (quotes) => {
    const initialVotes = {};
    const initialRatings = {};
    quotes.forEach((q) => {
      initialVotes[q.quote] = { thumbsUp: 0, thumbsDown: 0 }; // Initialize vote counts for each quote
      initialRatings[q.quote] = 0; // Initialize ratings for each quote
    });
    // Set initial votes and ratings to the state
    setVotes(initialVotes);
    setRatings(initialRatings);
    setQuotes(quotes);
  };

  //Delete entire lists..
  const handleDeleteCategory = () => {
    if (name === name) {
      setQuotes([]);
    } 
  };
  
  //Delete selected quote..
  const handleDeleteQuote = (quote) => {
    const updatedQuotes = quotes.filter(q => q !== quote);// filter out the quote to be deleted from the current list of quotes..
    setQuotes(updatedQuotes)
  }
  
  const handleVote = (text, type) => {
    const updatedVotes = { ...votes };
    updatedVotes[text.quote][type]++; // Increment the vote count for the selected quote and type
    setVotes(updatedVotes);
  };

  const handleRating = (text, rating) => {
    const updatedRatings = { ...ratings };
    updatedRatings[text.quote] = rating; // Update the rating for the selected quote
    setRatings(updatedRatings);
  };

  const renderStars = (text) => {
    const rating = ratings[text.quote];
    const stars = [];
    // Loop to create star icons
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: 'pointer',
            fontSize: '20px',
            padding: '3px',
            position: 'relative',
            bottom: '44px',
            left: '200px',
            color: i <= rating ? 'gold' : 'gray',
          }}
          onClick={() => handleRating(text, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleLoad = () => {
    const storedData = localStorage.getItem('quotes');
    console.log('Stored data:', storedData);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const quotes = data.flatMap(category => category.quotes);
        setQuotes(quotes);
        initializeVotesAndRatings(quotes);
      } catch (error) {
        console.error('Err parsin JSON data:', error);
      }
    } else {
      console.error('No data found in localStorage.');
    }
  };

  return (
    <div className='categories-container'>
      <Link to="/" className="back-cat"></Link>
      <h3 className='category-heading'>List of Quotes - {name}~</h3>
      <button className='load' onClick={handleLoad}>Load</button>
      <button className="delete-category" onClick={handleDeleteCategory}>Delete Category</button>
      {/* Map over the filtered quotes and display each quote */}
      {quotes.map((text, index) => (
        <blockquote key={index} className='category-quote'>
          <p className='quote-content'><strong>Quote:    </strong><q>{text.quote}</q></p>
          <p className='quote-content'><strong>Author:   </strong>-  {text.author}</p>
          <p className='quote-content'><strong>Category: </strong>   {text.category}</p>
          <button className='delete' onClick={() => handleDeleteQuote(text)}>&#10060;</button>
          <div className='vote-actions'>
            <button onClick={() => handleVote(text, 'thumbsUp')}>👍 {votes[text.quote]?.thumbsUp}</button>
            <button onClick={() => handleVote(text, 'thumbsDown')}>👎 {votes[text.quote]?.thumbsDown}</button>
          </div>
          <br />
          <div className='stars'>
            {renderStars(text)}
          </div>
          <br />
        </blockquote>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  quotes: state.category.quotes
});

const mapDispatchToProps = {
  setQuotes
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
