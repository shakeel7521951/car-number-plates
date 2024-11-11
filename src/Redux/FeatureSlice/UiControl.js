import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isOpen: false,
  },
  reducers: {},
});

export const { open, close, toggle } = uiSlice.actions;
export default uiSlice.reducer;
