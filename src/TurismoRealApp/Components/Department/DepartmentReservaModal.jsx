import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
import logoTurismoReal from "../../../Assets/iconoTurismoReal_logo.png";
import { reservaDepartamento } from "../../../Api/ReservarDepartamento";
import Swal from "sweetalert2";
import useSession from "../../../Auth/Context/UseSession";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TourOfferCard from "../Tours/TourOfferCard";


const schema = yup.object({
  nombreCompleto: yup.string()
                    .required('El nombre es obligatorio')
                    .min(3, 'El nombre debe tener al menos 3 caracteres')
                    .max(50, 'El nombre debe tener como máximo 50 caracteres'),
  telefono: yup.number()
              .typeError('El teléfono debe ser un número')
              .required('El teléfono es obligatorio')
              .positive('El número de teléfono debe ser positivo')
              .integer('El número de teléfono no puede incluir un punto decimal')
              .min(10000000, 'El teléfono debe tener al menos 8 dígitos')
              .max(99999999999, 'El teléfono debe tener como máximo 11 dígitos')
});


const DepartamentoModal = ({ idDepartamento,parentTotalCost,NOMBRE_TOUR, NOMBRE_COMUNA,NOMBRE_REGION,onClose,showModal,parentHuesped,parentDateSelected}) => {
  const  { user }  = useSession();


  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    resolver: yupResolver(schema),
  });


  const handlePurchase = async () => {
    try {
      if(!user){
        throw new Error('Para continuar, debes iniciar sesión');
      }
      const {
        startDate: start_date,
        endDate: end_date
      } = parentDateSelected;
      const reservation_value = parentTotalCost;
      const department_id = idDepartamento;
      const num_hosts = parentHuesped;

      const datosDeReserva = {
        access_token: user.access_token,
        start_date,
        end_date,
        reservation_value,
        department_id,
        num_hosts
      };

  
      await reservaDepartamento(datosDeReserva);
      
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
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el pago',
        text: error,
        confirmButtonText: 'Entendido'
      });
    }
  };

  const URL_API_GET_TOUR = 'https://fastapi-gv342xsbja-tl.a.run.app/tours';

  const [ tours , setTours ] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_TOUR,requestOptions)
      .then(response => response.json())
      .then(data => {
        setTours(data);
        console.log(data);
      })
      .catch(error => console.log(error))
  }, []);

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
                <div key={index} className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6 mx-3">
                  <div className="flex flex-col justify-center">
                    <input type="text"  name="nombreCompleto" placeholder="Nombre Completo" 
                      { ...register("nombreCompleto") }
                      className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                    {errors.nombreCompleto && <p className="text-red-500">{errors.nombreCompleto.message}</p>}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <input type="number"  name="telefono" 
                      { ...register("telefono") }
                      placeholder="Telefono" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"/>
                  {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
                  </div>

                </div>
              ))
            }
          </div>
          <div className="col-span-1 border-l-4 border-blue-50">
            <div className="text-base flex flex-col ml-2">
              <h5 className="italic py-6">
                Datos de pago
              </h5>
              <div className="flex flex-col justify-end">
                <input type="text" placeholder="Nombre Completo del Titular" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                <div className="py-5">
                  <input type="text" placeholder="Numero de Tarjeta" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                  <div className="py-5">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input type="text" placeholder="Fecha de Vencimiento" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                      </div>
                      <div className="col-span-1">
                        <input type="text" placeholder="CVV" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                      </div>
                      </div>
                  </div>
                </div>
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
                  <TourOfferCard key={tour?.TOUR_ID} idTour={tour?.TOUR_ID} imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" qtyPerson={tour?.NOMBRE_COMUNA} description={tour.DESCRIPCION} title={tour.NOMBRE_TOUR} price={tour.VALOR_MINIMO}  status={tour.ACTIVO} />
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