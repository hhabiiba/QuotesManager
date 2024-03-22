import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storeUser } from '../services/browserServices';
import { addUser } from '../services/userService';
import '../CSS/signup.css'; 

const SignUp = () => {
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
      const res = await addUser(formData);
      if (res.status === 201) {
        storeUser(res.data); 
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrMsg('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p className='err'>{errmsg}</p>
      <p> Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;