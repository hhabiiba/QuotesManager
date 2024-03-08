import React, { useState, useEffect } from 'react';
import quotesData from '../../data/quotesList.json';

const EditForm = ({ onUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState('');  //keeps track of the category selected by the user..
  const [quotesForSelectedCategory, setQuotesForSelectedCategory] = useState([]);  //stores an arr. of quotes tht belong to the currently selected category..
  const [selectedQuote, setSelectedQuote] = useState(null);   //stores the quote currently being edited..
  const [quoteText, setQuoteText] = useState('');            //stores the text of the q..
  const [author, setAuthor] = useState('');                 //stores the author of the q..
  const [category, setCategory] = useState('');            //stores the category of the q..
  const [isEditing, setIsEditing] = useState(false);      //tracks whether a quote is being edited..

  useEffect(() => {
    setQuoteText('');
    setAuthor('');
    setCategory('');
    setIsEditing(false);
  }, [selectedCategory]);

  const handleCategoryDisplay= (e) => {       //handles the change in the selected category from the dropdown..
    const category = e.target.value;
    setSelectedCategory(category);
    setQuotesForSelectedCategory(quotesData.quotes.filter(q => q.category === category));
  };

  const handleQuoteSelect = (text) => {   //handles selectin' a quote for editin'..
    setSelectedQuote(text);
    setQuoteText(text.quote);
    setAuthor(text.author);
    setCategory(text.category);
    setIsEditing(true);
  };

  const handleUpdate = () => {      //handles updating a quote with the new values.
    const updatedQuote = { ...selectedQuote, quote: quoteText, author, category };
    onUpdate(selectedQuote, updatedQuote); //update the q..
    setSelectedQuote(updatedQuote); //updates selectedQuote in state..
    setIsEditing(false);
  };

  return (
    <div>
      <h3>Edit Quote</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryDisplay}>

            <option value=" ">Select Category</option>
            {quotesData.quotes.reduce((uniqueCategories, quote) => {
              return uniqueCategories.includes(quote.category)
                ? uniqueCategories
                : [...uniqueCategories, quote.category];
            }, []).map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}

          </select>
        </div>

        {selectedCategory && (
          <div>
            <h4>Quotes for {selectedCategory}</h4>
            <ul>
              {quotesForSelectedCategory.map((text, index) => (
                <li key={index}>
                  <strong>Quote:</strong> {text.quote}<br />
                  <strong>Author:</strong> {text.author}<br />
                  <strong>Category:</strong> {text.category}
                  {!isEditing && (
                    <button onClick={() => handleQuoteSelect(text)}>Edit</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedQuote && isEditing && ( //isEditing is true, it means user is currently editin' a q..
          <>
            <div>
              <label>Quote Text:</label>
              <input
                type="text"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <button onClick={handleUpdate}>Update</button>
          </>
        )}
      </form>
      
      {/* display the updated q.. */}
      {selectedQuote && !isEditing && (  // isEditing is false, it means user is nt currently editin' a q..
        <div>
          <h4>Updated Quote</h4>
          <blockquote><strong>Quote:</strong> {selectedQuote.quote}</blockquote>
          <p><strong>Author: - </strong>      {selectedQuote.author}</p>
          <p><strong>Category: </strong>      {selectedQuote.category}</p>
        </div>
      )}
    </div>
  );
};

export default EditForm;
