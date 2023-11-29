import { useState, useEffect, useRef } from 'react';
import { logoTurismoReal } from '../../Assets';
import useSession from '../Context/UseSession';
import { NavLink } from 'react-router-dom';
import { PublicRoutes } from '../../Router';

function ProfileMenu() {
  const { logout } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <img
        alt="tania andrew"
        src={ logoTurismoReal }
        className="relative inline-block h-12 w-12 cursor-pointer rounded-full object-cover object-center"
        onClick={toggleMenu}
      />
      {menuOpen && (
        <ul
          role="menu"
          className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >

        <button
          tabIndex="-1"
          role="menuitem"
          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <NavLink 
          to={ PublicRoutes.PERFIL_CLIENTE }
          className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
            Mi Perfil
          </NavLink>
        </button>

        <hr className="my-2 border-blue-gray-50" tabIndex="-1" role="menuitem" />
        <button
          tabIndex="-1"
          role="menuitem"
          onClick={logout}
          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            ></path>
          </svg>
          <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
            Cerrar Sesión
          </p>
        </button>
      
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
