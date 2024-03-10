import React from 'react';
import  AddQuote from './AddQuote'; 
import  EditQuote from './EditQuote'

const AddEditPage = () => {
    const handleAdd = () => { //func. for addin' newQuotes..
      }
    
      const handleUpdate = () => { //func. for updatin' q..   
      };

  return (
    <div>
      <h2>Add or Edit your favourtie quote~</h2>
      <AddQuote onAdd={handleAdd}/>
      <EditQuote onUpdate={handleUpdate} />
    </div>
  );
};

export default AddEditPage;
