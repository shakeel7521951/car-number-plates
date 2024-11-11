// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../Redux/FeatureSlice/UiControl';

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export default store;
