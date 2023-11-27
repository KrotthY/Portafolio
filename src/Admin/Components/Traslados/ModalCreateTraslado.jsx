import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import {  useEffect, useState } from "react";
import { CreateNewTraslado } from "../../Api";

const schema = yup.object({
  tipoAuto: yup.string()
    .required('El tipo de automovil es requerido')
    .min(3,'El tipo de automovil debe tener al menos 3 caracteres')
    .max(50,'El tipo de automovil debe tener máximo 50 caracteres'),
  patente: yup.string().required('Patente requerida').min(6,'La patente debe tener al menos 6 caracteres')
    .max(6,'La patente debe tener máximo 6 caracteres'),
  capacidad: yup.number().required('Capacidad requerida').min(1,'La capacidad debe ser mayor a 0 personas').max(10,'La capacidad debe ser menor a 10 personas'),
  marca: yup.string().required('Marca requerida').min(3,'La marca debe tener al menos 3 caracteres')
    .max(50,'La marca debe tener máximo 50 caracteres'),
  anio: yup.number().required('Año requerido').min(1900,'El año debe ser mayor a 1900').max(2023,'El año debe ser menor a 2023'),
  modelo: yup.string().required('Modelo requerido').min(3,'El modelo debe tener al menos 3 caracteres')
    .max(50,'El modelo debe tener máximo 50 caracteres'),

});

const ModalCreateTraslado = ({onClose,showModal}) => {

  const  { user }  = useSession();
  const [conductor, setConductor] = useState('');
  const [departamento, setDepartamento] = useState([]);
  const {register ,handleSubmit, formState: { errors },setValue, getValues,reset} = useForm({
    resolver: yupResolver(schema),
  });

  const URL_API_GET_DEPARTAMENTOS = 'https://fastapi-gv342xsbja-tl.a.run.app/departamentos';
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_DEPARTAMENTOS,requestOptions)
      .then(response => response.json())
      .then(data => {
        setDepartamento(data)
      })
      .catch(error => console.log(error))
  },[user.access_token,URL_API_GET_DEPARTAMENTOS]);

  const URL_API_GET_CONDUCTOR = 'https://fastapi-gv342xsbja-tl.a.run.app/conductores';
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_CONDUCTOR,requestOptions)
      .then(response => response.json())
      .then(data => {
        setConductor(data)
      })
      .catch(error => console.log(error))
  },[user.access_token,URL_API_GET_CONDUCTOR]);




  const handleSelectedConductor = (e) => {
    setValue('conductor_id',e)
  }

  const handleSelectedDepartamento = (e) => {
    setValue('departamento_id',e)
  }


  
  const handleSubmitForm = async (formData) => {
    try {
      const vehiculoForm = {
        access_token: user.access_token,
        car_type : formData.tipoAuto,
        registration_plate : formData.patente,
        slots : parseInt(formData.capacidad),
        brand : formData.marca,
        annio  : formData.anio,
        model   : formData.modelo,
        driver_id   : parseInt(formData.conductor_id),
        department_id   : parseInt(formData.departamento_id),
      }
      console.log(vehiculoForm)
      await CreateNewTraslado(vehiculoForm);
      
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Crear vehiculo',
        text: 'El vehiculo se ha creado correctamente para traslados',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el vehiculo',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  return (
    <Dialog open={showModal}  aria-labelledby="modalCrearTraslado" size="md"
    className="max-w-full max-h-screen py-2 "
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
      <Typography variant="h4">
      Crear Vehiculo para traslados
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
          Información del servicio
        </Typography>
        <div className="grid grid-cols-2  gap-6 mt-6 ">
          <div className="relative">
              <Select color="blue" label="Conductor" size="md"
              error={Boolean(errors.conductor)  }
              success={Boolean(!errors.conductor  && getValues('conductor')) }
              onChange={ (e) =>{
                handleSelectedConductor(e)
              }}
              >
              {
                conductor ?
                conductor?.map((conductorItem) => (
                <Option key={conductorItem.CONDUCTOR_ID} value={String(conductorItem.CONDUCTOR_ID)}>{conductorItem.NOMBRE_COMPLETO}</Option>)
                ): (
                  <Option value="0">No hay conductores disponibles</Option>
                )
              }

              </Select>
              {errors.conductor && (
                <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                  {errors.conductor.message}
                </div>
                )}
          </div>
          <div className="relative">
            <Select color="blue" label="Departamento" size="md"
            error={Boolean(errors.departamento) }
            success={Boolean(!errors.departamento  && getValues('departamento'))}
            onChange={ (e) =>{
              handleSelectedDepartamento(e)
            }}
            > 

              {  
                departamento ?
              
                departamento?.map((departamentoItem) => (
                <Option key={departamentoItem.DEPARTAMENTO_ID} value={String(departamentoItem.DEPARTAMENTO_ID)}>{departamentoItem.NOMBRE}</Option>)
                ): (
                  <Option value="0">No hay departamentos disponibles</Option>
                )
              
              }

            </Select>
            {errors.departamento && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.departamento.message}
              </div>
              )}
          </div>
          <div className="relative">
              <Input type="text" name="tipoAuto" color="blue" label="Tipo de automovil" size="md"
                { ...register("tipoAuto") }
                error={Boolean(errors.tipoAuto)}
                success={Boolean(!errors.tipoAuto  && getValues('tipoAuto')) }
              />
              {errors.tipoAuto && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.tipoAuto.message}
                </div>
              )}
          </div>
          <div className="relative">
            <Input type="text" name="patente" color="blue" label="Patente" size="md"
              { ...register("patente") }
              error={Boolean(errors.patente)}
              success={Boolean(!errors.patente  && getValues('patente')) }
            />
            {errors.patente && (
              <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                {errors.patente.message}
              </div>
            )}
          </div>
          <div className="relative w-full">
              <Input type="number" name="capacidad" color="blue" label="Capacidad" size="md"
                { ...register("capacidad") }
                error={Boolean(errors.capacidad)}
                success={Boolean(!errors.capacidad  && getValues('capacidad')) }
              />
              {errors.capacidad && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.capacidad.message}
                </div>
              )}
          </div>
          <div className="relative w-full ">
            <Input type="texto" name="marca" color="blue" label="Marca" size="md"
              { ...register("marca") }
              error={Boolean(errors.marca)}
              success={Boolean(!errors.marca  && getValues('marca') )}
            />
            {errors.marca && (
              <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                {errors.marca.message}
              </div>
            )}
          </div>
          <div className="relative w-full ">
            <Input type="texto" name="anio" color="blue" label="Año" size="md"
              { ...register("anio") }
              error={Boolean(errors.anio)}
              success={Boolean(!errors.anio  && getValues('anio')) }
            />
            {errors.anio && (
              <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                {errors.anio.message}
              </div>
            )}
          </div>
          <div className="relative w-full ">
            <Input type="texto" name="modelo" color="blue" label="Modelo" size="md"
              { ...register("modelo") }
              error={Boolean(errors.modelo)}
              success={Boolean(!errors.modelo  && getValues('modelo')) }
            />
            {errors.modelo && (
              <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                {errors.modelo.message}
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
        Crear traslado
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreateTraslado.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalCreateTraslado;
