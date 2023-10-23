import { Link, NavLink } from "react-router-dom"
import { carousel1, logoTurismoReal } from "../../Assets"

export const Login = () => {
  return (
    <>
<div className="flex flex-col lg:flex-row min-h-screen justify-center bg-gray-100">

<div className="w-full lg:w-1/2 flex items-center justify-center  select-none">
  <div className="bg-white p-4 sm:p-10 py-6 sm:py-20 rounded-3xl border-1 border-white shadow-lg w-full sm:w-3/4">
    <div className="flex flex-col items-center justify-center">
      <img className="w-24 h-24 rounded-full shadow-md" src={ logoTurismoReal } alt="Avatar" />
      <h1 className="text-4xl font-semibold py-10 text-gray-900">Portal de Turismo Real</h1>
      <p className="font-medium text-2xl text-gray-500 mt-4">Iniciar sesión</p>
    </div>
    <div className="mt-8">
      <div className="py-2">
        <label className="text-lg font-medium">Correo electrónico</label>
        <input className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu Correo electrónico" />
      </div>
      <div className="py-2">
        <label className="text-lg font-medium">Contraseña</label>
        <input type="password" className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu Contraseña" />
      </div>
      <div className="mt-1">
        <NavLink 
            to="/crear-cuenta"
          className="font-medium text-base text-blue-900 hover:text-blue-400"
        >
          Crear Cuenta
        </NavLink>
        <span className="font-medium text-base text-gray-900"> O </span>
        <NavLink 
          to="/recuperar-contrasena"
          className="font-medium text-base text-gray-900 hover:text-blue-700"
        >
          Olvidaste tu contraseña?
        </NavLink>
      </div>
    </div>
    <div className="mt-4">
      <Link
        to="/" className="cursor-pointer"
      >

        <button type="button" 
          className=" w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
          Ingresar al Portal
        </button>
      </Link>
    </div>
    <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 Turismo Real</p>
  </div>
</div>

<div className="hidden lg:flex h-auto w-full lg:w-1/2 bg-gray-200 select-none">
  <img className="w-full h-full object-cover object-center" src={ carousel1 } alt="Background" />
</div>

</div>

      
    </>
  )
}
