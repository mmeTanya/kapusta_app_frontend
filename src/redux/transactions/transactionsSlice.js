import { createSlice } from '@reduxjs/toolkit';
import {
  createUserTransaction,
  getTransactionsByTypeAndDate,
  deleteTransactionById,
  getTransactionsByDate,
} from './transactionsOperations';

const initialState = {
  message: null,
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: {
    [createUserTransaction.fulfilled](state, { payload }) {
      state.message = payload.message;
      state.transactions.push(payload.transaction);
    },
    [createUserTransaction.rejected](state, { payload }) {
      state.message = 'Transaction with such data is incorrect';
    },
    [getTransactionsByTypeAndDate.fulfilled](state, { payload }) {
      state.message = payload.message;
      state.transactions = payload.transactions;
    },
    [getTransactionsByDate.fulfilled](state, { payload }) {
      state.message = payload.message;
      state.transactions = payload.transactions;
    },
    [getTransactionsByTypeAndDate.rejected](state, { payload }) {
      state.message = 'Incorrect date or transaction type specified';
    },
    [deleteTransactionById.fulfilled](state, { payload }) {
      state.transactions = state.transactions.filter(
        ({ _id }) => _id !== payload.transaction._id
      );
    },
  },
});

export default transactionsSlice.reducer;
