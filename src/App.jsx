import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category';
import AddEditPage from './components/AddEdit';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Sidebar from './components/SideBar';
 

const App = () => {
  
  return (
    <div className='app'>
    <Router>
      <Header />
      <NavBar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/AddEdit" element={<AddEditPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App