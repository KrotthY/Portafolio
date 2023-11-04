
import { NavLink ,useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu'; 
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useSession from '../Context/UseSession';

const AuthenticationControl = ({ user }) => {
  const {logout} = useSession();
  const navigate = useNavigate ();
  const isClientLoggedIn = user && user.role === 'cliente' && !!user.access_token;

  useEffect(() => {
    // Si el usuario está autenticado pero no es un cliente, desloguearlo y redirigirlo
    if (user && user.role !== 'cliente') {
      logout();
      navigate('/inicio-sesion');
    }
  }, [user, logout, navigate]);

  if (isClientLoggedIn && user.role === 'cliente') {
    return <UserMenu />;
  } else {
    return (
      <div className="flex items-center gap-4">
        <NavLink 
          to="/inicio-sesion"
          className="flex justify-between items-center cursor-pointer rounded-full font-semibold border border-blue-600/5 bg-blue-600/5 p-3 text-blue-600 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
        >
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="#2196f3" height="1em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
          Inicia sesión 
        </NavLink>
      
        <NavLink 
          to="/crear-cuenta"
          className="flex justify-between items-center cursor-pointer rounded-full font-semibold border border-orange-600/5 bg-orange-600/5 p-3 text-orange-600 transition-colors hover:border-orange-500/10 hover:bg-orange-500/10 hover:!opacity-100 group-hover:opacity-70"
        >
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="#d97706" height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
          Registrate
        </NavLink>
      </div>
    );
  }
}

AuthenticationControl.propTypes = {
  user: PropTypes.shape({
    access_token: PropTypes.string,
    role: PropTypes.string,
  }),
}


export default AuthenticationControl;
