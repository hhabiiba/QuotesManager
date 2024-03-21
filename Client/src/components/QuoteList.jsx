import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addQuoteList, deleteQuoteList, updateQuoteList } from '../actions/quoteListAction';
import '../CSS/quotelist.css'; 

const List = ({ quoteLists, addQuoteList, deleteQuoteList, updateQuoteList }) => {
  const [newListName, setNewListName] = useState('');
  const [newQuote, setNewQuote] = useState({
    quote: '',
    author: '',
    category: ''
  });

  useEffect(() => {
    console.log('Quote Lists:', quoteLists);
  }, [quoteLists]);

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      const newList = {
        id: uuidv4(),
        name: newListName,
        quotes: [],
      };
      addQuoteList(newList);
      setNewListName('');
      setNewQuote({ 
        quote: '',
        author: '',
        category: ''
      });
      console.log('New list added:', newList);
    }
  };

  const handleDeleteList = (listId) => {
    if (window.confirm('Are u sure u want to delete this list?')) {
      deleteQuoteList(listId);
      console.log('List deleted:', listId);
    }
  };

  const handleAddQuote = (listId) => {
    const updatedQuoteLists = quoteLists.map(list => {
      if (list.id === listId) {
        const updatedList = {
          ...list,
          quotes: [...list.quotes, newQuote]
        };
        console.log('Quote added to list:', newQuote);
        updateQuoteList(updatedList); 
        return updatedList;
      }
      return list;
    });
  };

  return (
    <div className="quote-list-container">
      <h2 className="list-heading">Quote Lists</h2>
      <div className="list-items">
        {quoteLists.map((list) => (
          <div key={list.id} className="list-item">
            <div className="list-header">
              <span className="list-name">{list.name}</span>
              <button className="delete-button" onClick={() => handleDeleteList(list.id)}>Delete</button>
            </div>
            <div className="quote-inputs">
              <input
                type="text"
                placeholder="Enter quote"
                value={newQuote.quote}
                onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter author"
                value={newQuote.author}
                onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter category"
                value={newQuote.category}
                onChange={(e) => setNewQuote({ ...newQuote, category: e.target.value })}
              />
              <button className="add-quote-button" onClick={() => handleAddQuote(list.id)}>Add</button>
            </div>
            <ul className="quote-list">
              {list.quotes.map((text, index) => (
                <li key={index} className="quote-list-item">
                  <strong>Quote:</strong> <q>{text.quote}</q><br />
                  <strong>Author:</strong> -{text.author}<br />
                  <strong>Category:</strong> {text.category}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="add-list-section">
        <input
          type="text"
          placeholder="Enter list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="list-name-input"
        />
        <button className="add-list-button" onClick={handleAddList}>Create List</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quoteLists: state.quoteLists.quoteLists,
});

const mapDispatchToProps = {
  addQuoteList,
  deleteQuoteList,
  updateQuoteList,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);