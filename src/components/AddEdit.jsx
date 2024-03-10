import React from 'react';
import  AddQuote from './AddQuote'; 
import  EditQuote from './EditQuote'

const AddEditPage = () => {
    const handleAdd = (newQuote) => { //func. for addin' newQuotes..
        console.log ('adding quote', newQuote)
      }
    
      const handleUpdate = (updatedQuote) => { //func. for updatin' q..
        console.log('updated quote:', updatedQuote);
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
