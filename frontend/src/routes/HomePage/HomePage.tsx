import { useContext } from 'react';

import { SignUpForm, Layout } from '../../components';
import { Modal } from '../../components/ui';
import { AuthModalContext } from '../../store/context/AuthModalContext';

export const HomePage = () => {
  const { isSignUpModalOpen, openSignUpModal, closeSignUpModal } = useContext(AuthModalContext);
  
  return (
    <Layout>
      <div className="overlay">
        <div className="absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] text-center">
          <h1 className="text-white text-4xl mb-4">
            More than just a messanger
          </h1>

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
