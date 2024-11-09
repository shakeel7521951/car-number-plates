import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Normal from './Pages/Normal';
import Silver from './Pages/Silver';
import Golden from './Pages/Golden';
import Footer from './components/Footer';
import Vip from './Pages/Vip';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';

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
          <Route path='/gold' element={<Golden />} />
          <Route path='/vip' element={<Vip />} />
          <Route path='/update-password' element={<UpdatePassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
