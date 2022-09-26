import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export const createUserTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionBody, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.post('/transactions', transactionBody);

      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const getTransactionsByTypeAndDate = createAsyncThunk(
  'transactions/getTransactions',
  async ({ date, type }, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await axios.get(
        `/transactions/${date}?type=${type}&page=1&limit=1000`
      );
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const getTransactionsByDate = createAsyncThunk(
  'transactions/getTransactions',
  async ({ date }, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await axios.get(
        `/transactions/${date}?page=1&limit=1000`
      );
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
export const deleteTransactionById = createAsyncThunk(
  'transactions/deleteTransaction',
  async (_id, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await axios.delete(`/transactions/${_id}`);

      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const transactionsOperations = {
  createUserTransaction,
  getTransactionsByTypeAndDate,
  deleteTransactionById,
};

export default transactionsOperations;
