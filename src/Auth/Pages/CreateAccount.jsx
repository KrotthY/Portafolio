import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { logoTurismoReal } from "../../Assets"
import {  NavLink, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../Router';
import { Input } from '@material-tailwind/react';

const BASE_CREATE_USER = 'https://fastapi-gv342xsbja-tl.a.run.app/crear_cliente';

const schema = yup.object({
  firstName: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres').max(20, 'El nombre debe tener como máximo 20 caracteres'),
  lastName: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener al menos 3 caracteres').max(20, 'El apellido debe tener como máximo 20 caracteres'),
  username: yup.string().required('El usuario es obligatorio').min(3, 'El usuario debe tener al menos 3 caracteres').max(20, 'El usuario debe tener como máximo 20 caracteres'),
  email: yup.string().email('El correo no es válido').required('El correo es obligatorio').min(8, 'El correo debe tener al menos 8 caracteres').max(50, 'El correo debe tener como máximo 50 caracteres'),
  password: yup.string().required('La contraseña es obligatoria').min(8, 'La contraseña debe tener al menos 8 caracteres').max(20, 'La contraseña debe tener como máximo 20 caracteres'),
  rut: yup.string()
  .required('El RUT es requerido')
  .matches(/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/, 'Debe ser un RUT válido con puntos y guión')
  . min(12, 'El RUT debe tener al menos 12 caracteres').max(12, 'El RUT debe tener un máximo de 12 caracteres'),
  phone:yup.number().required('El teléfono es obligatorio').min(100000000, 'El teléfono debe tener al menos 9 caracteres').max(999999999, 'El teléfono debe tener como máximo 9 caracteres').typeError('El teléfono debe ser un número'),
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
        "rut":formData.rut,
        "email": formData.email,
        "phone":formData.phone,
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
<div className="flex flex-col lg:flex-row min-h-screen justify-center bg-gray-200">
  <div className="w-full lg:w-3/5 flex items-center justify-center select-none px-4 lg:px-0">
    <div className="bg-white p-4 sm:p-10 py-6 sm:py-20 rounded-3xl border-1 border-white shadow-lg w-full sm:w-3/4 max-w-2xl">
        <div className="flex flex-col items-center justify-center">
          <img className="w-24 h-24 rounded-full shadow-md" src={ logoTurismoReal } alt="Avatar" />
          <h1 className="text-4xl font-semibold py-10 text-gray-900">Portal de Turismo Real</h1>
          <p className="font-medium text-2xl text-gray-500 mt-4">Crear Cuenta</p>
        </div>

        <form onSubmit={ handleSubmit(handleFormSubmit ) }>
        <div className="mt-8 space-y-4">
          <div className="flex justify-around  items-center">
            <div className="py-2 w-full mr-1">
              <Input color='blue' label='RUT' size='lg' 
                type="text" name="rut" 
                { ...register("rut") }  
                autoComplete='rut'
              />
              {errors.rut && <p className="text-xs text-red-500">{errors.rut.message}</p>}
            </div>
            <div className="py-2 w-full mr-1">
              
              <Input color='blue' size='lg' label="Usuario"  
                type="text" name="username" 
                { ...register("username") }  
                autoComplete='username'
              />
              {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
            </div>
          </div>
          <div className="flex justify-around  items-center">
            <div className="py-2 w-full mr-1">
              <Input color='blue' size="lg" label="Nombre"
                type="text" 
                name="firstName" 
                { ...register("firstName")} 
                autoComplete='firstName'
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="py-2 w-full ml-1">
                
                <Input color='blue' label='Apellido' size='lg' 
                  type="text" name="lastName" 
                  { ...register("lastName") }   
                  autoComplete='lastName'
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
            

          </div>
          <div className="flex justify-around  items-center">
            <div className="py-2 w-full ml-1">
              <Input color='blue' size='lg' label="Teléfono" min={0}
                type="number" name="phone" 
                {...register("phone")}  
                autoComplete='phone'
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="py-2 w-full ml-1">
              <Input color='blue' size='lg' label="Correo electrónico"
                type="text" name="email" 
                {...register("email")}  
                autoComplete='email'
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="py-2">
            <Input color='blue' type="password" size='lg' label='Contraseña'
              name="password" 
              { ...register("password") } 
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