// App.js
import React, { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Normal from './Pages/Normal';
import Golden from './Pages/Golden';
import Silver from './Pages/Silver';
import Message from './Pages/Message.jsx';
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
import CreateNumberPlate from './Pages/CreateNumberPlate';
import { useDispatch } from 'react-redux';
import { useProfileQuery } from './Redux/userRoutes/userApi.js';
import { setProfile } from './Redux/userRoutes/userSlice.js';
import ProtectedRoute from './Pages/ProtectedRoute.jsx';
import { setProduct } from './Redux/ProductRoutes/productSlice.js';
import { useGetAllProductsQuery } from './Redux/ProductRoutes/productApi.js';
import ResetPassword from './Pages/ResetPassword.jsx';
import MyOrders from './Pages/MyOrders.jsx';
import VerifySignupOpt from './Pages/VerifySignupOtp.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import ProtectedChat from './Pages/ProtectedChat.jsx';

const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Outlet />
      {location.pathname !== '/chat' && <Footer />}
    </>
  );
};

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

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/normal', element: <Normal /> },
      { path: '/silver', element: <Silver /> },
      { path: '/gold', element: <Golden /> },
      { path: '/vip', element: <Vip /> },
      { path: '/single-card/:id', element: <PlateDetailPage /> },
      {
        path: '/faqs',
        element: <Chat />,
      },
      {
        path: '/chat',
        element: (
          <ProtectedChat allowedRoles={['seller', 'buyer']}>
            <Message />
          </ProtectedChat>
        ),
      },

      {
        path: '/update-password',
        element: (
          <ProtectedRoute allowedRoles={['seller', 'admin', 'buyer']}>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      { path: '/update-profile', element: <UpdateProfile /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      // { path: '/loader', element: <Loader /> },
      {
        path: '/createPlate',
        element: (
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <CreateNumberPlate />
          </ProtectedRoute>
        ),
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      { path: '/profile', element: <Profile /> },

      // Protected seller routes
      {
        path: '/listing',
        element: (
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <MyListing />
          </ProtectedRoute>
        ),
      },
      {
        path: '/seller-dashboard',
        element: (
          <ProtectedRoute allowedRoles={['seller', 'admin']}>
            <SellerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders',
        element: <MyOrders />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
  {
    path: '/verfiy-opt',
    element: <VerifySignupOpt />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { data: profile } = useProfileQuery();
  const { data: receivedData } = useGetAllProductsQuery();
  useEffect(() => {
    dispatch(setProduct(receivedData));
  }, [receivedData, dispatch]);
  useEffect(() => {
    if (profile?.user) {
      dispatch(setProfile(profile?.user));
    }
  }, [profile, dispatch]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
