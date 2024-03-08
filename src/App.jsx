import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category';
import AddQuote from './components/AddQuote';
import EditQuote from './components/EditQuote';

const App = () => {

  const handleAdd = (newQuote) => { //func. for addin' newQuotes..
    console.log ('adding quote', newQuote)
  }

  const handleUpdate = (updatedQuote) => { //func. for updatin' q..
    console.log('updated quote:', updatedQuote);
  };
  
  return (
    <>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Home />
          <AddQuote onAdd={handleAdd}/>
          <EditQuote onUpdate={handleUpdate} />
        </main>
        <Routes>
          <Route path="/category/:category" element={<Category />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App