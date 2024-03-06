import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category';
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
          </ul>
        </nav>
        <main>
          <Home />
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
