import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setQuotesListData } from '../reducers/quotesReducer';
import '../CSS/category.css';
import axios from 'axios';

const Category = () => {
  const { categoryName } = useParams();
  const [categoryQuotes, setCategoryQuotes] = useState([]);
  const [votes, setVotes] = useState({});
  const [ratings, setRatings] = useState({});
  const [updateFormData, setUpdateFormData] = useState({
    quote: '',
    author: '',
    category: ''
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [modifyId, setModifyId] = useState('');
  const dispatch = useDispatch();
  const quotesListData = useSelector(state => state.quote.quoteListData);

  useEffect(() => {
    if (quotesListData && quotesListData.length > 0) {
      const categoryQuotes = quotesListData.find(category => category.name === categoryName)?.quotes || [];
      setCategoryQuotes(categoryQuotes);
      initializeVotesAndRatings(categoryQuotes);
    }
  }, [categoryName, quotesListData]);

  const initializeVotesAndRatings = (quotes) => {
    const initialVotes = {};
    const initialRatings = {};
    quotes.forEach((quote) => {
      initialVotes[quote.quote] = { thumbsUp: 0, thumbsDown: 0 };
      initialRatings[quote.quote] = 0;
    });
    setVotes(initialVotes);
    setRatings(initialRatings);
  };

  const handleVote = (quote, type) => {
    const updatedVotes = { ...votes };
    updatedVotes[quote][type]++;
    setVotes(updatedVotes);
  };

  const handleRating = (quote, rating) => {
    const updatedRatings = { ...ratings };
    updatedRatings[quote] = rating;
    setRatings(updatedRatings);
  };

  const handleDeleteQuote = async (quote) => {
    try {
      const updatedQuotesListData = quotesListData.map(category => {
        if (category.name === categoryName) {
          return {
            ...category,
            quotes: category.quotes.filter(q => q.id !== quote.id)
          };
        }
        return category;
      });
      await axios.delete(`http://localhost:4000/api/quotes/${quote.id}`);
      updateQuotesListData(updatedQuotesListData);
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const updateQuotesListData = (updatedQuotesListData) => {
    dispatch(setQuotesListData(updatedQuotesListData));
    localStorage.setItem('quotesListData', JSON.stringify(updatedQuotesListData));
  };

  const handleUpdateQuote = (quote) => {
    setModifyId(quote.id);
    setUpdateFormData({
      quote: quote.quote,
      author: quote.author,
      category: quote.category
    });
    setShowUpdateForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/quotes/${modifyId}`, updateFormData);
      updateQuotesListData(quotesListData.map(category => {
        if (category.name === categoryName) {
          return {
            ...category,
            quotes: category.quotes.map(q => {
              if (q.id === modifyId) {
                return { ...q, ...updateFormData };
              }
              return q;
            })
          };
        }
        return category;
      }));
      setUpdateFormData({
        quote: '',
        author: '',
        category: ''
      });
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const renderStars = (quote) => {
    const rating = ratings[quote];
    const stars = [];
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
          onClick={() => handleRating(quote, i)}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className='categories-container'>
      <h3 className='category-heading'>Quotes in Category - {categoryName}</h3>
      {categoryQuotes.map((quote, index) => (
        <blockquote key={index} className='category-quote'>
          <p className='quote-content'><strong>Quote:    </strong><q>{quote.quote}</q></p>
          <p className='quote-content'><strong>Author:   </strong>-  {quote.author}</p>
          <button className='delete' onClick={() => handleDeleteQuote(quote, index)}>&#10060;</button>
          <button className='update' onClick={() => handleUpdateQuote(quote, index)}>&#9998;</button>
          <div className='vote-actions'>
            <button onClick={() => handleVote(quote.quote, 'thumbsUp')}>👍 {votes[quote.quote]?.thumbsUp}</button>
            <button onClick={() => handleVote(quote.quote, 'thumbsDown')}>👎 {votes[quote.quote]?.thumbsDown}</button>
          </div>
          <br />
          <div className='stars'>
            {renderStars(quote.quote)}
          </div>
          <br />
        </blockquote>
      ))}
      {showUpdateForm && (
        <div>
          <input type="text" name="quote" value={updateFormData.quote} onChange={handleFormChange} />
          <input type="text" name="author" value={updateFormData.author} onChange={handleFormChange} />
          <input type="text" name="category" value={updateFormData.category} onChange={handleFormChange} />
          <button onClick={handleFormSubmit}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default Category;