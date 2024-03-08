import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';

const Categories = () => {
  const { category } = useParams();// extractin' the category parameter from the URL (/:category)..
  const [quotes, setQuotes] = useState([]); // holds the filtered quotes based on the selected category..
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
          style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'gray' }}
          onClick={() => handleRating(text, i)}
        >
          ★
        </span>
      );
    }
    return stars;  
  };
  return (
    <div>
      <h3>List of Quotes - {category}~</h3>
      {/* Map over the filtered quotes nd display each quote */}
        {quotes.map((text, index) => (
          <blockquote key={index}>
            <p><strong>Quote:    </strong><q>{text.quote}</q></p>
            <p><strong>Author:   </strong>-  {text.author}</p>
            <p><strong>Category: </strong>   {text.category}</p>
            <button onClick={() => handleDeleteQuote(text)}>&#10060;</button>
            <br />
            <div>
              <button onClick={() => handleVote(text, 'thumbsUp')}>👍 {votes[text.quote].thumbsUp}</button>
              <button onClick={() => handleVote(text, 'thumbsDown')}>👎 {votes[text.quote].thumbsDown}</button>
            </div> 
            <br />
            <div>
            {renderStars(text)}
            </div>
            <br />
          </blockquote>
        ))}
    </div>
  );
};

export default Categories;