import { createSlice } from '@reduxjs/toolkit';

const initialState = ['USA', 'Canada', 'Germany', 'France', 'Japan'];

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
