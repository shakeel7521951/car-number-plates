// App.js
import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Normal from './Pages/Normal';
import Silver from './Pages/Silver';
import Golden from './Pages/Golden';
import Vip from './Pages/Vip';
import SellerDashboard from './Pages/SellerDashboard';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import PlateDetailPage from './Pages/PlateDetailPage';
import Chat from './Pages/Chat';
import MyListing from './Pages/MyListing';
import DashboardOrder from './Pages/Dashboard/DashboardOrder';
import DashboardProduct from './Pages/Dashboard/DashboardProduct';
import DashboardUser from './Pages/Dashboard/DashboardUser';
import DashboardPayment from './Pages/Dashboard/DashboardPayment';
import DashboardShipment from './Pages/Dashboard/DashboardShipment';
import DashboardSidebar from './Pages/Dashboard/DashboardSidebar';
import Dashboard from './Pages/Dashboard/Dashboard';

// Layout for pages with Navbar and Footer
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Dashboard layout with Sidebar only
const DashboardLayout = () => (
  <div style={{ display: 'flex' }}>
    <DashboardSidebar />
    <div style={{ flex: 1, padding: '20px' }}>
      <Outlet />
    </div>
  </div>
);

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/normal', element: <Normal /> },
      { path: '/silver', element: <Silver /> },
      { path: '/gold', element: <Golden /> },
      { path: '/vip', element: <Vip /> },
      { path: '/single-card/:id', element: <PlateDetailPage /> },
      { path: '/message', element: <Chat /> },
      { path: '/update-password', element: <UpdatePassword /> },
      { path: '/listing', element: <MyListing /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/seller-dashboard', element: <SellerDashboard /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />, // For dashboard routes with Sidebar only
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <DashboardOrder /> },
      { path: 'product', element: <DashboardProduct /> },
      { path: 'user', element: <DashboardUser /> },
      { path: 'payment', element: <DashboardPayment /> },
      { path: 'shipment', element: <DashboardShipment /> },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
