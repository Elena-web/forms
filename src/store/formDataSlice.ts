import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../util/types';

interface FormDataWithFlag extends FormData {
  isNew?: boolean;
}

interface FormState {
  data: FormDataWithFlag[];
}

const initialState: FormState = {
  data: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addDataForm: (state, action: PayloadAction<FormData>) => {
      state.data.push({ ...action.payload, isNew: true });
    },

    markDataOld: (state, action: PayloadAction<number>) => {
      if (state.data[action.payload]) {
        state.data[action.payload].isNew = false;
      }
    },
  },
});

export const { addDataForm, markDataOld } = formDataSlice.actions;
export default formDataSlice.reducer;
