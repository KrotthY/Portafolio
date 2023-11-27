import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option, Card, Tooltip } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import {  useEffect, useState } from "react";
import { CreateNewAgendaTour, eliminarAgendaTour } from "../../Api";
import formatNumberWithDollar from "../../Assets/js/formatNumberDollar";
import Datepicker from "react-tailwindcss-datepicker";
import { tiempoAgendarTour } from "../../Assets";

const schema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3,'El nombre debe tener al menos 3 caracteres')
    .max(50,'El nombre debe tener máximo 50 caracteres'),
    precio: yup.string()
    .required('El costo es requerido')
    .matches(/^\$\d{1,3}(\.\d{3})*$/, 'Formato de costo inválido')
    .test('is-valid-number', 'El costo debe ser un número válido', value => {
      const number = parseFloat(value.replace(/[^\d]/g, '')); // Eliminar todos los caracteres no numéricos para la validación
      return !isNaN(number) && number > 0 && number <= 999999999;
    }),
    horaInicio: yup.string()
    .required('La hora de inicio es requerida'),
    horaTermino: yup.string()
    .required('La hora de termino es requerida'),

});


const ModalEditAgendarTour = ({onClose,showModal,tourId}) => {
  const  { user }  = useSession();
  const {register ,handleSubmit, formState: { errors } ,setValue, getValues,reset} = useForm({
    resolver: yupResolver(schema),
  });
  const [ tour , setTour ] = useState([]);
  const cargarServicios = () => {
    const URL_API_GET_TOUR_ID = `https://fastapi-gv342xsbja-tl.a.run.app/tours/${tourId}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_TOUR_ID,requestOptions)
      .then(response => response.json())
      .then(data => {
        setTour(data)
      })
      .catch(error => console.log(error))

  }

  useEffect(() => {
    if (tourId) {
      cargarServicios();
    }
  }, [tourId]);


  const handleSubmitForm = async (formData) => {
    try {
      const agendaForm = {
        tour_id: tourId,
        access_token: user.access_token,
        lugar: formData.nombre,
        precio: parseFloat(formData.precio.replace(/[^\d]/g, '')),
        fecha: dateToday.startDate,
        horaInicio: formData.horaInicio,
        horaTermino: formData.horaTermino,

      }
      
      await CreateNewAgendaTour(agendaForm);
      reset();  
      cargarServicios();
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear agenda',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const handleInputChangeCosto = (event) => {
    const formattedValue = formatNumberWithDollar(event.target.value);
    setValue('precio', formattedValue);
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


  
  
  const FechaInicio = tiempoAgendarTour();
  const [opcionesHoraTermino, setOpcionesHoraTermino] = useState(FechaInicio);

  const handleHoraInicioChange = (e) => {
    const horaInicioSeleccionada = e;
    setValue('horaInicio', horaInicioSeleccionada);
  
    const indexHoraInicio = FechaInicio.findIndex(time => time.name === horaInicioSeleccionada);
    if (indexHoraInicio >= 0 && indexHoraInicio < FechaInicio.length - 1) {
      const nuevasHorasDeTermino = FechaInicio.slice(indexHoraInicio + 1);
      setOpcionesHoraTermino(nuevasHorasDeTermino);
    } else {
      setOpcionesHoraTermino([]);
    }
  };

  const handleHoraTerminoChange = (e) => {
    setValue('horaTermino', e);
  };
  const TABLE_HEAD = ["#","Fecha",  ""];

  const handleDeptoDelete = async (e,idReservaAgenda) => {
    e.preventDefault();
    try {
      const borrarAgenda = {
        "access_token":user.access_token,
        "idReservaAgenda":idReservaAgenda,
      }
      await eliminarAgendaTour(borrarAgenda)
      cargarServicios();
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar de la agenda.',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }


  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="xl"
    className="max-w-full max-h-screen py-2 "
    >
      <DialogHeader className="border-b-2 bg-gray-100/50 border-gray-300 flex justify-between items-start p-5">
      <Typography variant="h4">
          Agendar tour 
        </Typography>
        
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
      <DialogBody className="bg-gray-100">
        <Typography variant="h6">
          Información del servicios
        </Typography>
        <div className="grid grid-cols-2  gap-6 mt-6 ">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="space-y-6">
            <div className="relative">
              <Input type="text" className="bg-white"  name="nombre" color="blue" label="Descripción corta" size="md"
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
            <div className="flex justify-center items-center gap-4">
            <label className="text-gray-600 w-full  text-center text-sm  " htmlFor="date">Fecha de tour</label>
            <Datepicker
              i18n={"es"}
              startWeekOn="mon"
              primaryColor={"blue"}
              useRange={false} 
              asSingle={true} 
              value={dateToday} 
              onChange={handleValueChange} 
              minDate={today}
              maxDate={oneYearLater}
              placeholder={"Fecha de tour"} 
              className="bg-white w-full" 
              
            />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="relative w-full">
                <Select color="blue" className="bg-white"  label="Hora de inicio" size="md"
                onChange={e =>{
                  handleHoraInicioChange(e)
                }}
                error={Boolean(errors.horaInicio) }
                success={Boolean(!errors.horaInicio  && getValues('horaInicio')) }
                
                >
                {
                  FechaInicio.map((time) => {
                    return <Option key={time.id} value={time.name}>{time.name}</Option>
                  })
                }


                </Select>
                {errors.horaInicio && (
                <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                  {errors.horaInicio.message}
                </div>
                )}
              </div>
              <div className="relative w-full">
                <Select color="blue" className="bg-white"  label="Hora de Fin" size="md"
                onChange={e => {
                  handleHoraTerminoChange(e)
                }}
                error={Boolean(errors.horaTermino) }
                success={Boolean(!errors.horaTermino  && getValues('horaTermino')) }
                
                >
                {
                opcionesHoraTermino.map((time) => (
                  <Option key={time.id} value={time.name}>{time.name}</Option>
                ))
                }
                </Select>
                {errors.horaTermino && (
                <div className="absolute left-0  bg-red-500 text-white text-xs mt-1 rounded-lg px-2">
                  {errors.horaTermino.message}
                </div>
                )}
              </div>
            </div>
            <div className="relative">
              <Input className="bg-white" type="text" name="precio" color="blue" label="Precio" size="md"
                { ...register("precio") }
                onChange={handleInputChangeCosto}
                error={Boolean(errors.precio)}
                success={Boolean(!errors.precio  && getValues('precio')) }
              />
              {errors.precio && (
                <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                  {errors.precio.message}
                </div>
              )}
            </div>
            <div className="flex justify-end items-center ">
              <button 
              type="submit"
              className="text-white flex justify-center items-center gap-2  bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-800 rounded-lg border border-blue-200 text-sm font-semibold px-6 py-2.5 hover:text-white focus:outline-none focus:z-10"
              >
              Agregar
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>

              </button>
            </div>
          </div>
          </form>
            <Card className="w-full overflow-auto">
              <div className="max-h-[16rem] overflow-y-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-3 z-10"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    
                    
                    tour && tour.FECHAS && tour.FECHAS.length > 0  ? (
                    
                  tour.FECHAS.map((fecha, index) => {
                    const isLast = index === tour.FECHAS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    const  idDate   = fecha[0];
                    const dateValue  = fecha[1];
                    return (
                      <tr key={idDate}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {idDate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dateValue}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Desahabilitar propiedad" placement="top">
                            <button onClick={
                              (e) => {
                                handleDeptoDelete(e,idDate);
                              }
                            }  
                              className="rounded-full  relative w-full h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-600 active:border-red-600">
                              <span className=" right-0 h-full w-full rounded-full bg-red-300 hover:bg-red-600 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                              <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                              </span>
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (

                  <tr>
                  <td colSpan="3" className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      No hay fechas disponibles
                    </Typography>
                  </td>
                </tr>
                )

                }
                </tbody>
              </table>
              </div>

            </Card>
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
          Cerrar
        </button>

      </DialogFooter>
    </Dialog>
  );
};

ModalEditAgendarTour.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  tourId: PropTypes.number,
}

export default ModalEditAgendarTour;
