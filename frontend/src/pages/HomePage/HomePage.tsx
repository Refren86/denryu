import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SignUpForm, Layout, Modal, Button, BUTTON_TYPES } from '../../components';
import { AuthModalContext } from '../../store/context/AuthModalContext';

export const HomePage = () => {
  const [params] = useSearchParams();
  const { isSignUpModalOpen, openAuthModal, closeAuthModal } = useContext(AuthModalContext);

  useEffect(() => {
    if (params.get('expSession')) {
      openAuthModal('login');
    }
  }, [])

  return (
    <Layout>
      <div className="overlay">
        <div className="absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] text-center">
          <h1 className="text-white text-4xl mb-4">
            More than just a messanger
          </h1>

          <Button btnType={BUTTON_TYPES.SECONDARY} onClick={() => openAuthModal('signup')}>
            Sign Up
          </Button>
        </div>

        <Modal
          open={isSignUpModalOpen}
          onClose={() => closeAuthModal('signup')}
        >
          <h3 className="w-full pb-4 text-3xl">Sign Up</h3>
          <SignUpForm />
        </Modal>
      </div>
    </Layout>
  );
};
