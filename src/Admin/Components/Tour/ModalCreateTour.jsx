import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography,  Textarea, Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
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
    .max(250,'La descripción debe tener máximo 250 caracteres'),
  capacidad: yup.number().required('Capacidad requerida').min(1,'La capacidad debe ser mayor a 0 personas').max(100,'La capacidad debe ser menor a 100 personas'),
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
        capacidad: formData.capacidad,
        tour_comuna_id : formData.comuna,
      }
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


  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState([]);

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
      <Typography variant="h4">
      Crear tour
        </Typography>
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
        <Typography variant="h6">
          Información del servicios
        </Typography>
        <div className="grid grid-cols-2  gap-6 mt-6 ">
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

            <div className="flex justify-center items-center gap-2">
              <div className="relative w-full">
                <Select color="blue" label="Región" size="md"
                error={errors.region ? errors.region.message : undefined }
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
              <div className="relative w-full">
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
            </div>
              
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
            <div className="relative">
              <Textarea className="min-h-[200px]" color="blue" label="Descripción" size="md" name="descripcion"
              { ...register("descripcion") }
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
            <div className="grid w-full grid-cols-2 gap-2">
            <div className="flex justify-center w-full h-full">
          <img
            src="https://images.pexels.com/photos/161124/abbaye-de-senanque-monastery-abbey-notre-dame-de-senanque-161124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full  rounded-lg"
            alt="prod5"
          />
        </div>
        <div className="flex justify-center w-full h-full">
          <img
            src="https://images.pexels.com/photos/7129137/pexels-photo-7129137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full  rounded-lg"
            alt="prod5"
          />
        </div>
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
        Crear tour
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
