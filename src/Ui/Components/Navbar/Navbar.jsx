
import { Link, NavLink } from 'react-router-dom'
import { IconoTurismoReal } from '../../../Assets'
import { useState } from 'react'
import AuthenticationControl from '../../../Auth/Components/AuthenticationControl'
import useSession from '../../../Auth/Context/UseSession'
import { PublicRoutes } from '../../../Router'


const Navbar = () => {
  const {user} = useSession();

  const [ activeLink, setActiveLink  ] = useState('Inicio')


  return (
    <>
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="flex flex-col">
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500"></div>
          <nav className="flex justify-around py-4  bg-white/80 backdrop-blur-xl shadow-lg w-full fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center">
              <Link to={ PublicRoutes.HOME } className="cursor-pointer"
              
              onClick={() => setActiveLink('Inicio')}
              >
                <h3 className="text-2xl font-medium text-blue-500">
                  <img className="h-16 object-cover" src={ IconoTurismoReal } alt="Logo Real"/>
                </h3>
              </Link>
            </div>
            <div className="items-center hidden space-x-8 lg:flex">
            <NavLink 
              to={PublicRoutes.DEPARTAMENTOS}
              className={`flex hover:text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600 ${activeLink === 'Inicio' ? 'border-b-4 border-blue-600' : ''}`}
              onClick={() => setActiveLink('Inicio')}
            >
                Departamentos
              </NavLink>
              <NavLink 
                to={ PublicRoutes.TOURS }
                className={`flex hover:text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600 ${activeLink === 'Tours' ? 'border-b-4 border-blue-600' : ''}`}
                onClick={() => setActiveLink('Tours')}
              >
                Tours
              </NavLink>
            </div>
            <AuthenticationControl user={user}/>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar