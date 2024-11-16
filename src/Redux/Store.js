import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './userRoutes/userApi';
import userReducer from './userRoutes/userSlice';
import { productApi } from './userRoutes/productApi';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(productApi.middleware),
});

export default store;
