import React from 'react';
import  AddQuote from './AddQuote'; 
import  EditQuote from './EditQuote'

const AddEditPage = () => {
  return (
    <div>
      <h2>Add or Edit your favourtie quote~</h2>
      <AddQuote />
      <EditQuote/>
    </div>
  );
};

export default AddEditPage;
