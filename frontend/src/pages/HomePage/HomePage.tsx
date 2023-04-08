import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  SignUpForm,
  Layout,
  Modal,
  Button,
  BUTTON_TYPES,
  Typewriter,
} from '../../components';
import { AuthModalContext } from '../../store/context/AuthModalContext';

export const HomePage = () => {
  const [params] = useSearchParams();
  const { isSignUpModalOpen, openAuthModal, closeAuthModal } =
    useContext(AuthModalContext);

  useEffect(() => {
    if (params.get('expSession')) {
      openAuthModal('login');
    }
  }, []);

  return (
    <Layout>
      <div className="overlay">
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl mb-8 h-10 sm:whitespace-nowrap">
            <Typewriter
              sentences={[
                'First sentence',
                'Second sentence',
                'Third sentence',
              ]}
            />
          </h1>

          <Button
            btnType={BUTTON_TYPES.PRIMARY}
            onClick={() => openAuthModal('signup')}
          >
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
