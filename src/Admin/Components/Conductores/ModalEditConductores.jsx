import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import {  useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { ActualizarConductor } from "../../Api";

const schema = yup.object({
  rut: yup.string()
    .required('El rut es requerido')
    .min(3,'El rut debe tener al menos 3 caracteres')
    .max(50,'El rut debe tener máximo 50 caracteres'),
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),
  numeroTelefono: yup.number().required('Numero de telefono requerido').integer().positive()
  .min(100000000,'El numero de telefono debe tener al menos 9 caracteres')
  .max(999999999,'El numero de telefono debe tener máximo 9 caracteres')
    .typeError('El numero de telefono debe ser un número entero'),
  tipoLicencia: yup.string().required('Tipo de licencia requerida').min(1,'El tipo de licencia debe tener al menos 1 caracteres')
  .max(2,'El tipo de licencia debe tener máximo 2 caracteres'),
});

const ModalEditConductores = ({onClose,showModal,conductoresObject}) => {
  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors }, getValues,reset,setValue} = useForm({
    resolver: yupResolver(schema),
  });


  const handleSubmitForm = async (formData) => {
    try {
      const conductoresForm = {
        access_token: user.access_token,
        conductorId: conductoresObject.CONDUCTOR_ID,
        rut: formData.rut,
        nombre: formData.nombre,
        numeroTelefono: formData.numeroTelefono,
        tipoLicencia: formData.tipoLicencia,
        fechaVencimientoLicencia: dateToday.startDate,
        fechaIngreso: dateTodayInicio.startDate
      }

      await ActualizarConductor(conductoresForm);
      
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Actualizar conductor',
        text: 'El conductor se ha actualizado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el conductor',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }


  const [dateToday, setDateToday] = useState({
    startDate: null,
    endDate: null
  });
  const [dateTodayInicio, setDateTodayInicio] = useState({
    startDate: null,
    endDate: null
  });
  const handleValueChangeInicio = newDateSelected => {
    setDateTodayInicio(newDateSelected);
  };
  const handleValueChange = newDateSelected => {
    setDateToday(newDateSelected);
  };
  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 20);

  useEffect(() => {
    if(conductoresObject){
      const convertirFecha = (fecha) => {
        const partes = fecha.split('-');
        const fechaConvertida = new Date(Date.UTC(partes[2], partes[1] - 1, partes[0]));
        return fechaConvertida;
      };
      
  
      const fechaExpiracionLicencia = convertirFecha(conductoresObject.FECHA_EXPIRACION_LICENCIA);
      const fechaInicioServicios = convertirFecha(conductoresObject.FECHA_INICIO_SERVICIOS);
      setDateToday({
        startDate: fechaExpiracionLicencia,
        endDate: fechaExpiracionLicencia
      });
  
      setDateTodayInicio({
        startDate: fechaInicioServicios,
        endDate: fechaInicioServicios
      });
  
      setValue('rut',conductoresObject.RUT)
      setValue('nombre',conductoresObject.NOMBRE_COMPLETO)
      setValue('numeroTelefono',conductoresObject.TELEFONO)
      setValue('tipoLicencia',conductoresObject.TIPO_LICENCIA)

    }
  }, [setValue,conductoresObject,setDateToday, setDateTodayInicio])
  


  return (
    <Dialog open={showModal}  aria-labelledby="modalCrearTraslado" size="md"
    className="max-w-full max-h-screen py-2 "
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
      <Typography variant="h4">
      Actualizar conductor
        </Typography>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={ () => {
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
        <Typography variant="h6">
          Información del servicio
        </Typography>
        <div className="grid grid-cols-2  gap-6 mt-6 ">
        <div className="relative">
              <Input type="text" name="rut" color="blue" label="RUT" size="md"
                { ...register("rut") }
                error={Boolean(errors.rut)}
                success={Boolean(!errors.rut  && getValues('rut')) }
              />
              {errors.rut && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.rut.message}
                </div>
              )}
            </div>
            <div className="relative">
              <Input type="text" name="nombre" color="blue" label="Nombre completo" size="md"
                { ...register("nombre") }
                error={Boolean(errors.nombre)}
                success={Boolean(!errors.nombre  && getValues('nombre')) }
              />
              {errors.nombre && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.nombre.message}
                </div>
              )}
            </div>
            <div className="relative w-full">
                <Input type="number" name="numeroTelefono" color="blue" label="Numero telefono" size="md"
                  { ...register("numeroTelefono") }
                  error={Boolean(errors.numeroTelefono)}
                  success={Boolean (!errors.numeroTelefono  && getValues('numeroTelefono')) }
                />
                {errors.numeroTelefono && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.numeroTelefono.message}
                  </div>
                )}
            </div>
            <div className="relative w-full ">
              <Input type="texto" name="tipoLicencia" color="blue" label="Tipo de Licencia" size="md"
                { ...register("tipoLicencia") }
                error={Boolean(errors.tipoLicencia)}
                success={Boolean(!errors.tipoLicencia  && getValues('tipoLicencia')) }
              />
              {errors.tipoLicencia && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.tipoLicencia.message}
                </div>
              )}
            </div>
            <div className="flex justify-center items-center gap-4">
              <Datepicker
                i18n="es"
                startWeekOn="mon"
                primaryColor="blue"
                useRange={false} 
                asSingle={true} 
                value={dateToday} 
                onChange={handleValueChange} 
                minDate={today}
                maxDate={oneYearLater}
                placeholder="Fecha vencimiento de licencia"
                className="cursor-pointer outline-none border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex justify-center items-center gap-4">
            <Datepicker
              i18n={"es"}
              startWeekOn="mon"
              primaryColor={"blue"}
              useRange={false} 
              asSingle={true} 
              value={dateTodayInicio} 
              onChange={handleValueChangeInicio} 
              minDate={today}
              placeholder={"Fecha de Ingreso"} 
              className="bg-white w-full" 
              
            />
            </div>

        </div>


      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
      <button
            onClick={ () => {
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
        Guardar cambios
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalEditConductores.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  conductoresObject: PropTypes.object.isRequired
}

export default ModalEditConductores;
