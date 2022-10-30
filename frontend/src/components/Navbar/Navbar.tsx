import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Modal } from '../ui';
import { LogInForm } from '../LogInForm/LogInForm';
import { AuthModalContext } from '../../store/context/AuthModalContext';

export const Navbar = () => {
  const { isLogInModalOpen, openLogInModal, closeLogInModal } = useContext(AuthModalContext);

  return (
    <nav className="shadow-sm relative">
      <div className="flex items-center justify-between absolute h-12 px-5 w-full mt-3">
        <Link to="/" className="font-bold text-amber-400 text-lg">
          Denryu
        </Link>

        <div className="flex gap-2">
          <button className="primary-button" onClick={openLogInModal}>
            Log In
          </button>
        </div>
      </div>

      <Modal open={isLogInModalOpen} onClose={closeLogInModal}>
        <h3 className="w-full pb-4 text-3xl">Log In</h3>
        <LogInForm />
      </Modal>
    </nav>
  );
};
