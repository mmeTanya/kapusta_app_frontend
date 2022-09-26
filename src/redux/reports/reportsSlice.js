import { createSlice } from '@reduxjs/toolkit';
import reportsOperations from './reportsOperations';

export const initialState = {
  date: {
    year: null,
    month: null,
  },
  isRefreshing: false,
  full: [
    {
      date: '',
      arrOfTypes: [
        {
          type: '',
          totalSum: 0,
          arrOfCategories: [
            {
              category: {
                _id: '',
                name: '',
                type: '',
              },
              totalSum: 0,
              arrOfTransactions: [
                {
                  description: '',
                  value: '',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  monthExpenses: [],
  monthIncome: [],
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportsDate(state, { payload }) {
      state.date.year = payload.year;
      state.date.month = payload.month;
    },
  },
  extraReducers: {
    [reportsOperations.getReportsFull.pending](state) {
      state.isRefreshing = true;
      state.full = initialState.full;
    },
    [reportsOperations.getReportsFull.fulfilled](state, { payload }) {
      state.full =
        payload.fullReportByMonth.length !== 0
          ? payload.fullReportByMonth
          : initialState.full;
      state.isRefreshing = false;
    },
    [reportsOperations.getReportsFull.rejected](state) {
      state.full = initialState.full;
      state.isRefreshing = false;
    },

    [reportsOperations.getReportsMonthlyExpenses.fulfilled](
      state,
      { payload }
    ) {
      state.monthExpenses = payload.expensesByMonth;
    },
    [reportsOperations.getReportsMonthlyIncome.fulfilled](state, { payload }) {
      state.monthIncome = payload.incomeByMonth;
    },
  },
});

export default reportsSlice.reducer;
export const { setReportsDate } = reportsSlice.actions;
