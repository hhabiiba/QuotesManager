import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quotesData from '../../data/quotesList.json';

const Categories = () => {
  const { category } = useParams();// extractin' the category parameter from the URL (/:category)..
  const [quotes, setQuotes] = useState([]); // holds the filtered quotes based on the selected category..

  useEffect(() => {// effect hook to update the quotes when the category changes..
    const filteredQuotes = quotesData.quotes.filter(// filter the quotesData to get only the quotes wid the selected category..
      (quote) => quote.category === category // ensures tht only quotes wid a category matchin' the selected category..
    );
    setQuotes(filteredQuotes);// Set the filtered quotes to the state..
  }, [category]);// Re-run the effect when the category changes..

  const handleDeleteQuote = (quote) => {
    const updatedQuotes = quotes.filter(q => q !== quote);// filter out the quote to be deleted from the current list of quotes..
    setQuotes(updatedQuotes)
  }

  return (
    <div>
      <h3>List of Quotes - {category}~</h3>
      {/* Map over the filtered quotes nd display each quote */}
        {quotes.map((quote, index) => (
          <blockquote key={index}>
            <p><strong>Quote:    </strong><q>{quote.quote}</q></p>
            <p><strong>Author:   </strong>-  {quote.author}</p>
            <p><strong>Category: </strong>   {quote.category}</p>
            <button onClick={() => handleDeleteQuote(quote)}>&#10060;</button>
          </blockquote>
        ))}
    </div>
  );
};

export default Categories;

