import React from 'react';
import { connect } from 'react-redux';
import { submitContactForm } from '../actions/contactAction';

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
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
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
