import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const getReportsFull = createAsyncThunk(
  'reports/getFull',
  async (queryParams, thunkAPI) => {
    const params = queryParams;
    try {
      const { data } = await axios.get('/reports/', { params });
      return data;
    } catch (error) {
      toast.error('Error. Server not answered!');
      return thunkAPI.rejectWithValue();
    }
  }
);

const getReportsMonthlyExpenses = createAsyncThunk(
  'reports/getMonthlyExpenses',
  async (queryParams, thunkAPI) => {
    const params = queryParams;
    try {
      const { data } = await axios.get('/reports/monthly-expenses', { params });
      return data;
    } catch (error) {
      toast.error('Error. Server not answered!');
      return thunkAPI.rejectWithValue();
    }
  }
);

const getReportsMonthlyIncome = createAsyncThunk(
  'reports/getMonthlyIncome',
  async (queryParams, thunkAPI) => {
    const params = queryParams;
    try {
      const { data } = await axios.get('/reports/monthly-income', { params });

      return data;
    } catch (error) {
      toast.error('Error. Server not answered!');
      return thunkAPI.rejectWithValue();
    }
  }
);

const reportsOperations = {
  getReportsFull,
  getReportsMonthlyExpenses,
  getReportsMonthlyIncome,
};

export default reportsOperations;
