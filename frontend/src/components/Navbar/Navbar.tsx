import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Modal } from '..';
import { LogInForm } from '../LogInForm/LogInForm';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import DenryuLogo from '../../assets/svgs/logo.svg';

export const Navbar = () => {
  const { isLogInModalOpen, openAuthModal, closeAuthModal } = useContext(AuthModalContext);

  return (
    <nav className="shadow-sm relative">
      <div className="flex items-center justify-between absolute h-12 px-5 w-full mt-3">
        <Link to="/">
          <img src={DenryuLogo} width={64} height={64} />
        </Link>

        <div className="flex gap-2">
          <button className="primary-button" onClick={() => openAuthModal('login')}>
            Log In
          </button>
        </div>
      </div>

      <Modal open={isLogInModalOpen} onClose={() => closeAuthModal('login')}>
        <h3 className="w-full pb-4 text-3xl">Log In</h3>
        <LogInForm />
      </Modal>
    </nav>
  );
};
