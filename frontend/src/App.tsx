import { Routes, Route } from 'react-router-dom';

import { Test } from './components/Test/Test';
import { HomePage } from './pages/HomePage/HomePage';
import { RequireAuth } from './hoc/RequireAuth';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import AuthModalContextProvider from './store/context/AuthModalContext';

const App = () => {
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
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
