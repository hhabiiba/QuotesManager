import React, { useState } from 'react';

const AddForm = ({ onAdd }) => { 
  const [addQuote, setAddQuote] = useState('');   //  Quote text input..
  const [author, setAuthor] = useState('');       //  Author input..
  const [category, setCategory] = useState('');   //  Category input..
  const [newQuote, setNewQuote] = useState(null); //  State to hold newly added quote fields..

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuote = { addQuote, author, category };// a new quote obj usin' the input values..
    console.log('Added content:', newQuote);
    onAdd(newQuote); // ()onAdd func. passed from the parent comp. nd pass the new quote..
    setNewQuote(newQuote); 
    //clear the fields after sub..
    setAddQuote('');
    setAuthor('');
    setCategory('');
  };

  return (
    <div>
      <h3>Add Quote</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quote:</label>
          <input
            type="text"
            value={addQuote}
            onChange={(e) => setAddQuote(e.target.value)}
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
        <button type="submit">Add</button>
      </form>

      {/* to display the newly added quote */}
      {newQuote && (
        <div>
          <blockquote>
            <p><strong>Quote: </strong><q>{newQuote.addQuote}</q></p>
            <p><strong>Author: </strong>{newQuote.author}</p>
            <p><strong>Category: </strong>{newQuote.category}</p>
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default AddForm;
