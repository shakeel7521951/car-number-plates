// App.js
import React, { useEffect } from 'react';
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
import Login from './components/UserComponent/Login';
import Register from './components/UserComponent/Register';
import Profile from './Pages/profileRoutes/Profile';
import UpdateProfile from './Pages/profileRoutes/UpdateProfile.jsx';
import { useDispatch } from 'react-redux';
import { useProfileQuery } from './Redux/userRoutes/userApi.js';
import { setProfile } from './Redux/userRoutes/userSlice.js';

// Layout for pages with Navbar and Footer
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Dashboard layout with Sidebar only
const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DashboardSidebar />
      <div
        style={{ flex: 1, padding: '20px' }}
        className='lg:ml-[18%] overflow-x-hidden'
      >
        <Outlet />
      </div>
    </div>
  );
};

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
      { path: '/update-profile', element: <UpdateProfile /> },
      { path: '/listing', element: <MyListing /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/profile', element: <Profile /> },
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
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useProfileQuery();

  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile));
    }
  }, [profile, dispatch]);

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    <h1>Error wile fetching</h1>;
  }

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
