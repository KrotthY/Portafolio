import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import { CreateNewDpto } from "../../Api/Departamento/crearDpto";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import formatNumberWithDollar from "../../Assets/js/formatNumberDollar";

const schema = yup.object({
  nombre: yup.string().required('Nombre requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  numeroDireccion: yup.number().required('Número requerido').min(3, 'Mín. 3 dígitos').max(9999999, 'Máx. dígitos'),
  region: yup.string(),
  comuna: yup.string(),
  tipo: yup.string(),
  tarifa: yup.string()
  .required('La tarifa es requerido')
  .matches(/^\$\d{1,3}(\.\d{3})*$/, 'Formato de tarifa inválido')
  .test('is-valid-number', 'La tarifa debe ser un número válido', value => {
    const number = parseFloat(value.replace(/[^\d]/g, ''));
    return !isNaN(number) && number > 0 && number <= 999999999;
  }),
  direccion: yup.string().required('direccion requerida').min(2, 'Mín. 3 letras').max(100, 'Máx. 100 letras'),
  descripcion: yup.string().required('Descripción requerida').min(10, 'Mín. 10 letras').max(250, 'Máx. 250 letras'),
  banos: yup.number().required('Baños requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  habitaciones: yup.number().required('Habitaciones requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(10, 'Máx. 10'),
  camas: yup.number().required('Camas requeridas').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
  huespedes: yup.number().required('Huéspedes requeridos').positive('Debe ser positivo').integer('Debe ser entero').min(1, 'Mín. 1').max(20, 'Máx. 20'),
});



const ModalCreate = ({onClose,showModal}) => {

  const  { user }  = useSession();
  const [tipo, setTipo] = useState('');
  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState([]);
  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });


  const handleSubmitForm = async (formData) => {
    try {
      const crearDepartamento = {
        access_token: user.access_token,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        banos: formData.banos,
        habitaciones: formData.habitaciones,
        camas: formData.camas,
        tipo: formData.tipo,
        tarifa: parseInt(formData.tarifa.replace(/\$|\.|,/g, '')),
        direccion: formData.direccion,
        numeroDireccion: formData.numeroDireccion,
        region: formData.region,
        comuna: parseInt(formData.comuna),
        huespedes: formData.huespedes,
      }
      await CreateNewDpto(crearDepartamento);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Departmaneto creado',
        text: 'El departamento se ha creado con éxito',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear departamento',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }


  const handleChangeFormatTarifa = (e) => {
    const formatNumber = formatNumberWithDollar(e.target.value);
    setValue('tarifa',formatNumber)
  }

  const URL_API_GET_REGION = 'https://fastapi-gv342xsbja-tl.a.run.app/regiones';
  useEffect(() => {
    const requestOptions = {
      method: 'GET'
    };

    fetch(URL_API_GET_REGION,requestOptions)
      .then(response => response.json())
      .then(data => {
        setRegion(data)
      })
      .catch(error => console.log(error))
  },[URL_API_GET_REGION]);

  const getComunas = (idRegion) => {
    const URL_API_GET_COMUNAS = `https://fastapi-gv342xsbja-tl.a.run.app/comunas/${idRegion}`;
    const requestOptions = {
      method: 'GET'
    }
    fetch(URL_API_GET_COMUNAS,requestOptions)
      .then(response => response.json())
      .then(data => {
        setComuna(data)
      })
      .catch(error => console.log(error))
  }


  const handleSelectedRegion = (e) => {
    setValue('region',e)
    getComunas(e);
  }

  const handleSelectedComuna = (e) => {
    setValue('comuna',e)
  }

  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Crear Propiedad</span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={onClose}
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
          Datos de la propiedad
        </Typography>
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-6 border-b-blue-200">
          <div className="relative">
            <Input type="text" name="nombre" color="blue" label="Nombre" size="md"
              { ...register("nombre") }
              error={errors.nombre ? errors.nombre.message : undefined }
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
              <Input color="blue" label="Enumeración" name="numeroDireccion" size="md" 
              { ...register("numeroDireccion") }
              type="number"
              error={errors.numeroDireccion ? errors.numeroDireccion.message : undefined }
              success={!errors.numeroDireccion  && getValues('numeroDireccion') }
              />
              {errors.numeroDireccion && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.numeroDireccion.message}
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
              error={errors.tipo ? errors.tipo.message : undefined }
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
            error={Boolean(errors.region) }
            success={Boolean(!errors.region  && getValues('region'))}
            onChange={ (e) =>{
              handleSelectedRegion(e)
            }}
            > 

              {  
                region ?
              
                region?.map((regionItem) => (
                <Option key={regionItem.REGION_ID} value={String(regionItem.REGION_ID)}>{regionItem.NOMBRE_REGION}</Option>)
                ): (
                  <Option value="0">No hay región disponibles</Option>
                )
              
              }

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
            onChange={handleChangeFormatTarifa}
            error={errors.tarifa ? errors.tarifa.message : undefined }
            success={!errors.tarifa  && getValues('tarifa') }
            type="text"
            />
            {errors.tarifa && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.tarifa.message}
              </div>
              )}
          </div>
          <div className="relative">
            <Select color="blue" label="Comuna" size="md"
            error={errors.comuna ? errors.comuna.message : undefined }
            success={!errors.comuna  && getValues('comuna') }
            onChange={ (e) =>{
              handleSelectedComuna(e)
            }}
            >

            {
            
              comuna ?
              comuna?.map((comunaItem) => (
              <Option key={comunaItem.COMUNA_ID} value={String(comunaItem.COMUNA_ID)}>{comunaItem.NOMBRE_COMUNA}</Option>)
              ): (
                <Option value="0">No hay comunas disponibles</Option>
              )
            }

            </Select>
            {errors.comuna && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.comuna.message}
              </div>
              )}
          </div>
          <div className="relative">
            <Input color="blue" label="Dirección" size="md"  name="direccion"
            { ...register("direccion") }
            type="text"
            max={50} min={3}
            error={errors.direccion ? errors.direccion.message : undefined }
            success={!errors.direccion  && getValues('direccion') }
            />
            {errors.direccion && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.direccion.message}
              </div>
            )}
          </div>
          <div className="relative">
            <Textarea  color="blue" label="Descripción" size="md" name="descripcion"
            { ...register("descripcion") }
            max={250} min={10}
            type="text"
            error={errors.descripcion ? errors.descripcion.message : undefined }
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
        <Typography variant="h6">
          Especificaciones del alojamiento
        </Typography>
        <div className="grid grid-cols-4 my-2 gap-6">
          <div className="relative">
            <Input color="blue" label="Cantidad de Baños" size="md" 
              { ...register("banos") }
              type="number"
              name="banos"
              max={10} min={1}
              error={errors.message ? errors.message.message : undefined }
              success={!errors.message  && getValues('message') }
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
              error={errors.habitaciones ? errors.habitaciones.message : undefined }
              success={!errors.habitaciones  && getValues('habitaciones') }
            />
            {errors.habitaciones && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.habitaciones.message}
              </div>
            )}
          </div>
          <div>
            <Input name="camas" color="blue" label="Cantidad de Camas" size="md"  
              { ...register("camas") }
              max={20} min={1}
              type="number"
              error={errors.camas ? errors.camas.message : undefined }
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
              error={errors.huespedes ? errors.huespedes.message : undefined }
              success={!errors.huespedes  && getValues('huespedes') }
            />
            {errors.huespedes && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.huespedes.message}
              </div>
            )}
          </div>
  
        </div>
      </DialogBody>
      <DialogFooter className="p-2 mt-6 border-t-2 border-gray-100 gap-4">
        <button
        type="submit"
        className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Crear departamento
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalCreate;
