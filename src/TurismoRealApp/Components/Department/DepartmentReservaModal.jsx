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
      const reservation_debt = parentTotalCost; 
      const reservation_total = parentTotalCost;
      const department_id = idDepartamento;
      const num_hosts = parentHuesped;

      const datosDeReserva = {
        access_token: user.access_token,
        start_date,
        end_date,
        reservation_value,
        reservation_debt,
        reservation_total,
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


  return (
    <>
    <Dialog open={showModal} className="my-auto bg-white shadow-lg shadow-blue-700">
        <DialogHeader className="text-lg flex justify-between items-center my-auto" >
          <span>
          { NOMBRE_TOUR}
          </span>
          <div>
          <img className="h-16 object-cover" src={ logoTurismoReal } alt="Logo Real"/>
          </div>
          <div className="grid grid-cols-1 text-xs">
          <span>
            {NOMBRE_COMUNA}
          </span>
          <span>
            {NOMBRE_REGION}
          </span>
          </div>

        </DialogHeader>
          <form onSubmit={handleSubmit(handlePurchase)}>
            <DialogBody>
              <div className="flex flex-col items-center ">
                <Typography variant="h5">
                  Resumen de reserva
                </Typography>
              </div>
              <div className="flex justify-between items-center py-4">
              <Typography   variant="paragraph">
                  Huespedes:  { parentHuesped }
                </Typography>  
                <Typography   variant="paragraph">
                  Total costo diario: ${ parentTotalCost.toLocaleString('de-DE') } 
                </Typography>
              </div>
              <div className="text-base flex justify-start">
                <h5 className="italic">
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