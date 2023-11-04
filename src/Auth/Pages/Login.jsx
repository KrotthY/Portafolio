import {  NavLink, useNavigate } from "react-router-dom"
import { carousel1, logoTurismoReal } from "../../Assets"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import useSession from "../Context/UseSession";
import getRoleSpecificRoute from "../Context/getRoleSpecificRoute";

const BASE_LOGIN_USER = 'https://fastapi-gv342xsbja-tl.a.run.app/token';

const schema = yup.object({
  username: yup.string().required('El usuario es obligatorio').min(3, 'El usuario debe tener al menos 3 caracteres').max(20, 'El usuario debe tener como máximo 20 caracteres'),
  password: yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres').max(20, 'La contraseña debe tener como máximo 20 caracteres')
});




export const Login = () => {
  const navigate = useNavigate();
  
  const  { login }  = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const MySwal = withReactContent(Swal)

  const handleFormSubmitLogin = async (formData) => {
    try {
      MySwal.fire({
        title: <p>Iniciando sesion</p>,
        didOpen: () => {
          MySwal.showLoading()
        },
      })

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "");
      urlencoded.append("username", formData.username);
      urlencoded.append("password", formData.password);
      urlencoded.append("scope", "");
      urlencoded.append("client_id", "");
      urlencoded.append("client_secret", "");



      const response = await fetch(BASE_LOGIN_USER, {
        method: 'POST',
        headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlencoded,
      });
    
      if(!response.ok){
        const errorText = await response.json();
        throw new Error(errorText.detail || 'Error desconocido');
      }

      const { access_token } = await response.json();
      const role = 'admin';
      login({ access_token, role });
      const route = getRoleSpecificRoute(role);
      navigate(route, { replace: true });
      
      MySwal.close()
      MySwal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: '¡Iniciaste sesion correctamente!',
      })


    }catch(error) { 
      let errorMessage = 'Algo salió mal!';
      if (error.message) {
        errorMessage = error.message;
      }
      setTimeout(() => {
        MySwal.close()
        
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        })
      }, 10);
    }
  }

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
        <form onSubmit={ handleSubmit(handleFormSubmitLogin) }>
        <div className="mt-8">
          <div className="py-2">
            <label className="text-lg font-medium">Usuario</label>
            <input 
              className="w-full border rounded-xl p-4 mt-1" 
              placeholder="Ingresa tu usuario"
              name="username" 
              autoComplete="off"
              { ...register("username") }
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Contraseña</label>
            <input 
              type="password" 
              autoComplete="current-password"
              className="w-full border rounded-xl p-4 mt-1" 
              placeholder="Ingresa tu Contraseña" 
              name="password"
              { ...register("password") }
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

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
            <button type="submit" 
              className=" w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
              Ingresar al Portal
            </button>
        </div>
        </form>

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