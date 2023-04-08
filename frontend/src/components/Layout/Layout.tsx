import { FC } from 'react';

import { Navbar } from '../Navbar/Navbar';
import { classNames } from '../../helpers/common';
import { useAppSelector } from '../../hooks/redux';
import { Sidebar } from '../Sidebar/Sidebar';

export const Layout: FC<TChildrenType> = ({ children }) => {
  const { isAuth } = useAppSelector(({ auth }) => auth);

  return (
    <div className={classNames(`${isAuth ? 'grid grid-cols-[auto_1fr]' : ''}`)}>
      {isAuth ? <Sidebar/> : <Navbar />}

      <main>{children}</main>
    </div>
  );
};
