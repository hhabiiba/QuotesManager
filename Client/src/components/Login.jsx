import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { storeUser, removeUser, getUser } from '../services/browserServices';
import { setUserData, setQuotesListData } from '../reducers/quotesReducer';
import { fetchAllQuotes } from '../services/quoteService';
import loginUser from '../services/loginService';
import '../CSS/login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [errmsg, setErrMsg] = useState('');

  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting login form...');
    try {
      const response = await loginUser(formData);
      dispatch(setUserData(response));
      const userResponse = await axios.get(`http://localhost:4000/api/users/${response.id}`);
      localStorage.setItem('user', JSON.stringify(userResponse));
      console.log(userResponse.data.quoteLists)
  
      // Convert quoteLists object to array of quoteListIds
      const quoteListIds = userResponse.data.quoteLists;
      const quoteListData = await fetchAllQuotes(quoteListIds); // Pass quoteListIds to fetchAllQuotes
      dispatch(setQuotesListData(quoteListData)); // Dispatch quote list data to Redux store
      localStorage.setItem('quotesListData', JSON.stringify(quoteListData)); // Store as string
  
      console.log('Login response:', response);
      if (response.username) {
        console.log('Login successful');
        storeUser(response);
        setUser(response); 
        setFormData({ 
          username: '',
          password: '',
        });
        setErrMsg('');
      } else {
        setErrMsg('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrMsg('Login failed. Please try again.');
    }
  };    
  
  const handleLogout = () => {
    removeUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="login-container">
      <Link to="/" className="back-log"></Link> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {user && (
        <div>
          <p className='user-text'>
            <strong>{user.username}</strong> is logged in.
          </p>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      )}
      <p className="err">{errmsg}</p>    
      {errmsg && ( 
        <p className='toggle'>Don't have an account? <Link to="/signup">SignUp</Link></p>
      )}
    </div>
  );
};

export default Login;