import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

// GET balance
const fetchBalance = createAsyncThunk(
  'balance/getBalance',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await axios.get('/user');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//PATCH add balance
const addInitialBalance = createAsyncThunk(
  'balance/addBalance',
  async (args, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await axios.patch('/user/balance', args);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const balanceOperations = {
  fetchBalance,
  addInitialBalance,
};
export default balanceOperations;
