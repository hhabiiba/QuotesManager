import React from 'react';
import  AddQuote from './AddQuote'; 
import  EditQuote from './EditQuote'
import { Link } from 'react-router-dom';

const AddEditPage = () => {
  return (
    <div className='addedit'>
      <Link to="/" className="back-add"></Link> 
      <h2>Add➕or Edit✏️ your favourtie quote~</h2>
      <AddQuote />
      <EditQuote/>
    </div>
  );
};

export default AddEditPage;
