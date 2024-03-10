import React, { useState } from 'react';

const AddForm = ({ onAdd }) => {  
  const [formData, setFormData] = useState({ //Input fields..
    quote: '',  
    author: '',   
    category: ''   
  });   
  const [newQuote, setNewQuote] = useState(null); //  State to hold newly added quote fields..

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuote = { ...formData };// a new quote obj usin' the input values..
    console.log('Added content:', newQuote);
    onAdd(newQuote); // ()onAdd func. passed from the parent comp. nd pass the new quote..
    setNewQuote(newQuote);
    //clear the fields after sub..
    setFormData({
      quote: '',
      author: '',
      category: ''
    });
  };
  
  const handleSaveToJSON = () => { //handle to save quotes to JSON file..
    const existingQuotes = JSON.parse(localStorage.getItem('quotes')) || []; //Retrieve existin' quotes from localStorage || initialize as an empty arr..
    console.log('Existing quotes from localStorage:', existingQuotes); 

    const newQuote = { ...formData };                       //To create a newQuote obj. entered by the user..
    console.log('Newly added quote:', newQuote); 
  
    const allQuotes = [...existingQuotes, newQuote];                   //Merge existin' quotes wid the newly added quote..
    console.log('All quotes to be saved:', allQuotes); 
  
    localStorage.setItem('quotes', JSON.stringify(allQuotes));      //Save all quotes bk to localStorage..
    const jsonData = { quotes: allQuotes };                        //Prepare/Save JSON data wid quotes arr..
    const jsonDataString = JSON.stringify(jsonData);       
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');                     //Link element to trigger the download..
    a.href = url;
    a.download = 'localStorage.json';
    //Append  link to the DOM, trigger the download, nd clean up..
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>Add Quote</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quote:</label>
          <input
            type="text"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add</button>
        <button type="button" onClick={handleSaveToJSON}>Save</button>
      </form>

      {/* to display the newly added quote */}
      {newQuote && (
        <div>
          <blockquote>
            <p><strong>Quote: </strong><q>{newQuote.quote}</q></p>
            <p><strong>Author: </strong>{newQuote.author}</p>
            <p><strong>Category: </strong>{newQuote.category}</p>
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default AddForm;