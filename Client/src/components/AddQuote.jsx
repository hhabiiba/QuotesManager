import { connect } from 'react-redux';
import { addQuote,  addFormData, setNewQuote } from '../actions/addAction';
import '../CSS/addquote.css';

const AddForm = ({ formData, onAddFormData, onAddQuote,  onSetNewQuote, newQuote }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuoteData = { ...formData };
    onAddQuote(newQuoteData);
    onAddFormData({ listName: '' , quote: '', author: '', category: ''}); 
    onSetNewQuote(newQuoteData); 
    console.log(newQuoteData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddFormData({ [name]: value }); 
  };  

  const handleSaveToJSON = () => {
     // Check if the name of the list is provided
     if (!formData.category) {
      alert("Please enter the name of the list.");
      return;
    }

    const existingCategories = JSON.parse(localStorage.getItem('quotes')) || []; // Retrieve existing categories from localStorage or initialize as an empty array
    console.log('Existing categories from localStorage:', existingCategories); 
    const updatedCategories = existingCategories.map(category => {
      if (category.name === formData.category) {
        console.log('Updating existing category:', category);
        return {
          ...category,
          quotes: [...category.quotes, formData]
        };
      }
      return category;
    });

    const isNewCategory = !updatedCategories.some(category => category.name === formData.category);

    if (isNewCategory) {
      console.log('Adding new category:', formData.category);
      updatedCategories.push({
        name: formData.category,
        quotes: [formData]
      });
    }
    localStorage.setItem('quotes', JSON.stringify(updatedCategories));      //Save all quotes bk to localStorage..
    console.log('Updated categories in localStorage:', updatedCategories);
    // const jsonDataString = JSON.stringify(updatedCategories);
    // const blob = new Blob([jsonDataString], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');                     //Link element to trigger the download..
    // a.href = url;
    // a.download = 'localStorage.json';
    // //Append  link to the DOM, trigger the download, nd clean up..
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
  };

  return (
    <div className="add-form-container">
      <h3>Add List of Quotes</h3>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>List Name:</label>
          <input
            type="text"
            name="listName"
            value={formData.listName}
            onChange={handleChange}
            required
          />
        </div>
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
            <p><strong>List: </strong>{newQuote.listName}</p>
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
  onResetFormData: () => dispatch(resetFormData()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);