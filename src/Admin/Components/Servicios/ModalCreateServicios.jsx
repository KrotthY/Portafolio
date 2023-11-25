import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { crearServicios } from "../../Api";
import { useEffect, useState } from "react";

const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),
  departamentoId: yup.number().required('El departamento es requerido'),
});


const ModalCreateServicios = ({onClose,showModal}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } ,setValue, getValues,reset} = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (formData) => {
    try {
      const ServicioForm = {
        access_token: user.access_token,
        nombre: formData.nombre,
        departamentoId: formData.departamentoId,
      }
      await crearServicios(ServicioForm);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Crear servicio',
        text: 'El servicio se ha creado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el servicio',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const URL_API_GET_DEPTO_ID = `https://fastapi-gv342xsbja-tl.a.run.app/departamentos`;
  const [deptoIdSelected, setDeptoId] = useState(null);
  useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      };
      
      fetch(URL_API_GET_DEPTO_ID, requestOptions)
      .then(response => response.json())
      .then(data => {
        setDeptoId(data);
      })
      .catch(error => console.log(error));
  }, [user.access_token, URL_API_GET_DEPTO_ID])
  const handleDeptoChange = (selectedValueDepto) => {
    setValue('departamentoId', selectedValueDepto);
  }
  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="md"
    className="max-w-full max-h-screen py-2 "
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Crear nuevo servicio </span>
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
            <div className="w-full">
                  <Select color="blue" 
                    className="text-sm"  
                    label="Departamento disponibles"
                    onChange={(e) => handleDeptoChange(e)}
                    error={Boolean(errors.departamentoId)}
                    success={Boolean(!errors.departamentoId  && getValues('departamentoId'))}
                  >
                  { 
                    deptoIdSelected  ? (
                      deptoIdSelected.map((deptoData) => (
                        <Option  key={deptoData.DEPARTAMENTO_ID} value={String(deptoData.DEPARTAMENTO_ID)}>{deptoData.NOMBRE}</Option>
                      ))
                    ) : (
                      <Option value="0">No hay departamentos disponibles</Option>
                    )
                  }
                  </Select>
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
        Crear nuevo servicio
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreateServicios.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalCreateServicios;
