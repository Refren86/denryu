import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export const RequireAuth = () => {
  const { isAuth } = useAppSelector(({ auth }) => auth);

  return isAuth ? <Outlet /> : <Navigate to="/?expSession=true" />;
};
