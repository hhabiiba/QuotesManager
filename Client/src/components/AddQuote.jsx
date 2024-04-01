import { connect, useSelector, useDispatch } from 'react-redux';
import { addFormData } from '../actions/addAction';
import { setQuotesListData, deleteList, setUserQuoteList } from '../reducers/quotesReducer';
import '../CSS/addquote.css';
import axios from 'axios';
import { useState, useEffect } from 'react'; // Import useEffect

const AddQuote = ({ formData, onAddFormData }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const Quotes = useSelector(state => state.quote.quoteListData);
  const [listsIds, setListsIds] = useState(user.quoteLists);
  const [lists, setLists] = useState([]); // State to store list names
  const [selectedListIndex, setSelectedListIndex] = useState(0); // State to store selected list index

  useEffect(() => {
    const fetchListNames = async () => {
      try {
        const listsData = [];
        for (const listId of listsIds) {
          const response = await axios.get(`http://localhost:4000/api/quoteLists/${listId}`);
          listsData.push(response.data.name);
        }
        setLists(listsData);
      } catch (error) {
        console.error('Error fetching list names:', error);
        setLists([]);
      }
    };

    fetchListNames();
  }, [listsIds]); // Fetch list names when listsIds change

  const handleAddQuote = async (e) => {
    e.preventDefault();
    const listId = listsIds[selectedListIndex];
    const { quote, author, category } = formData;
    const newQuote = { quote, author, category };
  
    try {
      const response = await axios.post(`http://localhost:4000/api/quotes/${listId}`, newQuote);
      const updatedListIndex = lists.findIndex(list => list === lists[selectedListIndex]);
      const updatedQuotesData = [...Quotes];
      updatedQuotesData[updatedListIndex] = {
        ...updatedQuotesData[updatedListIndex],
        quotes: [...updatedQuotesData[updatedListIndex].quotes, response.data]
      };
      dispatch(setQuotesListData(updatedQuotesData));
      localStorage.setItem('quotesListData', JSON.stringify(updatedQuotesData));
      alert("Quote added successfully");
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  };  

  const handleAddList = async (e) => {
    e.preventDefault();
    const newListName = formData.listName;

    try {
      const response = await axios.post(`http://localhost:4000/api/quoteLists/${user.id}`, { name: newListName });
      const newList = response.data;
      const updatedListsIds = [...listsIds, newList.id];
      setListsIds(updatedListsIds);
      const updatedQuotesData = [...Quotes]
      updatedQuotesData.push(newList);
      const updatedUser = {...user};
      updatedUser.quoteLists = updatedListsIds;
      dispatch(setQuotesListData(updatedQuotesData));
      dispatch(setUserQuoteList(updatedListsIds));
      localStorage.setItem('quotesListData', JSON.stringify(updatedQuotesData));
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert("List added success");
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  const handleClickDelete = async (e) => {
    try {
      const listId = listsIds[selectedListIndex];
      const updatedQuoteData = Quotes.filter((list, index) => index !== selectedListIndex)
      dispatch(deleteList(selectedListIndex));
      const updatedListIds = listsIds.filter((id) => id !== listId);
      setListsIds(updatedListIds);
      const updatedUser = {...user};
      updatedUser.quoteLists = updatedListIds;
      dispatch(setUserQuoteList(updatedListIds))
      localStorage.setItem('quotesListData', JSON.stringify(updatedQuoteData));
      localStorage.setItem('user', JSON.stringify(updatedUser));
      await axios.delete(`http://localhost:4000/api/quoteLists/${listId}`, { data: { userId: user.id } });
      alert("List deleted success");
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddFormData({ [name]: value });
  };

  const handleCategoryDisplay = (e) => {
    const category = e.target.value;
    setSelectedListIndex(lists.findIndex(list => list === category)); // Set selected list index
  };

  return (
    <div className="add-form-container">
        <h3>Add Quotes</h3>
      <form onSubmit={handleAddQuote}>
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
        <div className='select-category'>
          <select value={lists[selectedListIndex]} onChange={handleCategoryDisplay}>
            <option value="">Select Category</option>
            {lists.map((list, index) => (
              <option key={index} value={list}>{list}</option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className='add'>Add</button>
        </div>
      </form>

      <h3>Add List</h3>
      <form onSubmit={handleAddList}>
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
        <div className="form-actions">
          <button type="submit" className='add'>Add</button>
        </div>
      </form>
      <div className='select-category'>
          <select value={lists[selectedListIndex]} onChange={handleCategoryDisplay}>
            <option value="">Select Category</option>
            {lists.map((list, index) => (
              <option key={index} value={list}>{list}</option>
            ))}
          </select>
          <button className="delList" onClick={handleClickDelete}>Delete</button>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formData: state.add.formData,
});

const mapDispatchToProps = (dispatch) => ({
  onAddFormData: (formData) => dispatch(addFormData(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuote);