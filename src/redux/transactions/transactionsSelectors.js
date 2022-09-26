import { createSelector } from '@reduxjs/toolkit';

export const getTransactions = state => state.transactions.transactions;

export const getSortedTransactions = createSelector(
  [getTransactions],
  transactions => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });
    return sortedTransactions;
  }
);
