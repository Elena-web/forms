import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UncontrolledForm from './UncontrolledForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';
import * as fileUtils from '../../util/fileToBase64';

jest
  .spyOn(fileUtils, 'fileToBase64')
  .mockImplementation(async () => 'data:image/png;base64,mock');

const onClose = jest.fn();

const renderForm = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <UncontrolledForm onClose={onClose} />
      </BrowserRouter>
    </Provider>
  );

describe('UncontrolledForm', () => {
  it('shows password mismatch error', async () => {
    renderForm();

    fireEvent.input(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.input(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'WrongPass' },
    });

    const submitBtn = screen.getByRole('button', { name: /submit form/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });
});
