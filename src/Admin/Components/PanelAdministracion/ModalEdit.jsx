import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import { ActualizarDpto } from "../../Api/Departamento/actualizarDpto";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import formatNumberWithDollar from "../../Assets/js/formatNumberDollar";

const schema = yup.object({
  nombre: yup.string().required('Nombre requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  numeroDireccion: yup.number().required('Número requerido').min(3, 'Mín. 3 dígitos').max(9999999, 'Máx. dígitos').positive('Debe ser positivo').integer('Debe ser entero').typeError('Debe ser un número'),
  region: yup.string(),
  comuna: yup.string(),
  tipo: yup.string().required('Tipo requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  tarifa: yup.string()
  .required('La tarifa es requerido')
  .matches(/^\$\d{1,3}(\.\d{3})*$/, 'Formato de tarifa inválido')
  .test('is-valid-number', 'La tarifa debe ser un número válido', value => {
    const number = parseFloat(value.replace(/[^\d]/g, ''));
    return !isNaN(number) && number > 0 && number <= 999999999;
  }),
  direccion: yup.string().required('direccion requerida').min(2, 'Mín. 3 letras').max(100, 'Máx. 100 letras'),
  descripcion: yup.string().required('Descripción requerida').min(10, 'Mín. 10 letras').max(250, 'Máx. 250 letras'),
  banos: yup.number().required('Baños requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10').typeError('Debe ser un número'),
  habitaciones: yup.number().required('Habitaciones requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10').typeError('Debe ser un número'),
  camas: yup.number().required('Camas requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20').typeError('Debe ser un número'),
  huespedes: yup.number().required('Huéspedes requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20').typeError('Debe ser un número'),
});



const ModalEdit = ({onClose,showModal,deptoId}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });


  const handleSubmitForm = async (formData) => {
    try {
      const actualizarDepartamento = {
        access_token: user.access_token,
        deptoId: deptoId,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        banos: formData.banos,
        habitaciones: formData.habitaciones,
        camas: formData.camas,
        tarifa: parseInt(formData.tarifa.replace(/\$|\.|,/g, '')),
        huespedes: formData.huespedes,
      }
      await ActualizarDpto(actualizarDepartamento);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: '¡Departamento actualizado!',
        text: 'El departamento se ha actualizado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar departamento',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const URL_API_GET_DEPARTMENTS_ID = `https://fastapi-gv342xsbja-tl.a.run.app/departamentos/${deptoId}`;
  const [deparmentsId, setDeparmentsId] = useState(null);

  useEffect(() => {
    if(deptoId){
      const requestOptions = {
        method: 'GET',
      };
      
      fetch(URL_API_GET_DEPARTMENTS_ID, requestOptions)
      .then(response => response.json())
      .then(data => {
        setDeparmentsId(data);
      })
      .catch(error => console.log(error));
    }
  }, [deptoId, URL_API_GET_DEPARTMENTS_ID])

  useEffect(() => {
    if(deparmentsId){
      setValue('nombre', deparmentsId?.NOMBRE);
      setValue('numero', deparmentsId?.NUMERO);
      setValue('region', deparmentsId?.NOMBRE_REGION);
      setValue('tarifa', formatNumberWithDollar(deparmentsId?.TARIFA_DIARIA));
      setValue('comuna', deparmentsId?.NOMBRE_COMUNA);
      setValue('direccion', deparmentsId?.DIRECCION);
      setValue('descripcion', deparmentsId?.DESCRIPCION);
      setValue('banos', deparmentsId?.BANOS);
      setValue('habitaciones', deparmentsId?.DORMITORIOS);
      setValue('camas', deparmentsId?.CAMAS);
      setValue('huespedes', deparmentsId?.MAX_HUESPEDES);
      setValue('tipo', deparmentsId?.TIPO);
    }
  }, [deparmentsId,setValue])

  console.log(deparmentsId)

  const handleFormatNumber = (e) => {
    console.log(e.target.value)
    const formatValue = formatNumberWithDollar(e.target.value);
    setValue('tarifa', formatValue);
  }

  return (
    <Dialog open={showModal}  aria-labelledby="modalActualizar" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Editar Propiedad  <span className="font-normal"> - {deparmentsId?.NOMBRE}</span></span>
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
        <Typography>
          Datos de la propiedad
        </Typography>
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-blue-200">
          <div className="relative">
            <Input type="text" name="nombre" color="blue" label="Nombre" size="md"
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


          <div className="flex  justify-center items-center gap-11">
            <div className="relative bg-gray-100  w-full">
              <Input color="blue" label="Número" name="numero" size="md" 
              { ...register("numero") }
              type="text"
              readOnly
              />
            </div>
            <div className="relative bg-gray-100 w-full">
            <Input color="blue" label="Tipo de Propiedad" size="md"  name="tipo"
            { ...register("tipo") }
            readOnly
            />
            </div>
          </div>
          <div className="relative bg-gray-100">
            <Input color="blue" label="Región" size="md"  name="region"
            { ...register("region") }
            readOnly
            />
          </div>
          <div className="relative">
            <Input color="blue" label="Tarifa Diaria" size="md" name="tarifa"
            { ...register("tarifa") }
            onChange={(e) => handleFormatNumber(e)}
            error={Boolean(errors.tarifa)}
            success={Boolean(!errors.tarifa  && getValues('tarifa')) }
            type="text"
            />
            {errors.tarifa && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.tarifa.message}
              </div>
              )}
          </div>
          <div className="relative bg-gray-100">
            <Input color="blue" label="Comuna" size="md"  name="Comuna"
            { ...register("comuna") }
            readOnly
            />
          </div>
          <div className="relative bg-gray-100">
            <Input color="blue" label="Dirección" size="md"  name="direccion"
            { ...register("direccion") }
            type="text"
            readOnly
            />
          </div>
          <div className="relative">
            <Textarea   color="blue" label="Descripción" size="md" name="descripcion"
            { ...register("descripcion") }
            type="text"
            error={Boolean(errors.descripcion)}
            success={Boolean(!errors.descripcion  && getValues('descripcion')) }
            />
            {errors.descripcion && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.descripcion.message}
              </div>
            )}
          </div>
          <div className="grid w-full grid-cols-1 md:grid-cols-2  gap-4">
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2">
              <img
                src="https://images.pexels.com/photos/2635835/pexels-photo-2635835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="row-span-1  rounded-l-lg w-full h-full" 
                alt="prod1"
              />
              <img
                src="https://images.pexels.com/photos/161124/abbaye-de-senanque-monastery-abbey-notre-dame-de-senanque-161124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="prod2"
                className=" w-full h-full"
              />
              <img
                src="https://media.istockphoto.com/id/1165384568/es/foto/complejo-moderno-de-edificios-residenciales-en-europa.jpg?s=2048x2048&w=is&k=20&c=E9ddfbNLOJw0NKIaKF6180TLCPuC4Se00DoCzf2VwFA="
                alt="prod3"
                className="  rounded-l-lg w-full h-full"
              />
              <img
                src="https://media.istockphoto.com/id/1165384568/es/foto/complejo-moderno-de-edificios-residenciales-en-europa.jpg?s=2048x2048&w=is&k=20&c=E9ddfbNLOJw0NKIaKF6180TLCPuC4Se00DoCzf2VwFA="
                alt="prod4"
                className=" w-full h-full"
              />
            </div>

            <div className="flex justify-center w-full h-full">
              <img
                src="https://images.pexels.com/photos/7129137/pexels-photo-7129137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full  rounded-r-lg"
                alt="prod5"
              />
            </div>
          </div>
        </div>
        <Typography className="mb-6">
          Datos del Departamento
        </Typography>
        <div className="grid grid-cols-4  gap-6">
          <div className="relative">
            <Input color="blue" label="Cantidad de Baños" size="md" 
              { ...register("banos") }
              type="number"
              name="banos"
              error={Boolean(errors.banos)}
              success={Boolean(!errors.banos  && getValues('banos')) }
            />
            {errors.banos && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.banos.message}
              </div>
            )}

          </div>
          <div className="relative">
            <Input name="habitaciones" color="blue" label="Cantidad de Habitaciones" size="md"  
              { ...register("habitaciones") }
              type="number"
              error={Boolean(errors.habitaciones)}
              success={Boolean(!errors.habitaciones  && getValues('habitaciones')) }
            />
            {errors.habitaciones && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.habitaciones.message}
              </div>
            )}
          </div>
          <div className="relative">
            <Input name="camas" color="blue" label="Cantidad de Camas" size="md"  
              { ...register("camas") }
              type="number"
              error={Boolean(errors.camas)}
              success={Boolean(!errors.camas  && getValues('camas')) }
            />
            {errors.camas && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.camas.message}
              </div>
            )}
          </div>
          <div className="relative">
            <Input color="blue" label="Cantidad de Huespedes" size="md" 
              { ...register("huespedes") }
              type="number"
              name="huespedes"
              error={Boolean(errors.huespedes)}
              success={Boolean(!errors.huespedes  && getValues('huespedes')) }
            />
            {errors.huespedes && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.huespedes.message}
              </div>
            )}
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
        Actualizar departamento
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  deptoId: PropTypes.number,
}

export default ModalEdit;
