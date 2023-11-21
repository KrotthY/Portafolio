import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import formatNumberWithDollar from "../../Assets/js/funciones";
import { CreateNewTour } from "../../Api";

const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),
  duracion: yup.number().required('Duración requerida').min(1,'La duración debe ser mayor a 0 Hrs.')
    .max(10,'La duración debe ser menor a 10 Hrs')
    .typeError('La duración debe ser un número entero'),
  descripcion: yup.string().required('Descripción requerida').min(10,'La descripción debe tener al menos 10 caracteres')
    .max(100,'La descripción debe tener máximo 100 caracteres'),
  precio: yup.string()
  .required('El costo es requerido')
  .matches(/^\$\d{1,3}(\.\d{3})*$/, 'Formato de costo inválido')
  .test('is-valid-number', 'El costo debe ser un número válido', value => {
    const number = parseFloat(value.replace(/[^\d]/g, '')); // Eliminar todos los caracteres no numéricos para la validación
    return !isNaN(number) && number > 0 && number <= 999999999;
  }),
  capacidad: yup.number().required('Capacidad requerida').min(1,'La capacidad debe ser mayor a 0 personas').max(100,'La capacidad debe ser menor a 100 personas'),
  hora: yup.string().required('Hora requerida').min(3,'La hora debe tener al menos 3 caracteres').max(5,'La hora debe tener máximo 5 caracteres'),
  active: yup.boolean().required('Estado requerido'),
});


const ModalCreateTour = ({onClose,showModal}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } ,setValue, getValues,reset} = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (formData) => {
    try {
      const tourForm = {
        access_token: user.access_token,
        nombre: formData.nombre,
        duracion: formData.duracion * 60,
        descripcion: formData.descripcion,
        precio: parseInt(formData.precio.replace(/\$|\.|,/g, '')),
        hora: formData.hora,
        capacidad: formData.capacidad,
        startDate: dateToday.startDate,
        endDate: dateToday.endDate,
        active: formData.active ? "S" : "N",
      }
      console.log(tourForm);
      await CreateNewTour(tourForm);
      
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Crear tour',
        text: 'El tour se ha creado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el tour',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }


  const [dateToday, setDateToday] = useState({
    startDate: null,
    endDate: null
  });
  const handleValueChange = newDateSelected => {
    setDateToday(newDateSelected);
  };
  
  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);

  const handleInputChangeCosto = (event) => {
    const formattedValue = formatNumberWithDollar(event.target.value);
    setValue('precio', formattedValue);
  }


  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Crear nuevo servicio turismo </span>
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
        <div className="grid grid-cols-2  gap-6 mt-12  mb-32">
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
            <div className="flex justify-between items-center gap-6">
              <div className="border-2 rounded-md border-gray-300 w-full">
                <Datepicker
                  i18n={"es"}
                  startWeekOn="mon"
                  primaryColor={"blue"}
                  useRange={false} 
                  value={dateToday} 
                  readOnly={true} 
                  onChange={handleValueChange} 
                  minDate={today}
                  maxDate={oneYearLater}
                  placeholder={"Fecha de tour"} 
                  
                />
              </div>
              <div className="relative w-full">
              <Input type="text" name="hora" color="blue" label="Hora" size="md"
                { ...register("hora") }
                error={Boolean(errors.hora)}
                success={!errors.hora  && getValues('hora') }
                max={50} min={3}
              />
              {errors.hora && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.hora.message}
                </div>
              )}
            </div>

            </div>
            <div className="relative">
              <Input type="text" name="precio" color="blue" label="Precio" size="md"
                { ...register("precio") }
                onChange={handleInputChangeCosto}
                error={Boolean(errors.precio)}
                success={!errors.precio  && getValues('precio') }
              />
              {errors.precio && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.precio.message}
                </div>
              )}
            </div>
              
            <div className="flex justify-between items-center gap-6">

              <div className="relative w-full">
                <Input type="number" name="duracion" color="blue" label="Duración" size="md"
                  { ...register("duracion") }
                  error={Boolean(errors.duracion)}
                  success={!errors.duracion  && getValues('duracion') }
                />
                {errors.duracion && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.duracion.message}
                  </div>
                )}
              </div>
              <div className="relative w-full">
              <Input type="number" name="capacidad" color="blue" label="Capacidad" size="md"
                { ...register("capacidad") }
                error={Boolean(errors.capacidad)}
                success={!errors.capacidad  && getValues('capacidad') }
              />
              {errors.capacidad && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.capacidad.message}
                </div>
              )}
              </div>
            </div>

            <div className="relative">
              <Textarea  color="blue" label="Descripción" size="md" name="descripcion"
              { ...register("descripcion") }
              max={250} min={10}
              type="text"
              error={Boolean(errors.descripcion)}
              success={!errors.descripcion  && getValues('descripcion') }
              />
              {errors.descripcion && (
                <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                  {errors.descripcion.message}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center ">
          <span className="flex items-center">
            <Checkbox color="blue" defaultChecked size="sm"
            name="active"
            { ...register("active") }
            error={Boolean(errors.active)}
            success={!errors.active  && getValues('active') }

            />
            Habilitar Tour 
          </span>
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
        Crear nuevo servicio de turismo
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreateTour.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalCreateTour;
