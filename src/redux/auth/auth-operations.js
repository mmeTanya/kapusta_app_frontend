import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/register', credentials);
      token.set(data.token);
      toast.success('Register is success. Login please.');

      return data;
    } catch (error) {
      toast.error('Error. Try other email!');

      return thunkAPI.rejectWithValue();
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    token.set(data.token);
    toast.success('Authentification success!');

    return data;
  } catch (error) {
    toast.error('Error. Try other credentials!');

    return thunkAPI.rejectWithValue();
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    token.unset();
    toast.success('Goodbye to the next session!');
  } catch (error) {
    toast.success('Error. Try again!');
    return thunkAPI.rejectWithValue();
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
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
      return thunkAPI.rejectWithValue();
    }
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
