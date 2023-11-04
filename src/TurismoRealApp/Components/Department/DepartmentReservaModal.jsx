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

const DepartamentoModal = ({ idDepartamento,parentTotalCost,NOMBRE_TOUR, NOMBRE_COMUNA,NOMBRE_REGION,onClose,showModal,parentHuesped,parentDateSelected}) => {
  const  { user }  = useSession();

  const handlePurchase = () => {
    const start_date = parentDateSelected.startDate;
    const end_date = parentDateSelected.endDate;
    const reservation_value = parentTotalCost;
    const reservation_debt = parentTotalCost;
    const reservation_total = parentTotalCost;
    const department_id = idDepartamento;
    const num_hosts = parentHuesped;

    reservaDepartamento(user.access_token,start_date,end_date,reservation_value,reservation_debt,reservation_total,department_id,num_hosts)
    .then(() => {
      onClose();

      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso',
        text: '¡Tu pago se ha realizado con éxito!',
        confirmButtonText: 'Ok'
      });
    })
    .catch(() => {
      onClose();

      
      Swal.fire({
        icon: 'error',
        title: 'Error en el pago',
        text: 'No se le realizaron cargos. Por favor, intente nuevamente.',
        confirmButtonText: 'Entendido'
      });
    });
  };

  return (
    <>
    <Dialog open={showModal} className="my-auto bg-gray-200">
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
                    <input type="text" id="fname" name="fname" placeholder="Nombre Completo" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/>
                    <input type="text" id="fname" name="fname" placeholder="Telefono" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"/>
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
          <Button variant="gradient" color="green" onClick={handlePurchase}>
            <span>Confirmar Reserva</span>
          </Button>
        </DialogFooter>
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