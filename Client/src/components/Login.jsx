import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { storeUser, removeUser } from '../services/browserServices';
import loginUser from '../services/loginService';
import '../CSS/login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errmsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        storeUser(response.data);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrMsg('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  return (
    <div className="login-container">
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
      <p className="err">{errmsg}</p>
      {errmsg && ( 
      <p className='toggle'>Don't have an account? <Link to="/signup">SignUp</Link></p>
    )}
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
