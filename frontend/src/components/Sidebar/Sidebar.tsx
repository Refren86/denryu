import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/redux/slices/auth.slice';
import { ReactComponent as LogoIcon } from '../../assets/svgs/logo.svg';
import { ReactComponent as CaretRight } from '../../assets/svgs/caret-right.svg';
import { ReactComponent as UserIcon } from '../../assets/svgs/user.svg';
import { ReactComponent as FriendsIcon } from '../../assets/svgs/friends.svg';
import { ReactComponent as SettingsIcon } from '../../assets/svgs/settings.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svgs/logout.svg';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(true);

  const menus = [
    {
      title: 'My Page',
      icon: <UserIcon className="min-w-[24px] w-[24px]" />,
      path: '/profile',
    },
    {
      title: 'Friends',
      icon: <FriendsIcon className="min-w-[24px] w-[24px]" />,
      path: '/friends',
    },
    {
      title: 'Setting',
      icon: <SettingsIcon className="min-w-[24px] w-[24px]" />,
      path: '/settings',
    },
    {
      title: 'Logout',
      icon: <LogoutIcon className="min-w-[24px] w-[24px]" />,
      onClick: () => dispatch(logout()),
    },
  ];

  return (
    <div
      className={`${
        open ? 'w-72' : 'w-16'
      } bg-light-blue h-screen px-3 pt-8 relative duration-300`}
    >
      <CaretRight
        onClick={() => setOpen(!open)}
        className={`absolute h-6 w-6 p-1 cursor-pointer -right-3 top-9 bg-purple rounded-full text-pale-lavender ${
          open && 'rotate-180'
        }`}
      />

      <div className="flex gap-x-4 items-center">
        <LogoIcon
          className={`cursor-pointer min-w-[40px] duration-500 ${
            open && 'rotate-[360deg]'
          }`}
          width={40}
          height={40}
        />
        <h3
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && 'scale-0'
          }`}
        >
          Denryu
        </h3>
      </div>
      <ul className="pt-6">
        {menus.map((menu, index) => (
          <button
            key={index}
            onClick={menu.onClick}
            className={`flex rounded-md p-2 w-full hover:bg-light-white text-white text-sm items-center gap-x-4 
              mt-3 hover:bg-lilac transition-colors duration-200 ${
                menu?.path &&
                location.pathname.includes(menu.path) &&
                'bg-lilac'
              }`}
          >
            {menu.icon}
            <span
              className={`${
                !open && 'scale-0'
              } origin-left duration-200 whitespace-nowrap`}
            >
              {menu.title}
            </span>
          </button>
        ))}
      </ul>
    </div>
  );
};
