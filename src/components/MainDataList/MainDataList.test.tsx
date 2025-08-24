import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MainDataList } from './MainDataList';
import { markDataOld } from '../../store/formDataSlice';

jest.mock('../styles/Form.module.css', () => ({
  dataList: 'dataList',
  dataItem: 'dataItem',
  new: 'new',
}));

const mockStore = configureStore([]);

describe('MainDataList', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders data from the store', () => {
    const store = mockStore({
      formData: {
        data: [
          {
            name: 'John',
            age: 25,
            email: 'john@example.com',
            country: 'USA',
            gender: 'male',
            isAccept: true,
            isNew: false,
            image: null,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MainDataList />
      </Provider>
    );

    expect(screen.getByText(/Name: John/)).toBeInTheDocument();
    expect(screen.getByText(/Age: 25/)).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/)).toBeInTheDocument();
    expect(screen.getByText(/Accepted Terms: Yes/)).toBeInTheDocument();
  });

  it('applies the "new" class to new items', () => {
    const store = mockStore({
      formData: {
        data: [
          {
            name: 'Alice',
            age: 30,
            email: 'alice@example.com',
            country: 'UK',
            gender: 'female',
            isAccept: false,
            isNew: true,
            image: null,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MainDataList />
      </Provider>
    );

    const item = screen.getByText(/Name: Alice/).closest('div');
    expect(item).toHaveClass('dataItem new');
  });

  it('dispatches markDataOld after 4 seconds for new items', () => {
    const store = mockStore({
      formData: {
        data: [
          {
            name: 'Bob',
            age: 40,
            email: 'bob@example.com',
            country: 'Canada',
            gender: 'male',
            isAccept: true,
            isNew: true,
            image: null,
          },
        ],
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MainDataList />
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(store.dispatch).toHaveBeenCalledWith(markDataOld(0));
  });

  it('renders an image if the item has one', () => {
    const store = mockStore({
      formData: {
        data: [
          {
            name: 'Kate',
            age: 22,
            email: 'kate@example.com',
            country: 'Germany',
            gender: 'female',
            isAccept: true,
            isNew: false,
            image: 'test-image.jpg',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MainDataList />
      </Provider>
    );

    const img = screen.getByRole('img', { name: /Kate's upload/i });
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });
});
