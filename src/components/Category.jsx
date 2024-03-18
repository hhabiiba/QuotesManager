import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';
import { setQuotes } from '../actions/categoryAction';
import '../CSS/category.css'

const Categories = ({quotes, setQuotes}) => {
  const { category } = useParams();// extractin' the category parameter from the URL (/:category)..
  const [votes, setVotes] = useState({}); //store the votin' counts..
  const [ratings, setRatings] = useState({});//ratings for each quote..
  
  useEffect(() => {// effect hook to update the quotes when the category changes..
    const filteredQuotes = quotesData.quotes.filter(// filter the quotesData to get only the quotes wid the selected category..
      (quote) => quote.category === category // ensures tht only quotes wid a category matchin' the selected category..
    );
    setQuotes(filteredQuotes);// Set the filtered quotes to the state..
    initializeVotesAndRatings(filteredQuotes); // Initialize votes and ratings for the filtered quotes
  }, [category]);// Re-run the effect when the category changes..

  const initializeVotesAndRatings = (quotes) => {  // Func. to initialize votes nd ratings for quotes..
    const initialVotes = {};
    const initialRatings = {};
    quotes.forEach((q) => {
      initialVotes[q.quote] = { thumbsUp: 0, thumbsDown: 0 };// Initialize vote counts for each quote..
      initialRatings[q.quote] = 0;// Initialize ratings for each quote..
    });
    // Set initial votes nd ratings to the state..
    setVotes(initialVotes);
    setRatings(initialRatings);
  };

  const handleDeleteQuote = (quote) => {
    const updatedQuotes = quotes.filter(q => q !== quote);// filter out the quote to be deleted from the current list of quotes..
    setQuotes(updatedQuotes)
  }
  
  const handleVote = (text, type) => {
    const updatedVotes = { ...votes }; 
    updatedVotes[text.quote][type]++;  //Increment the vote count for the selected quote nd type..
    setVotes(updatedVotes);
  };

  const handleRating = (text, rating) => {
    const updatedRatings = { ...ratings };
    updatedRatings[text.quote] = rating; //Update the ratin' for the selected quote..
    setRatings(updatedRatings);
  };

  const renderStars = (text) => { //Func. to render star icons for ratin' a quote..
    const rating = ratings[text.quote];
    const stars = [];
    //Loop to create star icons..
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ cursor: 'pointer', 
          fontSize: '20px', 
          padding: '3px', 
          position: 'relative',
          bottom: '44px',
          left: '200px',
          color: i <= rating ? 'gold' : 'gray' }}
          onClick={() => handleRating(text, i)}
        >
          ★
        </span>
      );
    }
    return stars ;  
  };

  const handleLoad = () => {
    fetch('../../data/localStorage.json')
      .then(res => res.json())
      .then(data => {
        setQuotes(data.quotes);
        initializeVotesAndRatings(data.quotes);
      })
      .catch(err => console.error('Error loading quotes:', err));
  };

  return (
    <div className='categories-container'>
      <h3 className='category-heading'>List of Quotes - {category}~</h3>
      <button className='load' onClick={handleLoad}>Load</button>
      {/* Map over the filtered quotes nd display each quote */}
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