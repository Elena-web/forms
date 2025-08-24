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
      const index = action.payload;
      if (state.data[index]) {
        state.data[index].isNew = false;
      }
    },

    clearFormData: (state) => {
      state.data = [];
    },
  },
});

export const { addDataForm, markDataOld, clearFormData } =
  formDataSlice.actions;
export default formDataSlice.reducer;
