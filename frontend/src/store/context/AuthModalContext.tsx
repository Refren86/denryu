import { createContext, useState } from 'react';

import { ChildrenType } from '../../types/Common';

export type AuthModalContextType = {
  isSignUpModalOpen: boolean;
  isLogInModalOpen: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  openLogInModal: () => void;
  closeLogInModal: () => void;
  handleLogInModalSwitch: () => void;
  handleSignUpModalSwitch: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType>({
  isSignUpModalOpen: false,
  isLogInModalOpen: false,
  openSignUpModal: () => {},
  closeSignUpModal: () => {},
  openLogInModal: () => {},
  closeLogInModal: () => {},
  handleLogInModalSwitch: () => {},
  handleSignUpModalSwitch: () => {},
});

const AuthModalContextProvider = ({ children }: ChildrenType) => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLogInModalOpen, setLogInModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const openLogInModal = () => {
    setLogInModalOpen(true);
  };

  const closeLogInModal = () => {
    setLogInModalOpen(false);
  };

  const handleLogInModalSwitch = () => {
    closeSignUpModal();
    openLogInModal();
  }

  const handleSignUpModalSwitch = () => {
    closeLogInModal();
    openSignUpModal();
  }

  const value = {
    isSignUpModalOpen,
    isLogInModalOpen,
    openSignUpModal,
    closeSignUpModal,
    openLogInModal,
    closeLogInModal,
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
