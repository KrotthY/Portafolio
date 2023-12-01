import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
import logoTurismoReal from "../../../Assets/iconoTurismoReal_logo.png";
import { reservaDepartamento } from "../../../Api/ReservarDepartamento";
import Swal from "sweetalert2";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TourOfferCard from "../Tours/TourOfferCard";
import useSession from "../../../Auth/Context/UseSession";
import { agendarTraslado } from "../../../Api/agendarTraslado";


const guestSchema = yup.object().shape({
nombre: yup.string()
  .required('El nombre es obligatorio')
  .min(3, 'El nombre debe tener al menos 3 caracteres')
  .max(50, 'El nombre debe tener como máximo 50 caracteres'),
apellido: yup.string()
  .required('El apellido es obligatorio')
  .min(3, 'El apellido debe tener al menos 3 caracteres')
  .max(50, 'El apellido debe tener como máximo 50 caracteres'),
telefono: yup.number()
  .typeError('El teléfono debe ser un número')
  .required('El teléfono es obligatorio')
  .positive('El número de teléfono debe ser positivo')
  .integer('El número de teléfono no puede incluir un punto decimal')
  .min(10000000, 'El teléfono debe tener al menos 8 dígitos')
  .max(99999999999, 'El teléfono debe tener como máximo 11 dígitos')
});

const schema = yup.object({
  guests: yup.array().of(guestSchema)
});



const DepartamentoModal = ({ idDepartamento,parentTotalCost,NOMBRE_TOUR, NOMBRE_COMUNA,NOMBRE_REGION,onClose,showModal,parentHuesped,parentDateSelected}) => {
  const  { user }  = useSession();
  const [ tours , setTours ] = useState([]);
  const [ traslados , setTraslados ] = useState([]);

  const {  register, handleSubmit, formState: { errors }, reset,getValues } = useForm({
    resolver: yupResolver(schema),
  });
  
  const URL_API_GET_TOUR = 'https://fastapi-gv342xsbja-tl.a.run.app/tours';
  
  const CargarVehiculos = () => {
    const URL_API_GET_VEHICULOS_DPTO = `https://fastapi-gv342xsbja-tl.a.run.app/vehiculos_por_dpto/${idDepartamento}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_VEHICULOS_DPTO,requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTraslados(data);
      })
      .catch(error => console.log(error))
  }

  const handlePurchase = async (formData) => {
    try {
      if(!user){
        throw new Error('Para continuar, debes iniciar sesión');
      }
      const {
        startDate: start_date,
        endDate: end_date
      } = parentDateSelected;

    const nombres = formData.guests.map(guest => guest.nombre);
    const apellidos = formData.guests.map(guest => guest.apellido);
    const telefonos = formData.guests.map(guest => guest.telefono.toString()); 
    const guestsData = [
      {
        "NOMBRE": nombres
      },
      {
        "APELLIDO": apellidos
      },
      {
        "TELEFONO": telefonos
      }
    ];

    
    const datosDeReserva = {
        access_token: user.access_token,
        start_date,
        end_date,
        reservation_value: parentTotalCost,
        department_id: idDepartamento,
        num_hosts: parentHuesped,
        guests: guestsData
      };

      const idReserva  =   await reservaDepartamento(datosDeReserva);
      if(tipoTraslado !== ''){
        const vehiculoId = traslados.map(traslado => traslado.VEHICULO_ID);
        const conductorId = traslados.map(traslado => traslado.CONDUCTOR_ID);

        const trasladoForm = {
          access_token: user.access_token,
          tipoDeTraslado: tipoTraslado,
          totalAPagar :20000,
          reservacionId: idReserva.RESERVA_ID,
          carId:conductorId[0],
          driverId:vehiculoId[0] , 
        }
        console.log(trasladoForm)
        await agendarTraslado(trasladoForm);
      }
        
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso',
        text: '¡Tu pago se ha realizado con éxito!',
        confirmButtonText: 'Ok'
      });
      
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error en el pago',
        text: error,
        confirmButtonText: 'Entendido'
      });
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_TOUR,requestOptions)
      .then(response => response.json())
      .then(data => {
        setTours(data);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    if(user && idDepartamento){
      CargarVehiculos();
    }
  }, [user,idDepartamento]);

  const [tipoTraslado, setTipoTraslado] = useState('');

  const manejarCambioTipoTraslado = (event) => {
    setTipoTraslado(event.target.value);
  };



  return (
    <>
    <Dialog open={showModal} className="my-auto bg-white shadow-lg" size="xl">
      <DialogHeader className="text-xl flex justify-between items-center" >
        <span className="w-full">
        { NOMBRE_TOUR}
        </span>
        <div className="w-full">
        <img className="h-20 object-cover" src={ logoTurismoReal } alt="Logo Real"/>
        </div>
        <div className="grid grid-cols-1 text-xs w-1/3">
        <span>
          {NOMBRE_COMUNA}
        </span>
        <span>
          {NOMBRE_REGION}
        </span>
        </div>

      </DialogHeader >
      <form onSubmit={handleSubmit(handlePurchase)} className="max-h-[80vh] overflow-y-auto">
      <DialogBody>
        <div className="space-y-2 bg-gray-50/10">
          <div className="flex flex-col items-center ">
            <Typography variant="h4">
              Resumen de reserva
            </Typography>
          </div>
          <div className="flex justify-between items-center py-4">
          <Typography className="italic"  variant="paragraph">
              Cantidad de Huespedes:  { parentHuesped }
            </Typography>  
            <Typography  className="italic"  variant="paragraph">
              Total costo diario: ${ parentTotalCost.toLocaleString('de-DE') } 
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-5 gap-6 border-t-4 border-blue-50">
          <div className="col-span-2 py-4">
            <div className="text-base flex justify-start">
              <h5 className="italic py-2">
                Lista de Huespedes 
              </h5>
            </div>

            {
              Array.from({ length: (parentHuesped) }).map((_, index) => (
                <div key={index} className="grid md:grid-cols-3 grid-cols-1  gap-6 mt-6 mx-auto ">
                  <div className="col-span-2 flex  justify-center items-center gap-2">
                  <div className="flex flex-col justify-center w-full">
                    <div className="relative w-full">

                    <Input type="text"  name={`guests[${index}].nombre`} color="blue" label="Nombre" size="md"
                      {...register(`guests[${index}].nombre`)}
                      error={Boolean(errors?.guests?.[index]?.nombre)}  
                      success={Boolean(getValues(`guests[${index}].nombre`))}

                      />
                    {errors?.guests?.[index]?.nombre && (
                          <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                            {errors.guests[index].nombre.message}
                      </div>
                    )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-full">
                    <div className="relative w-full">

                    <Input type="text"  name={`guests[${index}].apellido`} color="blue" label="Apellido"  size="md"
                      {...register(`guests[${index}].apellido`)}
                      error={Boolean(errors?.guests?.[index]?.apellido)}  
                      success={Boolean(getValues(`guests[${index}].apellido`))}
                      />
                      {errors?.guests?.[index]?.apellido && (
                          <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                            {errors.guests[index].apellido.message}
                      </div>
                    )}
                    
                    </div>
                  </div>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center ">
                    <div className="relative w-full"> 
                    <Input type="number"  name={`guests[${index}].telefono`} size="md" 
                      color="blue" label="Telefono"
                      {...register(`guests[${index}].telefono`)}
                      error={Boolean(errors?.guests?.[index]?.telefono)}  
                      success={Boolean(getValues(`guests[${index}].telefono`))}
                      />

                      {errors?.guests?.[index]?.telefono && (
                        <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                            {errors.guests[index].telefono.message}
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
          <div className="col-span-1 border-l-4 border-blue-50">
            <div className="flex flex-col align-middle py-auto">
              <div className="italic py-6 text-sm text-center">

                Recuerda ingresar los datos de tu tarjeta en tu perfil para poder realizar la reserva, posteriormente te enviaremos un correo con los datos de tu reserva.
              </div>
            </div>
          </div>
      </div>
      <div className="border-t-4 border-blue-50 mb-12">
        <div className="flex justify-center items-center py-6">
          <Typography variant="h5">
            Servicios adicionales
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <div className="flex flex-col justify-center items-center">
              <Typography variant="h6">
                Agregar Tour
              </Typography>
              <Typography className="text-xs" variant="paragraph">
                Puede agregar un tour a su reserva, pero tambien puede agregarlo en la seccion de tours o en el momento de su llegada 
              </Typography>
              <div className="mt-3 w-full">
              {
                tours
                .filter((tour) => tour.ACTIVO === "S")
                .slice(0, 1)
                .map((tour) => (
                  <TourOfferCard key={tour?.TOUR_ID} idTour={tour?.TOUR_ID} imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" qtyPerson={tour?.NOMBRE_COMUNA ?? 0} description={tour.DESCRIPCION} title={tour.NOMBRE_TOUR} price={tour.VALOR_MINIMO}  status={tour.ACTIVO} />
                ))
              }
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col justify-center items-center">
            <Typography variant="h6">
              Agregar Trasalados
              </Typography>
              <Typography className="text-xs" variant="paragraph">
              Puede agregar un trasalado a su reserva desde/hacia su hospadaje, pero tambien puede solicitarlo en la seccion de su perfil.
              </Typography>
              
              {
                traslados && traslados.length > 0 ? (

                  <div className="flex flex-wrap mt-6">
                    <div className="w-full max-w-full  mx-auto">
                      <div className="relative flex-[1_auto] flex flex-col min-w-0 bg-clip-border  bg-white ">
                        <div className="relative flex flex-col min-w-0 border-4 border-dashed bg-clip-border rounded-2xl border-stone-200 bg-gray-100/50">
                          <div className="flex-auto block py-6  px-9">
                            <div className="overflow-y-auto">
                              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                <thead className="align-bottom">
                                  <tr className="font-semibold text-sm text-secondary-dark">
                                    <th className="text-start">Conductor</th>
                                    <th>Nombre</th>
                                    <th className="pr-12 text-end ">Estado</th>
                                    <th className="pr-12 text-end ">Tipo</th>
                                    <th className=" ">Tipo de Traslado</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    traslados.map((traslado) => (

                                    <tr key={traslado.VEHICULO_ID} className="border-b-4 border-dashed last:border-b-0">
                                      <td className="p-3 ">
                                        <div className="flex items-center">
                                          <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                            <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-48-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt=""/>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-3 text-end">
                                        <span className="font-semibold text-light-inverse text-xs">{ traslado.NOMBRE_COMPLETO }</span>
                                      </td>
                                      <td className="p-3 ">
                                        <span className="font-semibold text-light-inverse text-xs">{ traslado.TELEFONO }</span>
                                      </td>
                                      <td className=" text-start">
                                        <span className="font-semibold text-light-inverse text-xs">{ traslado.TIPO }</span>
                                      </td>
                                      <td className=" text-end">
                                      <select 
                                        name="tipoTraslado" 
                                        className="rounded-md text-xs bg-blue-50 p-3"
                                        value={tipoTraslado}
                                        onChange={manejarCambioTipoTraslado}
                                      >
                                        <option value="">Ninguno</option>
                                        <option value="0">Ida</option>
                                        <option value="1">Ida y Vuelta</option>
                                      </select>

                                      </td>
                                    </tr>

                                    ))
                                  }
                                </tbody>

                              </table>
                              <span>El costo del trasalado es de $20.000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ) : (
                  <div className="flex flex-col items-center mt-20">
                    <Typography variant="h4">
                      No hay traslados disponibles
                    </Typography>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </div>


      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="mr-1"
          >
          <span>Cancelar</span>
        </Button>
        <Button variant="gradient" color="green" type="submit"  >
          <span>Confirmar Reserva</span>
        </Button>
      </DialogFooter>
      </form>
      </Dialog>
    
    </>
  )
}

DepartamentoModal.propTypes = {
  idDepartamento: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  parentTotalCost: PropTypes.number.isRequired,
  NOMBRE_TOUR: PropTypes.string, 
  NOMBRE_COMUNA: PropTypes.string,
  NOMBRE_REGION: PropTypes.string,
  parentHuesped: PropTypes.number.isRequired,
  parentDateSelected: PropTypes.object.isRequired
}

export default DepartamentoModal