import formDataReducer, {
  addDataForm,
  markDataOld,
  clearFormData,
} from './formDataSlice';
import type { FormData } from '../util/types';

describe('formDataSlice', () => {
  const initialState = { data: [] };

  const sampleForm: FormData = {
    name: 'John',
    age: 25,
    email: 'john@test.com',
    password: '123',
    gender: 'male',
    isAccept: true,
    country: 'USA',
    image: 'base64',
  };

  it('should return the initial state', () => {
    expect(formDataReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle addDataForm', () => {
    const state = formDataReducer(initialState, addDataForm(sampleForm));
    expect(state.data).toHaveLength(1);
    expect(state.data[0]).toEqual({ ...sampleForm, isNew: true });
  });

  it('should handle multiple addDataForm actions', () => {
    const state1 = formDataReducer(initialState, addDataForm(sampleForm));
    const anotherForm = { ...sampleForm, name: 'Alice' };
    const state2 = formDataReducer(state1, addDataForm(anotherForm));

    expect(state2.data).toHaveLength(2);
    expect(state2.data[0].name).toBe('John');
    expect(state2.data[1].name).toBe('Alice');
  });

  it('should handle markDataOld for valid index', () => {
    const filledState = { data: [{ ...sampleForm, isNew: true }] };
    const state = formDataReducer(filledState, markDataOld(0));
    expect(state.data[0].isNew).toBe(false);
  });

  it('should not change state for invalid index in markDataOld', () => {
    const filledState = { data: [{ ...sampleForm, isNew: true }] };
    const state = formDataReducer(filledState, markDataOld(99));
    expect(state.data[0].isNew).toBe(true);
  });

  it('should mark multiple items as old individually', () => {
    const filledState = {
      data: [
        { ...sampleForm, isNew: true },
        { ...sampleForm, name: 'Alice', isNew: true },
      ],
    };
    let state = formDataReducer(filledState, markDataOld(1));
    expect(state.data[0].isNew).toBe(true);
    expect(state.data[1].isNew).toBe(false);

    state = formDataReducer(state, markDataOld(0));
    expect(state.data[0].isNew).toBe(false);
    expect(state.data[1].isNew).toBe(false);
  });

  it('should handle clearFormData', () => {
    const filledState = { data: [{ ...sampleForm, isNew: true }] };
    const state = formDataReducer(filledState, clearFormData());
    expect(state.data).toEqual([]);
  });

  it('should maintain immutability', () => {
    const filledState = { data: [{ ...sampleForm, isNew: true }] };
    const state = formDataReducer(filledState, markDataOld(0));

    expect(state).not.toBe(filledState);
    expect(state.data).not.toBe(filledState.data);
  });
});
