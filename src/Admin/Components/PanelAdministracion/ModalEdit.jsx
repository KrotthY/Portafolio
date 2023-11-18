import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Select, Option, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import { CreateNewDpto } from "../../Api/Departamento/actualizarDpto";
import Swal from "sweetalert2";
import { useState } from "react";

const schema = yup.object({
  nombre: yup.string().required('Nombre requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  numero: yup.string().required('Número requerido').min(3, 'Mín. 3 dígitos').max(50, 'Máx. 50 dígitos'),
  region: yup.string(),
  comuna: yup.string(),
  tipo: yup.string(),
  tarifa: yup.number().typeError('Tarifa debe ser un número').required('Tarifa requerida').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(999999999, 'Demasiado alto'),
  calle: yup.string().required('Calle requerida').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  descripcion: yup.string().required('Descripción requerida').min(10, 'Mín. 10 letras').max(250, 'Máx. 250 letras'),
  banos: yup.number().typeError('Baños debe ser un número').required('Baños requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  habitaciones: yup.number().typeError('Habitaciones debe ser un número').required('Habitaciones requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  camas: yup.number().typeError('Camas debe ser un número').required('Camas requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
  huespedes: yup.number().typeError('Huespedes debe ser un número').required('Huéspedes requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
  active: yup.boolean().required('Estado requerido'),
});



const ModalEdit = ({onClose,showModal}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });


  const handleSubmitForm = async (formData) => {
    try {
      const crearDepartamento = {
        access_token: user.access_token,
        nombre: formData.nombre,
        numero: formData.numero,
        region: formData.region,
        tarifa: formData.tarifa,
        comuna: formData.comuna,
        calle: formData.calle,
        descripcion: formData.descripcion,
        banos: formData.banos,
        habitaciones: formData.habitaciones,
        camas: formData.camas,
        huespedes: formData.huespedes,
        active: formData.active,
        tipo: formData.tipo,
      }
      console.log(crearDepartamento)
      await CreateNewDpto(crearDepartamento);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Departmaneto actualizado con éxito',
        text: 'El departamento se ha actualizado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar departamento',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const [tipo, setTipo] = useState('');
  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState('');

  return (
    <Dialog open={showModal}  aria-labelledby="modalActualizar" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Editar Propiedad</span>
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
          Datos de la propiedad
        </Typography>
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-blue-200">
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


          <div className="flex  justify-center items-center gap-11">
            <div className="relative w-full">
              <Input color="blue" label="Número" name="numero" size="md" 
              { ...register("numero") }
              type="text"
              max={50} min={3}
              error={Boolean(errors.numero)}
              success={!errors.numero  && getValues('numero') }
              />
              {errors.numero && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.numero.message}
              </div>
              )}
            </div>
            <div className="relative w-full">
              <Select color="blue" label="Tipo de Propiedad" size="md"
              value={tipo}
              onChange={e =>{
                setValue('tipo',e)
                setTipo(e)
              }}
              error={Boolean(errors.tipo)}
              success={!errors.tipo  && getValues('tipo') }
              
              >
                <Option value="Departamento">Departamento</Option>
                <Option value="Casa">Casa</Option>
              </Select>
              {errors.tipo && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.tipo.message}
              </div>
              )}
            </div>
          </div>
          <div className="relative">
            <Select color="blue" label="Región" size="md"
            value={region}
            error={Boolean(errors.region)}
            success={!errors.region  && getValues('region') }
            onChange={e =>{
              setValue('region',e)
              setRegion(e)
            }}

            >
              <Option value="1">Region 1</Option>
              <Option value="2">Material Tailwind React</Option>
            </Select>
            {errors.region && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.region.message}
              </div>
              )}
          </div>
          <div className="relative">
            <Input color="blue" label="Tarifa Diaria" size="md" name="tarifa"
            { ...register("tarifa") }
            error={Boolean(errors.tarifa)}
            success={!errors.tarifa  && getValues('tarifa') }
            type="number"
            />
            {errors.tarifa && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.tarifa.message}
              </div>
              )}
          </div>
          <div className="relative">
            <Select color="blue" label="Comuna" size="md"
            value={comuna}
            error={Boolean(errors.comuna)}
            success={!errors.comuna  && getValues('comuna') }
            onChange={e =>{ 
              setValue('comuna',e)
              setComuna(e) 
            }}

            >
              <Option value="1" >comuna 1</Option>
              <Option value="2" >Material Tailwind React</Option>
              <Option value="3" >Material Tailwind Vue</Option>
            </Select>
            {errors.comuna && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.comuna.message}
              </div>
              )}
          </div>
          <div className="relative">
            <Input color="blue" label="Calle" size="md"  name="calle"
            { ...register("calle") }
            type="text"
            max={50} min={3}
            error={Boolean(errors.calle)}
            success={!errors.calle  && getValues('calle') }
            />
            {errors.calle && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.calle.message}
              </div>
            )}
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
        <Typography>
          Datos del Departamento
        </Typography>
        <div className="grid grid-cols-4  gap-6">
          <div className="relative">
            <Input color="blue" label="Cantidad de Baños" size="md" 
              { ...register("banos") }
              type="number"
              name="banos"
              max={10} min={1}
              error={Boolean(errors.banos)}
              success={!errors.banos  && getValues('message') }
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
              max={10} min={1}
              error={Boolean(errors.habitaciones)}
              success={!errors.habitaciones  && getValues('habitaciones') }
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
              max={20} min={1}
              type="number"
              error={Boolean(errors.camas)}
              success={!errors.camas  && getValues('camas') }
            />
            {errors.camas && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.camas.message}
              </div>
            )}
          </div>
          <div className="relative">
            <Input color="blue" label="Cantidad de Huespedes" size="md"  max={20} min={1} 
              { ...register("huespedes") }
              type="number"
              name="huespedes"
              error={Boolean(errors.huespedes)}
              success={!errors.huespedes  && getValues('huespedes') }
            />
            {errors.huespedes && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.huespedes.message}
              </div>
            )}
          </div>
    

        </div>
        <div className="flex items-center justify-center my-6 ">
          <span className="flex items-center">
            <Checkbox color="blue" defaultChecked size="sm"
            name="active"
            { ...register("active") }
            error={Boolean(errors.active)}
            success={!errors.active  && getValues('active') }

            />
            Habilitar departamento 
          </span>

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
}

export default ModalEdit;
