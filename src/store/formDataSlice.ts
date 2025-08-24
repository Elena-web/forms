import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../util/types';

const initialState: FormData[] = [];

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addDataForm: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addDataForm } = formDataSlice.actions;
export default formDataSlice.reducer;
