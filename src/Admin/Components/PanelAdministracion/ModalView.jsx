import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const schema = yup.object({
  nombre: yup.string().required('Nombre requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  numero: yup.string().required('Número requerido').min(3, 'Mín. 3 dígitos').max(50, 'Máx. 50 dígitos'),
  region: yup.string(),
  comuna: yup.string(),
  tipo: yup.string(),
  tarifa: yup.number().typeError('Tarifa debe ser un número').required('Tarifa requerida').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(999999999, 'Demasiado alto'),
  direccion: yup.string().required('Calle requerida').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  descripcion: yup.string().required('Descripción requerida').min(10, 'Mín. 10 letras').max(250, 'Máx. 250 letras'),
  banos: yup.number().typeError('Baños debe ser un número').required('Baños requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  habitaciones: yup.number().typeError('Habitaciones debe ser un número').required('Habitaciones requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  camas: yup.number().typeError('Camas debe ser un número').required('Camas requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
  huespedes: yup.number().typeError('Huespedes debe ser un número').required('Huéspedes requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
  active: yup.boolean().required('Estado requerido'),
});



const ModalView = ({onClose,showModal,deptoId}) => {

  const {register ,setValue} = useForm({
    resolver: yupResolver(schema),
  });

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
      setValue('tarifa', deparmentsId?.TARIFA_DIARIA);
      setValue('comuna', deparmentsId?.NOMBRE_COMUNA);
      setValue('direccion', deparmentsId?.DIRECCION);
      setValue('descripcion', deparmentsId?.DESCRIPCION);
      setValue('banos', deparmentsId?.BANOS);
      setValue('habitaciones', deparmentsId?.DORMITORIOS);
      setValue('camas', deparmentsId?.CAMAS);
      setValue('huespedes', deparmentsId?.MAX_HUESPEDES);
      setValue('active', deparmentsId?.ACTIVO === 'S'? true : false);
      setValue('tipo', deparmentsId?.TIPO);


    }

  }, [deparmentsId,setValue])

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
      <form >
      <DialogBody>
        <Typography>
          Datos de la propiedad
        </Typography>
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-blue-200">
          <div className="relative bg-gray-100 ">
            <Input type="text" name="nombre" color="blue" label="Nombre" size="md" readOnly
              { ...register("nombre") }
            />
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
          <div className="relative bg-gray-100">
            <Input color="blue" label="Tarifa Diaria" size="md" name="tarifa"
            { ...register("tarifa") }
            type="number"
            readOnly
            />
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
            <Textarea style={{backgroundColor:"#f5f5f5"}}   color="blue" label="Descripción" size="md" name="descripcion"
            { ...register("descripcion") }
            type="text"
            readOnly
            />
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
          <div className="relative bg-gray-50">
            <Input color="blue" label="Cantidad de Baños" size="md" 
              { ...register("banos") }
              type="number"
              name="banos"
              readOnly
            />
          
          </div>
          <div className="relative bg-gray-50">
            <Input name="habitaciones" color="blue" label="Cantidad de Habitaciones" size="md"  
              { ...register("habitaciones") }
              type="number"
              max={10} min={1}
              readOnly
            />

          </div>
          <div className="relative bg-gray-50">
            <Input name="camas" color="blue" label="Cantidad de Camas" size="md"  
              { ...register("camas") }
              max={20} min={1}
              type="number"
              readOnly
            />
          </div>
          <div className="relative bg-gray-50">
            <Input color="blue" label="Cantidad de Huespedes" size="md"  max={20} min={1} 
              { ...register("huespedes") }
              type="number"
              name="huespedes"
              readOnly
            />
          </div>
    

        </div>
        <div className="flex items-center justify-center my-6 ">
          <span className="flex items-center">
            <Checkbox color="blue"  size="sm"
            name="active"
            { ...register("active") }

            disabled
            />
            Habilitar departamento 
          </span>

        </div>

      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
      <button
            onClick={ () => {
              onClose();
            }}
          type="button"
          className="text-white bg-gray-900 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cerrar Ventana
        </button>

      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalView.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  deptoId: PropTypes.number,
}

export default ModalView;
