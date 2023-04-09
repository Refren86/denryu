import { useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../store/redux/slices/auth.slice';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReactComponent as LogoIcon } from '../../assets/svgs/logo.svg';
import { ReactComponent as CaretRight } from '../../assets/svgs/caret-right.svg';
import { ReactComponent as UserIcon } from '../../assets/svgs/user.svg';
import { ReactComponent as FriendsIcon } from '../../assets/svgs/friends.svg';
import { ReactComponent as SettingsIcon } from '../../assets/svgs/settings.svg';
import { ReactComponent as LogoutIcon } from '../../assets/svgs/logout.svg';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ auth }) => auth);

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useSessionStorage('sidebarOpen', true);

  const menus = [
    {
      title: 'My Page',
      icon: <UserIcon className="min-w-[24px] w-[24px]" />,
      path: '/profile',
      onClick: () => goTo(`/profile/${user?.username}`),
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
      onClick: () => goTo('/settings'),
    },
    {
      title: 'Logout',
      icon: <LogoutIcon className="min-w-[24px] w-[24px]" />,
      onClick: () => dispatch(logout()),
    },
  ];

  function goTo(path: string) {
    navigate(path);
  }

  return (
    <aside
      className={`${
        sidebarOpen ? 'w-72' : 'w-16'
      } bg-black min-h-screen px-3 pt-8 relative duration-300`}
    >
      <CaretRight
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute h-6 w-6 p-1 cursor-pointer -right-3 top-9 bg-white border border-black rounded-full ${
          sidebarOpen && 'rotate-180'
        }`}
      />

      <div className="flex gap-x-4 items-center">
        <LogoIcon
          className={`cursor-pointer min-w-[40px] duration-500 ${
            sidebarOpen && 'rotate-[360deg]'
          }`}
          width={40}
          height={40}
        />
        <h3
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !sidebarOpen && 'scale-0'
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
            className={`flex rounded-md p-2 w-full text-white text-sm items-center gap-x-4 
              mt-3 hover:bg-white hover:text-black transition-colors duration-200 ${
                menu?.path &&
                location.pathname.includes(menu.path) &&
                'bg-white text-black'
              }`}
          >
            {menu.icon}
            <span
              className={`${
                !sidebarOpen && 'scale-0'
              } origin-left duration-200 whitespace-nowrap`}
            >
              {menu.title}
            </span>
          </button>
        ))}
      </ul>
    </aside>
  );
};
