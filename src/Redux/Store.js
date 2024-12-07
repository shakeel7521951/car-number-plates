import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './userRoutes/userApi';
import userReducer from './userRoutes/userSlice';
import { productApi } from './ProductRoutes/productApi';
import productReducer from './ProductRoutes/productSlice';
import ToggleLanguage from './ToggleLanguage';
import { orderApi } from './OrderRoute/orderApi';
import { messageApi } from './messageRoute/messageApi';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    product: productReducer,
    language: ToggleLanguage,
    [orderApi.reducerPath]: orderApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(messageApi.middleware),
});

export default store;
