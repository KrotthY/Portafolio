
import { Link, NavLink } from 'react-router-dom'
import { IconoTurismoReal } from '../../../Assets'
import { useState } from 'react'


const Navbar = () => {

  const [ activeLink, setActiveLink  ] = useState('Inicio')


  return (
    <>
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="flex flex-col">
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500"></div>
          <nav className="flex justify-around py-4  bg-white/80 backdrop-blur-xl shadow-lg w-full fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center">
              <Link to="/" className="cursor-pointer"
              
              onClick={() => setActiveLink('Inicio')}
              >
                <h3 className="text-2xl font-medium text-blue-500">
                  <img className="h-16 object-cover" src={ IconoTurismoReal } alt="Logo Real"/>
                </h3>
              </Link>
            </div>
            <div className="items-center hidden space-x-8 lg:flex">
            <NavLink 
              to="/departamentos"
              className={`flex hover:text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600 ${activeLink === 'Inicio' ? 'border-b-4 border-blue-600' : ''}`}
              onClick={() => setActiveLink('Inicio')}
            >
                Inicio
              </NavLink>
              <NavLink 
                to="/tours"
                className={`flex hover:text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600 ${activeLink === 'Tours' ? 'border-b-4 border-blue-600' : ''}`}
                onClick={() => setActiveLink('Tours')}
              >
                Tours
              </NavLink>
            </div>
            <div className="flex items-center space-x-5">
                <NavLink 
                  to="/inicio-sesion"
                  onClick={() => setActiveLink('')}
                  className="flex justify-between items-center cursor-pointer rounded-full font-semibold border border-blue-600/5 bg-blue-600/5 p-3 text-blue-600 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                  <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="#2196f3" height="1em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                  Inicia sesión 
                </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar