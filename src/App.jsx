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
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  
  return (
    <Router>
    <Header/>
    <NavBar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/AddEdit" element={<AddEditPage />} />
    </Routes>
    <Footer/>
    </Router>
  );
}

export default App