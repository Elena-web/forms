import { store } from './store';
import { addDataForm, clearFormData, markDataOld } from './formDataSlice';
import type { RootState } from './store';

describe('Redux store: formDataSlice', () => {
  const sampleForm = {
    name: 'John',
    age: 25,
    email: 'john@test.com',
    password: '123',
    passwordConfirm: '123',
    gender: 'male',
    isAccept: true,
    country: 'USA',
    image: 'base64',
    isNew: true,
  };

  beforeEach(() => {
    store.dispatch(clearFormData());
  });

  it('should add a single form data item to the store', () => {
    store.dispatch(addDataForm(sampleForm));
    const state: RootState = store.getState();

    expect(state.formData.data).toHaveLength(1);
    expect(state.formData.data[0]).toEqual(sampleForm);
    expect(state.formData.data[0].isNew).toBe(true);
  });

  it('should clear all form data from the store', () => {
    store.dispatch(addDataForm(sampleForm));
    store.dispatch(clearFormData());

    const state: RootState = store.getState();
    expect(state.formData.data).toEqual([]);
  });

  it('should correctly mark a data item as old', () => {
    store.dispatch(addDataForm(sampleForm));
    store.dispatch(markDataOld(0));

    const state: RootState = store.getState();
    expect(state.formData.data[0].isNew).toBe(false);
  });

  it('should handle multiple form data items', () => {
    const anotherForm = { ...sampleForm, name: 'Alice' };
    store.dispatch(addDataForm(sampleForm));
    store.dispatch(addDataForm(anotherForm));

    const state: RootState = store.getState();
    expect(state.formData.data).toHaveLength(2);
    expect(state.formData.data[1].name).toBe('Alice');
  });
});
