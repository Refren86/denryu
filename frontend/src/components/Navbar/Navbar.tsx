import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Modal } from '..';
import { LogInForm } from '../LogInForm/LogInForm';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import DenryuLogo from '../../assets/svgs/logo.svg';

export const Navbar = () => {
  const { isLogInModalOpen, openAuthModal, closeAuthModal } =
    useContext(AuthModalContext);

  return (
    <header>
      <nav className="relative">
        <div className="flex items-center justify-between absolute p-5 w-full">
          <Link to="/">
            <img src={DenryuLogo} width={64} height={64} />
          </Link>

          <Button onClick={() => openAuthModal('login')}>Log In</Button>
        </div>

        <Modal open={isLogInModalOpen} onClose={() => closeAuthModal('login')}>
          <h3 className="w-full pb-4 text-3xl">Log In</h3>
          <LogInForm />
        </Modal>
      </nav>
    </header>
  );
};
