import React from 'react';
import { connect } from 'react-redux';
import { submitContactForm } from '../actions/contactAction';
import { Link } from 'react-router-dom';
import '../CSS/contact.css';

const Contact = ({ formData, submitContactForm }) => {
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    submitContactForm({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactForm(formData);
    submitContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <Link to="/" className="back-con"></Link> 
      <h2 className="contact-heading">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-group">
          <label htmlFor="name" className="contact-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </div>
        <div className="contact-group">
          <label htmlFor="email" className="contact-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
          />
        </div>
        <div className="contact-group">
          <label htmlFor="message" className="contact-label">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-input"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formData: state.contact
});

const mapDispatchToProps = {
  submitContactForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
