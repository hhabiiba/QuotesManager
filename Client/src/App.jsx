import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {fetchAllQuotes} from './services/quoteService'
import { setQuotesListData } from './reducers/quotesReducer';
import Home from './components/Home';
import Category from './components/Category';
import AddEditPage from './components/AddEdit';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Sidebar from './components/SideBar';
import QuoteList from './components/QuoteList';
import Login from './components/Login';
import Signup from './components/SignUp';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (user && user.quoteLists) {
      fetchAllQuotes(user.quoteLists);
      const quotesData = JSON.parse(localStorage.getItem('quotesListData'))
      console.log("setting quotes data in App when refersh is done");
      console.log(quotesData);
      dispatch(setQuotesListData(quotesData))  
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Header />
        <NavBar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/AddEdit" element={<AddEditPage />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/quote-list" element={<QuoteList />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App