import { connect } from 'react-redux';
import { addQuote,  addFormData, setNewQuote } from '../actions/addAction';
import '../CSS/addquote.css';

const AddForm = ({ formData, onAddFormData, onAddQuote,  onSetNewQuote, newQuote }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuoteData = { ...formData };
    onAddQuote(newQuoteData);
    onAddFormData({ quote: '', author: '', category: '' });
    onSetNewQuote(newQuoteData); 
    console.log(newQuoteData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddFormData({ [name]: value }); 
  };  

  const handleSaveToJSON = () => {
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
    <div className="add-form-container">
      <h3>Add Quote</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quote:</label>
          <input
            type="text"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className='add'>Add</button>
          <button type="button" onClick={handleSaveToJSON} className='save'>Save</button>
        </div>
      </form>

      {/* to display the newly added quote */}
      {newQuote && (
        <div className="new-quote-container">
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

const mapStateToProps = (state) => ({
  //newQuote, formData from Redux store..
  formData: state.add.formData,
  newQuote: state.add.newQuote, 
});

const mapDispatchToProps = (dispatch) => ({
  onAddQuote: (quotes) => dispatch(addQuote(quotes)), 
  onAddFormData: (formData) => dispatch(addFormData(formData)), 
  onSetNewQuote: (newQuote) => dispatch(setNewQuote(newQuote)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)