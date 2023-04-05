import { FC } from 'react';

import { Navbar } from '../Navbar/Navbar';
import { classNames } from '../../helpers/common';
import { useAppSelector } from '../../hooks/redux';

export const Layout: FC<TChildrenType> = ({ children }) => {
  const { isAuth } = useAppSelector(({ auth }) => auth);

  return (
    <div className={classNames(`flex ${isAuth ? 'flex-row' : 'flex-col'}`)}>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>
    </div>
  );
};
