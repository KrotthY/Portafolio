import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { useState } from "react";

const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre debe tener un máximo de 50 caracteres'),
  apellido: yup.string()
    .required('El apellido es requerido')
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(50, 'El apellido debe tener un máximo de 50 caracteres'),
  tipoStaffId: yup.string()
    .required('El tipo de usuario es requerido'),
  usuario: yup.string()
    .required('El usuario es requerido')
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario debe tener un máximo de 20 caracteres'),
  correo: yup.string()
    .required('El correo es requerido')
    .email('Debe ser un correo electrónico válido')
    .max(50, 'El correo debe tener un máximo de 50 caracteres'),
});


const ModalCreateUsuarios = ({onClose,showModal}) => {

  const  { user }  = useSession();
  const [usuarioIdSelected, setUsuarioIdSelected] = useState([
    {idTipo: 1, nombre: 'Administrador'},
    {idTipo: 2, nombre: 'Funcionario'},
  ]);

  const {register ,handleSubmit, formState: { errors } , getValues,setValue,reset} = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (formData) => {
    try {
      const UsuariosForm = {
        access_token: user.access_token,
        departamentoId: parseInt(formData.departamentoId),
        nombre: formData.nombre,
        costo: parseInt(formData.costo.replace(/\$|\.|,/g, '')),
        multa: formData.multa,
        descripcion: formData.descripcion,
      }
      await crearNuevoUsuario(UsuariosForm);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Crear Usuario',
        text: 'El Usuario se ha creado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el Usuario',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const handleTipoChange = (e) => {
    const tipoSelected = usuarioIdSelected.find(tipo => tipo.idTipo === parseInt(e));
    setValue('tipoStaffId', tipoSelected.idTipo);
  }

  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="md"
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
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6  my-12 ">
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
              <div className="relative w-full">
              <Input type="text" name="apellido" color="blue" label="Apellido" size="md"
                { ...register("apellido") }
                error={Boolean(errors.apellido) }
                success={Boolean(!errors.apellido  && getValues('apellido')) }
                
              />
              {errors.apellido && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.apellido.message}
                </div>
              )}
              </div>
          </div>

          <div className="relative">
            <Select color="blue" 
              className="text-sm"  
              label="Tipo de Usuario"
              onChange={(e) => handleTipoChange(e)}
              error={Boolean(errors.tipoStaffId) }
              success={Boolean(!errors.tipoStaffId  && getValues('tipoStaffId')) }
            >
            { 
              usuarioIdSelected.map((tipoData) => (
                <Option  key={tipoData.idTipo} value={String(tipoData.idTipo)}>{tipoData.nombre}</Option>
              ))
            }
            </Select>
            {errors.tipoStaffId && (
            <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
              {errors.tipoStaffId.message}
            </div>
          )}
          </div>
          <div className="flex justify-between items-center gap-3">
              <div className="relative w-full">
                <Input type="text" name="usuario" color="blue" label="Usuario" size="md"
                  { ...register("usuario") }
                  error={Boolean(errors.usuario) }
                  success={Boolean(!errors.usuario  && getValues('usuario')) }
                  
                />
                {errors.usuario && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.usuario.message}
                  </div>
                )}
                </div>
                <div className="relative w-full">
                <Input type="text" name="correo" color="blue" label="Correo" size="md"
                  { ...register("correo") }
                  error={Boolean(errors.correo) }
                  success={Boolean(!errors.correo  && getValues('correo')) }
                  
                />
                {errors.correo && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.correo.message}
                  </div>
                )}
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
        Crear nuevo Usuario
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalCreateUsuarios.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalCreateUsuarios;
