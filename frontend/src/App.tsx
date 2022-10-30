import { Routes, Route } from 'react-router-dom';

import { Test } from './components/Test/Test';
import { HomePage } from './routes/HomePage/HomePage';
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
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
