import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './reportsSlice';

export const getReportsFull = state => state.reports.full;
export const getIsRefreshingReportsFull = state =>
  state.reports.full.isRefreshing;
export const getReportsMonthlyExpenses = state => state.reports.monthExpenses;
export const getReportsMonthlyIncome = state => state.reports.monthIncome;
export const getTotalSunByMonthlyExpenses = state => {
  if (state.reports.monthExpenses.length !== 0) {
    return state.reports.monthExpenses[0].totalSum;
  }
};
export const getTotalSunByMonthlyIncome = state => {
  if (state.reports.monthIncome.length !== 0) {
    return state.reports.monthIncome[0].totalSum;
  }
};
export const getReportsDate = state => state.reports.date;

export const getDataByMonth = createSelector(
  [getReportsFull, getReportsDate],
  (data, date) => {
    const searchDate =
      date.year + '-' + date.month < 10
        ? '0' + Number(date.month)
        : Number(date.month);
    if (data[0].date !== '') {
      return data.filter(item => item.date.includes(searchDate));
    }
    return initialState.full;
  }
);

export const getDataByType = type =>
  createSelector([getDataByMonth], dataByMonth => {
    if (dataByMonth.length !== 0 && dataByMonth[0].arrOfTypes[0].type !== '') {
      return dataByMonth[0].arrOfTypes.filter(item => item.type.includes(type));
    }
    return initialState.full[0].arrOfTypes;
  });

export const getDataByCategory = (type, category) =>
  createSelector([getDataByType(type)], dataByType => {
    if (dataByType[0].type !== '') {
      return dataByType[0].arrOfCategories.filter(item =>
        item.category.name.toLowerCase().includes(category)
      );
    }
    return initialState.full[0].arrOfTypes[0].arrOfCategories;
  });

export const getDataByCategoryId = (type, categoryId) =>
  createSelector([getDataByType(type)], dataByType => {
    if (dataByType[0].type !== '') {
      return dataByType[0].arrOfCategories.filter(item =>
        item.category._id.includes(categoryId)
      );
    }
    return initialState.full[0].arrOfTypes[0].arrOfCategories;
  });
