import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Textarea, Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import { crearNuevoProducto } from "../../Api/Productos/crearProductos";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import formatNumberWithDollar from "../../Assets/js/formatNumberDollar";

const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),

    costo: yup.string()
    .required('El costo es requerido')
    .matches(/^\$\d{1,3}(\.\d{3})*$/, 'Formato de costo inválido')
    .test('is-valid-number', 'El costo debe ser un número válido', value => {
      const number = parseFloat(value.replace(/[^\d]/g, '')); // Eliminar todos los caracteres no numéricos para la validación
      return !isNaN(number) && number > 0 && number <= 999999999;
    }),

  multa: yup.number()
    .typeError('El porcentaje de multa debe ser un número')
    .required('El porcentaje de multa es requerido')
    .min(0, 'El porcentaje de multa debe ser mayor o igual a 0')
    .max(1, 'El porcentaje de multa debe ser menor o igual a 1'),

  descripcion: yup.string()
    .required('La descripción es requerida')
    .min(10,'La descripción debe tener al menos 10 caracteres')
    .max(250,'La descripción debe tener máximo 250 caracteres'),
    departamentoId: yup.number().required('El departamento es requerido'),
    cantidad: yup.number().min(0,'La cantidad debe ser mayor o igual a 0').required('La cantidad es requerida')
    .max(100,'La cantidad debe ser menor o igual a 100'),

});





const ModalCreateProductos = ({onClose,showModal}) => {

  const  { user }  = useSession();

  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (formData) => {
    try {
      const ProductosForm = {
        access_token: user.access_token,
        departamentoId: parseInt(formData.departamentoId),
        nombre: formData.nombre,
        costo: parseInt(formData.costo.replace(/\$|\.|,/g, '')),
        multa: formData.multa,
        descripcion: formData.descripcion,
        cantidad:formData.cantidad,
      }
      await crearNuevoProducto(ProductosForm);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Crear inventario',
        text: 'El inventario se ha creado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el inventario',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }




  const handleInputChangeCosto = (event) => {
    const formattedValue = formatNumberWithDollar(event.target.value);
    setValue('costo', formattedValue);
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
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="lg"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Crear nuevo inventario </span>
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
          Información del Productos
        </Typography>
        <div className="grid grid-cols-2  gap-6  my-12 ">
          <div className="space-y-8">

            <div className="flex justify-between items-center gap-3">
              <div className="relative w-full">
                <Input type="text" name="nombre" color="blue" label="Nombre" size="md"
                  { ...register("nombre") }
                  error={Boolean(errors.nombre) }
                  success={Boolean(!errors.nombre  && getValues('nombre')) }
                  
                />
                {errors.nombre && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.nombre.message}
                  </div>
                )}
                </div>
                <div className="relative w-full p-2">
                  <Select color="blue" 
                    className="text-sm"  
                    label="Departamento disponibles"
                    onChange={(e) => handleDeptoChange(e)}
                    error={Boolean(errors.departamentoId) }
                    success={Boolean(!errors.departamentoId  && getValues('departamentoId')) }
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
                  {errors.departamentoId && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.departamentoId.message}
                  </div>
                )}
                </div>
            </div>

            <div className="flex justify-between items-center gap-3 ">
              <div className="relative w-full">
                <Input color="blue" label="Costo del producto" size="md" name="costo"
                { ...register("costo") }
                onChange={handleInputChangeCosto}
                error={Boolean(errors.costo)}
                success={Boolean(!errors.costo  && getValues('costo')) }
                type="text"
                />
                {errors.costo && (
                  <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                    {errors.costo.message}
                  </div>
                  )}
              </div>
              <div className="relative w-full">
                <Input color="blue" label="Porcentaje de multa" size="md" name="multa" step={0.01} min={0} max={1}
                { ...register("multa") }
                error={Boolean(errors.multa)}
                success={Boolean(!errors.multa  && getValues('multa')) }
                type="number"
                />
                {errors.multa && (
                  <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                    {errors.multa.message}
                  </div>
                  )}
              </div>
            </div>
            <div className="relative w-full">
                <Input  color="blue" label="Cantidad de productos" size="md" name="cantidad" step={1}
                { ...register("cantidad") }
                error={Boolean(errors.cantidad)}
                success={Boolean(!errors.cantidad  && getValues('cantidad')) }
                type="number"
                />
                {errors.cantidad && (
                  <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                    {errors.cantidad.message}
                  </div>
                  )}
              </div>
            <div className="relative w-full">
              <Textarea   color="blue" label="Descripción" size="lg" name="descripcion"
              { ...register("descripcion") }
              max={250} min={10}
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
          </div>
          <div className="grid w-full grid-cols-1">
            <div className="grid grid-cols-2 w-full h-full gap-2">
              <img
                src="https://images.pexels.com/photos/2635835/pexels-photo-2635835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="row-span-1  rounded-l-lg  w-full h-full" 
                alt="prod1"
              />
              <img
                src="https://images.pexels.com/photos/161124/abbaye-de-senanque-monastery-abbey-notre-dame-de-senanque-161124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="prod2"
                className=" rounded-r-lg  w-full h-full"
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
        Crear nuevo Inventario
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreateProductos.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  inventarioId: PropTypes.number,
}

export default ModalCreateProductos;
