import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Normal from './Pages/Normal';
import Silver from './Pages/Silver';
import Golden from './Pages/Golden';
import Footer from './components/Footer';
import Vip from './Pages/Vip';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import PlateDetailPage from './Pages/PlateDetailPage';
import Chat from './Pages/Chat';
import MyListing from './Pages/MyListing';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import DashboardOrder from './Pages/Dashboard/DashboardOrder.jsx';
import DashboardProduct from './Pages/Dashboard/DashboardProduct.jsx';
import DashboardUser from './Pages/Dashboard/DashboardUser.jsx';
import DashboardPayment from './Pages/Dashboard/DashboardPayment.jsx';
import DashboardShipment from './Pages/Dashboard/DashboardShipment.jsx';
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
          <Route path='/single-card/:id' element={<PlateDetailPage />} />
          <Route path='/message' element={<Chat />} />
          <Route path='/update-password' element={<UpdatePassword />} />
          <Route path='/listing' element={<MyListing />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/orders' element={<DashboardOrder />} />
          <Route path='/dashboard/product' element={<DashboardProduct />} />
          <Route path='/dashboard/user' element={<DashboardUser />} />
          <Route path='/dashboard/payment' element={<DashboardPayment />} />
          <Route path='/dashboard/shipment' element={<DashboardShipment />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
