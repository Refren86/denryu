import { useContext } from 'react';

import { SignUpForm, Layout } from '../../components';
import { Modal } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AuthModalContext } from '../../store/context/AuthModalContext';
import { logout } from '../../store/redux/slices/auth.slice';
import { getUsers } from '../../store/redux/slices/user.slice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.user);
  const { isSignUpModalOpen, openSignUpModal, closeSignUpModal } =
    useContext(AuthModalContext);
  
  const handleLogout = () => {
    dispatch(logout());
  }

  const getAllUsers = () => {
    dispatch(getUsers());
  }

  console.log('USERS >>>', users);
  
  return (
    <Layout>
      <div className="overlay">
        <div className="absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] text-center">
          <h1 className="text-white text-4xl mb-4">
            More than just a messanger
          </h1>

          {user && (
            <h1 className="text-white text-4xl mb-4">
              {user?.isActivated ? 'Account activated!' : 'Not activated :('}
            </h1>
          )}

          <h1 className="text-white text-4xl mb-4">
            {isAuth ? `User authorized :) ${user?.email}` : 'Unauthorized :('}
          </h1>

          {isAuth && (
            <button className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button className="primary-button" onClick={getAllUsers}>
            Get Users
          </button>

          <button className="secondary-button" onClick={openSignUpModal}>
            Sign Up
          </button>
        </div>

        <Modal open={isSignUpModalOpen} onClose={closeSignUpModal}>
          <h3 className="w-full pb-4 text-3xl">Sign Up</h3>
          <SignUpForm />
        </Modal>
      </div>
    </Layout>
  );
};
