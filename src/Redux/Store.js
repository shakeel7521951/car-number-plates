import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './userRoutes/userApi'; // Import the correct API slice
import userReducer from './userRoutes/userSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
    user: userReducer, // Add the user reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add API slice middleware
});

export default store;
