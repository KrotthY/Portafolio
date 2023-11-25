import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { actualizarServicios } from "../../Api";


const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),
  active: yup.boolean().required(),
});



const ModalEditServicios = ({onClose,showModal,servicioId}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (formData) => {
    try {
      const actualizarInventario = {
        access_token: user.access_token,
        nombre: formData.nombre,
        servicioId:servicioId,
      }
      await actualizarServicios(actualizarInventario);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Servicios actualizados con éxito',
        text: 'El servicio se ha actualizado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el servicio',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }


  const URL_API_GET_SERVICES_ID = `https://fastapi-gv342xsbja-tl.a.run.app/servicios/${servicioId}`;

  const [serviciosIdSelected, setServiciosId] = useState(null);
  useEffect(() => {
    if(servicioId){
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      };
      
      fetch(URL_API_GET_SERVICES_ID, requestOptions)
      .then(response => response.json())
      .then(data => {
        setServiciosId(data);
      })
      .catch(error => console.log(error));
    }
  }, [user.access_token,servicioId, URL_API_GET_SERVICES_ID])

  useEffect(() => {
    
    if(serviciosIdSelected){
      setValue('nombre', serviciosIdSelected?.NOMBRE);
      setValue('active', serviciosIdSelected?.ACTIVE === "S" ? true : false);
    }
  }, [serviciosIdSelected,setValue])


  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="md"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Editar servicio 
          
          {serviciosIdSelected && (
            <span className="text-xl text-gray-800 font-normal"> - {serviciosIdSelected?.NOMBRE}</span>
          )}
        </span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={ () => {
          reset(); 
          onClose();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
      <DialogBody>
        <Typography>
          <h6 className="text-gray-500 text-sm font-bold">Información del servicios</h6>
        </Typography>
        <div className="grid grid-cols-2  gap-6  my-12 ">
            <div className="relative">
              <Input type="text" name="nombre" color="blue" label="Nombre" size="md"
                { ...register("nombre") }
                error={Boolean(errors.nombre)}
                success={!errors.nombre  && getValues('nombre') }
                max={50} min={3}
              />
              {errors.nombre && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.nombre.message}
                </div>
              )}
            </div>

              
        </div>

      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
      <button
            onClick={ () => {
              reset(); 
              onClose();
            }}
          type="button"
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>

        <button
        type="submit"
        className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
        Actualizar servicio
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalEditServicios.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  servicioId: PropTypes.number,
}

export default ModalEditServicios;
