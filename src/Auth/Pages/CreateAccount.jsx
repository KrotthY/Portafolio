import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { logoTurismoReal } from "../../Assets"
import {  NavLink, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';

const BASE_CREATE_USER = 'https://fastapi-gv342xsbja-tl.a.run.app/crear_cliente';

const schema = yup.object({
  firstName: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres').max(20, 'El nombre debe tener como máximo 20 caracteres'),
  lastName: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener al menos 3 caracteres').max(20, 'El apellido debe tener como máximo 20 caracteres'),
  username: yup.string().required('El usuario es obligatorio').min(3, 'El usuario debe tener al menos 3 caracteres').max(20, 'El usuario debe tener como máximo 20 caracteres'),
  email: yup.string().email('El correo no es válido').required('El correo es obligatorio').min(8, 'El correo debe tener al menos 8 caracteres').max(50, 'El correo debe tener como máximo 50 caracteres'),
  password: yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres').max(20, 'La contraseña debe tener como máximo 20 caracteres')
});

const CreateAccount = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const MySwal = withReactContent(Swal)

  const handleFormSubmit  = async (formData) => {
    try {
      MySwal.fire({
        title: <p>Creando Usuario</p>,
        didOpen: () => {
          MySwal.showLoading()
        },
      })

      const bodyJSOB = {
        "name": formData.firstName,
        "last_name":formData.lastName ,
        "username": formData.username,
        "rut":"",
        "email": formData.email,
        "password": formData.password,
      }

      const queryString = new URLSearchParams(bodyJSOB).toString();
      const urlWithParams = `${BASE_CREATE_USER}?${queryString}`;
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(urlWithParams,requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error desconocido');
      }

      MySwal.close()
      MySwal.fire({
        icon: 'success',
        title: 'Usuario Creado',
        text: 'Usuario creado con exito',
      })

      navigate('/inicio-sesion');

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
      
    <div className="w-3/5  flex items-center justify-center  select-none">
      <div className="bg-white p-4 sm:p-10 py-6 sm:py-20 rounded-3xl border-1 border-white shadow-lg w-full sm:w-3/4">
        <div className="flex flex-col items-center justify-center">
          <img className="w-24 h-24 rounded-full shadow-md" src={ logoTurismoReal } alt="Avatar" />
          <h1 className="text-4xl font-semibold py-10 text-gray-900">Portal de Turismo Real</h1>
          <p className="font-medium text-2xl text-gray-500 mt-4">Crear Cuenta</p>
        </div>

        <form onSubmit={ handleSubmit(handleFormSubmit ) }>
        <div className="mt-8">
          <div className="flex justify-around  items-center">
            <div className="py-2 w-full mr-1">
              <label className="text-lg font-medium">Nombre</label>
              <input className="w-full border rounded-xl p-4 mt-1"
                type="text" 
                name="firstName" 
                { ...register("firstName")} 
                placeholder="Ingresa tu nombre"
                autoComplete='firstName'
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="py-2 w-full ml-1">
                <label className="text-lg font-medium">Apellido</label>
                <input className="w-full border rounded-xl p-4 mt-1" 
                  type="text" name="lastName" 
                  { ...register("lastName") }   
                  placeholder="Ingresa tu apellido" 
                  autoComplete='lastName'
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
            

          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Usuario</label>
            <input className="w-full border rounded-xl p-4 mt-1" 
              type="text" name="username" 
              { ...register("username") }  
              placeholder="Ingresa tu usuario"
              autoComplete='username'
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Correo electrónico</label>
            <input className="w-full border rounded-xl p-4 mt-1" 
              type="text" name="email" 
              {...register("email")}  
              autoComplete='email'
              placeholder="Ingresa tu Correo electrónico"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Contraseña</label>
            <input type="password" className="w-full border rounded-xl p-4 mt-1" 
              name="password" 
              { ...register("password") } 
              placeholder="Ingresa tu Contraseña" 
              autoComplete='current-password'
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

        </div>
        <div className="mt-4">
            <button type="submit" 
              className=" w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

            >
              ¡ Registrate !
            </button>
        </div>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <NavLink 
            to={ PublicRoutes.HOME}
            className="font-semibold text-base text-gray-900 hover:text-blue-700"
          >
            Volver al Inicio
          </NavLink>
          </div>
        <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 Turismo Real</p>
      </div>
    </div>
    </div>
    
    </>
  )
}


export default CreateAccount