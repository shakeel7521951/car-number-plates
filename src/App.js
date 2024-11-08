import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Normal from './Pages/Normal';
import Silver from './Pages/Silver';
import Golden from './Pages/Golden';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './components/Footer';

// Import your components

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/normal' element={<Normal />} />

          <Route path='/silver' element={<Silver />} />
          <Route path='/golden' element={<Golden />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
