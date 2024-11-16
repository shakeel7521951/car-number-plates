import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null, // Holds user profile data
  },
  reducers: {
    setProfile: (state, action) => {
      console.log(action.payload);
      state.profile = action?.payload;
    },
    clearProfile: (state) => {
      state.profile = null; // Clear profile on logout
    },
  },
});

export const { setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
