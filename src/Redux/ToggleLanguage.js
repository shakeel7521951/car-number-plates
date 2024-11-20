import { createSlice } from '@reduxjs/toolkit';

const toggleLanguage = createSlice({
  name: 'user',
  initialState: {
    language: 'eng',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = toggleLanguage.actions;
export default toggleLanguage.reducer;
