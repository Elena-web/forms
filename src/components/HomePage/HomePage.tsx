import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import ReactHookForm from '../ReactHookForm/ReactHookForm';
import { MainDataList } from '../MainDataList/MainDataList';

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<'uncontrolled' | 'hook' | null>(
    null
  );

  const openForm = (formType: 'uncontrolled' | 'hook') => {
    setActiveForm(formType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveForm(null);
  };

  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main>
        <div className="form-selector">
          <h2>Select a form type</h2>
          <div className="button-group">
            <button onClick={() => openForm('uncontrolled')}>
              Uncontrolled Form
            </button>
            <button onClick={() => openForm('hook')}>React Hook Form</button>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={closeModal}>
          {activeForm === 'uncontrolled' && (
            <UncontrolledForm onClose={closeModal} />
          )}
          {activeForm === 'hook' && <ReactHookForm onClose={closeModal} />}
        </Modal>
        <MainDataList />
      </main>
    </div>
  );
}
