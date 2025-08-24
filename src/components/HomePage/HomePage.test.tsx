import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

jest.mock('../Modal/Modal', () => ({
  Modal: ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null,
}));

const UncontrolledFormMock = () => (
  <div data-testid="uncontrolled-form">Uncontrolled Form</div>
);
UncontrolledFormMock.displayName = 'UncontrolledForm';
jest.mock('../UncontrolledForm/UncontrolledForm', () => UncontrolledFormMock);

const ReactHookFormMock = () => (
  <div data-testid="hook-form">React Hook Form</div>
);
ReactHookFormMock.displayName = 'ReactHookForm';
jest.mock('../ReactHookForm/ReactHookForm', () => ReactHookFormMock);

jest.mock('../MainDataList/MainDataList', () => ({
  MainDataList: () => <div data-testid="main-data-list">Main Data List</div>,
}));

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('renders form selector buttons and header', () => {
    expect(screen.getByText('Select a form type')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('opens modal with UncontrolledForm when button is clicked', () => {
    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
  });

  it('opens modal with ReactHookForm when button is clicked', () => {
    fireEvent.click(screen.getByText('React Hook Form'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('hook-form')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    fireEvent.click(screen.getByText('Uncontrolled Form'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders MainDataList', () => {
    expect(screen.getByTestId('main-data-list')).toBeInTheDocument();
  });
});
