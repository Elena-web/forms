import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  const onClose = jest.fn();

  const renderModal = (isOpen: boolean) =>
    render(
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders content when open', () => {
    renderModal(true);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    renderModal(false);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside modal content', () => {
    renderModal(true);
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside modal content', () => {
    renderModal(true);
    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing ESC key', () => {
    renderModal(true);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders into document body using portal', () => {
    renderModal(true);
    const portalContent = screen.getByTestId('modal-content');
    expect(portalContent).toBeInTheDocument();
    expect(portalContent).toHaveTextContent('Modal Content');
  });
});
