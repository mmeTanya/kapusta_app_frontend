import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { email: null, name: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user.email = action.payload.email;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isRefreshing = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isRefreshing = false;
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = 'Unautorized';
    },
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
