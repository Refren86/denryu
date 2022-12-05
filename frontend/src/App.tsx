import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Test } from './components/Test/Test';
import { useAppDispatch } from './hooks/redux';
import { HomePage } from './pages/HomePage/HomePage';
import { checkAuth } from './store/redux/slices/auth.slice';
import AuthModalContextProvider from './store/context/AuthModalContext';
import { RequireAuth } from './hoc/RequireAuth';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // triggers when entering/reloading the website; if user logs out, this dispatch will not be executed
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])

  return (
    <Routes>
      <Route
        index
        element={
          <AuthModalContextProvider>
            <HomePage />
          </AuthModalContextProvider>
        }
      />

      <Route element={<RequireAuth />}>
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
