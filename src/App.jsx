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

const App = () => {

  const handleAdd = (newQuote) => { //func. for addin' newQuotes..
    console.log ('adding quote', newQuote)
  }
  
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