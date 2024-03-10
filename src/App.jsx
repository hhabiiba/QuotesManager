import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category';
import AddEditPage from './components/AddEdit';

const App = () => {
  
  return (
    <>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AddEdit">Add/Edit</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Home />
        </main>
        <Routes>
          <Route path="/category/:category" element={<Category />} />
          <Route path="/AddEdit" element={<AddEditPage />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App