import { createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ChildrenType } from '../../types/Common';

export type AuthModalContextType = {
  isSignUpModalOpen: boolean;
  isLogInModalOpen: boolean;
  openAuthModal: (type: 'login' | 'signup') => void;
  closeAuthModal: (type: 'login' | 'signup') => void;
  handleLogInModalSwitch: () => void;
  handleSignUpModalSwitch: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType>({
  isSignUpModalOpen: false,
  isLogInModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  handleLogInModalSwitch: () => {},
  handleSignUpModalSwitch: () => {},
});

const AuthModalContextProvider = ({ children }: ChildrenType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLogInModalOpen, setLogInModalOpen] = useState(false);

  const openAuthModal = (type: 'login' | 'signup') => {
    type === 'login' ? setLogInModalOpen(true) : setSignUpModalOpen(true);
  };

  const closeAuthModal = (type: 'login' | 'signup') => {
    type === 'login' ? setLogInModalOpen(false) : setSignUpModalOpen(false);

    if (searchParams.has('expSession')) {
      searchParams.delete('expSession');
      setSearchParams(searchParams);
    }
  };

  const handleLogInModalSwitch = () => {
    closeAuthModal('signup');
    openAuthModal('login');
  };

  const handleSignUpModalSwitch = () => {
    closeAuthModal('login');
    openAuthModal('signup');
  };

  const value = {
    isSignUpModalOpen,
    isLogInModalOpen,
    openAuthModal,
    closeAuthModal,
    handleLogInModalSwitch,
    handleSignUpModalSwitch,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContextProvider;
