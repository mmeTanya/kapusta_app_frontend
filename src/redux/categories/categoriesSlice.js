import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesList } from './categoriesOperations';

const initialState = {
  categories: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [getCategoriesList.fulfilled](state, { payload }) {
      state.categories = payload.categoryList;
    },
  },
});

export default categoriesSlice.reducer;
