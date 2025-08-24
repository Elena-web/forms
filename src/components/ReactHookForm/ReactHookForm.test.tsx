import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactHookForm from './ReactHookForm';
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
        <ReactHookForm onClose={onClose} />
      </BrowserRouter>
    </Provider>
  );

describe('ReactHookForm', () => {
  it('renders all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose country/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Accept Terms & Conditions/i)
    ).toBeInTheDocument();
  });

  it('shows validation errors for empty submission', async () => {
    renderForm();

    const submitBtn = screen.getByRole('button', { name: /submit form/i });
    submitBtn.removeAttribute('disabled');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/age must be a `number` type/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/E-mail is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please confirm your password/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/File is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/You must accept the Terms and Conditions/i)
      ).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    renderForm();

    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText('Age'), {
      target: { value: '30' },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.input(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'Password123!' },
    });

    const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(
      /Upload image/i
    ) as HTMLInputElement;
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);

    fireEvent.change(screen.getByLabelText(/Choose country/i), {
      target: { value: 'USA' },
    });
    fireEvent.click(screen.getByLabelText('Male'));
    fireEvent.click(screen.getByLabelText(/Accept Terms & Conditions/i));

    const form =
      screen.getByTestId?.('react-hook-form') ?? document.querySelector('form');
    if (!form) throw new Error('Form element not found');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
      const state = store.getState();
      expect(state.formData.data[0].name).toBe('John');
    });
  });

  it('shows password mismatch error', async () => {
    renderForm();

    fireEvent.input(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.input(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'WrongPass' },
    });

    const submitBtn = screen.getByRole('button', { name: /submit form/i });
    submitBtn.removeAttribute('disabled');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });
});
