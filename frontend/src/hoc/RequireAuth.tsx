import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { checkAuth } from '../store/redux/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

export const RequireAuth = () => {
  const { isAuth } = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // triggers when entering/reloading the website; if user logs out, this dispatch will not be executed
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return isAuth ? <Outlet /> : <Navigate to="/?expSession=true" />;
};
