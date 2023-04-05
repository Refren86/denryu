import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Modal } from '..';
import { LogInForm } from '../LogInForm/LogInForm';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import { useAppSelector } from '../../hooks/redux';
import DenryuLogo from '../../assets/svgs/logo.svg';
import { Sidebar } from '../Sidebar/Sidebar';

export const Navbar = () => {
  const { isAuth } = useAppSelector(({ auth }) => auth);

  const { isLogInModalOpen, openAuthModal, closeAuthModal } =
    useContext(AuthModalContext);

  return isAuth ? (
    <Sidebar />
  ) : (
    <nav className="shadow-sm relative">
      <div className="flex items-center justify-between absolute h-12 px-5 w-full pt-12">
        <Link to="/">
          <img src={DenryuLogo} width={64} height={64} />
        </Link>

        <div className="flex gap-2">
          <Button onClick={() => openAuthModal('login')}>Log In</Button>
        </div>
      </div>

      <Modal open={isLogInModalOpen} onClose={() => closeAuthModal('login')}>
        <h3 className="w-full pb-4 text-3xl">Log In</h3>
        <LogInForm />
      </Modal>
    </nav>
  );
};
