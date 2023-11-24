import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import { CrearMatencion } from "../../Api/Departamento/crearMantencion";
import Swal from "sweetalert2";

const schema = yup.object({
  tipoMantencion: yup.string().required('Tipo de Mantención requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  encargado: yup.string().required('Encargado requerido').min(3, 'Mín. 3 letras').max(50, 'Máx. 50 letras'),
  descripcion: yup.string().required('Descripción requerida').min(10, 'Mín. 10 letras').max(250, 'Máx. 250 letras'),
});

const ModalMaintence = ({onClose,showModal,deptoId}) => {
  const { user } = useSession();
  const [listaTransformada, setListaTransformada] = useState([]);
  const [dateToday, setDateToday] = useState({
    startDate: null,
    endDate: null
  });
  const URL_API_GET_DEPARTMENTS_ID = `https://fastapi-gv342xsbja-tl.a.run.app/departamentos/${deptoId}`;
  const [deparmentsId, setDeparmentsId] = useState(null);
  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);
  const { register, handleSubmit, formState: { errors } ,getValues ,reset} = useForm({
    resolver: yupResolver(schema)
  });

  const handleSubmitForm = async (data) => {
    try{
      const asignarMantencion = {
        "department_id": deptoId,
        "access_token": user.access_token,
        "tipoMantencion": data.tipoMantencion,
        "encargado": data.encargado,
        "descripcion": data.descripcion,
        "startDate": dateToday.startDate,
        "endDate": dateToday.endDate
      }
      await CrearMatencion(asignarMantencion);
      reset(); 
      onClose();
      setDateToday(null)
      Swal.fire({
        icon: 'success',
        title: 'Asignación de Mantención',
        text: 'La mantención se ha asignado correctamente',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al asignar Mantención',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  };

  const handleValueChange = newDateSelected => {
    setDateToday(newDateSelected);
  };

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
  }, [deptoId, URL_API_GET_DEPARTMENTS_ID]);
  
  useEffect(() => {
    if (deparmentsId && deparmentsId.DIAS_RESERVADOS) {
      const listaApiTransformada = deparmentsId.DIAS_RESERVADOS.map(obj => ({
        startDate: obj.STARTDATE,
        endDate: obj.ENDDATE
      }));

      setListaTransformada(listaApiTransformada);
    }
    else {
      setListaTransformada([]);
    }
  }, [deparmentsId]); 






  return (
    <Dialog open={showModal}  aria-labelledby="modalRegistro" size="md">
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Mantención de Propiedad</span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={ ()=>{
          reset();
          setDateToday(null)
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
        <div className="flex items-center justify-center">
          
          <Typography className="-mb-2 mr-5" variant="h5">
            Matención de Nombre de propiedad
          </Typography>

        </div>
        <div className="flex items-center justify-between gap-6 mt-12 mb-6 ">
          <div className="relative w-full">

          <Input color="blue" type="text"  label="Tipo de Mantención" size="md" 
              {...register("tipoMantencion")}
              max={50} min={3}
              error={Boolean(errors.tipoMantencion)}
              success={Boolean(!errors.tipoMantencion  && getValues('tipoMantencion')) }
            />
            {errors.tipoMantencion && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.tipoMantencion.message}
              </div>
              )}
          </div>
          <div className="relative w-full">
            <Input color="blue" type="text"  label="Encargado" size="md" 
              {...register("encargado")}
              max={50} min={3}
              error={Boolean(errors.encargado)}
              success={Boolean(!errors.encargado  && getValues('encargado')) }
            />
            {errors.encargado && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.encargado.message}
              </div>
              )}
          </div>
        </div>
        <div className="relative">
            <Textarea  color="blue" label="Descripción" size="md" name="descripcion"
            { ...register("descripcion") }
            max={250} min={10}
            type="text"
            error={errors.descripcion ? errors.descripcion.message : undefined }
            success={Boolean(!errors.descripcion  && getValues('descripcion')) }
            />
            {errors.descripcion && (
              <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                {errors.descripcion.message}
              </div>
            )}
          </div>
        <div className="bg-blue-100/50 p-2 rounded-lg my-6 flex flex-col items-center w-80 mx-auto">
        <Typography className="my-2 font-medium" color="black">
            Fechas de Mantención
          </Typography>
          <Datepicker 
            classNames="text-center"
            useRange={false} 
            value={dateToday} 
            readOnly={true} 
            onChange={handleValueChange} 
            minDate={today}
            maxDate={oneYearLater}
            primaryColor={"blue"}
            disabledDates={listaTransformada}
            
          />
        </div>



      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
        <button
        type="button"
        onClick={ ()=>{
          reset();
          setDateToday(null)
          onClose();
        }}
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Crear Mantención
        </button>
      </DialogFooter>
      </form>
    </Dialog>
  );
};

ModalMaintence.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  deptoId: PropTypes.number,
}

export default ModalMaintence;
