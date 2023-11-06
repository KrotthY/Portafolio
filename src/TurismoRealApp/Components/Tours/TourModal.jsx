import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'
import TourCardReserva from "./TourCardReserva";
import { useEffect, useState } from "react";
import logoTurismoReal from "../../../Assets/iconoTurismoReal_logo.png";
import { purchaseTour } from "../../../Api/comprarTour";
import Swal from "sweetalert2";
import useSession from "../../../Auth/Context/UseSession";

const TourModal = ({ idTour, onClose,showModal}) => {
  
  const URL_API_GET_TOUR_ID = `https://fastapi-gv342xsbja-tl.a.run.app/tours/${idTour}`;
  const [toursId, setToursId] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_TOUR_ID, requestOptions)
      .then(response => response.json())
      .then(data => {
        setToursId(data);
        
      })
      .catch(error => console.log(error));
  }, [idTour, URL_API_GET_TOUR_ID]);

  const [selectedTourDate, setSelectedTourDate] = useState('');

  const handleTourDateChange = (date) => {
    setSelectedTourDate(date);
  };

const [parentTotalCost, setParentTotalCost] = useState(0);

const handleTotalCostChange = (cost) => {
    setParentTotalCost(cost);
};


  
  const  { user }  = useSession();
  const handlePurchase = () => {
    
    const tour_agendado_id = toursId?.TOUR_ID;

    purchaseTour(user.access_token,tour_agendado_id)
    .then(() => {
      onClose();

      setSelectedTourDate(null);
      setParentTotalCost(null);

      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso',
        text: '¡Tu pago se ha realizado con éxito!',
        confirmButtonText: 'Ok'
      });
    })
    .catch(() => {
      onClose();

      setSelectedTourDate(null);
      setParentTotalCost(null);

      
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
          { toursId?.NOMBRE_TOUR}
          </span>
          <div>
          <img className="h-16 object-cover" src={ logoTurismoReal } alt="Logo Real"/>
          </div>
          <div className="grid grid-cols-1 text-xs">
          <span>
            {toursId?.NOMBRE_COMUNA}
          </span>
          <span>
            {toursId?.NOMBRE_REGION}
          </span>
          </div>
        </DialogHeader>
          {
            toursId &&
            <DialogBody className="flex justify-center items-center overflow-y-auto mt-auto max-h-[calc(100vh-200px)]">
                <TourCardReserva 
                  DURACION={ toursId?.DURACION } 
                  CAPACIDAD_PARTICIPANTES={toursId?.CAPACIDAD_PARTICIPANTES} 
                  VALOR_MINIMO={toursId?.VALOR_MINIMO} 
                  FECHAS={toursId?.FECHAS}
                  onDateChange={handleTourDateChange}
                  onTotalCostChange={handleTotalCostChange}
                />
            </DialogBody>
          }

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
            <span>Comprar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    
    </>
  )
}

TourModal.propTypes = {
  idTour: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}


export default TourModal