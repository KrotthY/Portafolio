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
        console.log(data);
        setToursId(data);
        
      })
      .catch(error => console.log(error));
  }, [idTour, URL_API_GET_TOUR_ID]);

  const [selectedTourDate, setSelectedTourDate] = useState('');

  const handleTourDateChange = (date) => {
    setSelectedTourDate(date);
  };

const [parentTotalCost, setParentTotalCost] = useState(0);
const [parentTotalPeople, setParentTotalPeople] = useState(0);
const showAlert = (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: 'Entendido'
  });
};

const resetState = () => {
  onClose();
  setSelectedTourDate('');
  setParentTotalCost(0);
}

const handleTotalCostChange = (cost) => {
    setParentTotalCost(cost);
};

const handleTotalPeopleChange = (cost) => {
  setParentTotalPeople(cost);
};

  const  { user }  = useSession();
  const handlePurchase = async () => {
    let errorMessage = '';

    if (!selectedTourDate) {
      errorMessage = 'Debe seleccionar una fecha para continuar.';
    } else if (parentTotalCost <= 0) {
      errorMessage = 'Debe haber al menos un participante seleccionado.';
    } else if (!toursId?.TOUR_ID) {
      errorMessage = 'El tour no es válido.';
    } else if (!user || !user.access_token) {
      errorMessage = 'Para continuar, debes iniciar sesión.';
    }

    if (errorMessage) {
      showAlert('warning', 'Información Incompleta', errorMessage);
      resetState();
      return; 
    }

    try {
      const formTour = {
        TOUR_ID: toursId.TOUR_ID,
        access_token:user.access_token,
        CANTIDAD: parentTotalPeople,
        VALOR_TOTAL: parentTotalCost,
      }

      await purchaseTour(formTour);

      showAlert('success', 'Pago exitoso', '¡Tu pago se ha realizado con éxito!');

      resetState();
    } catch (error) {
      showAlert('error', 'Error en el pago', error.message || 'No se le realizaron cargos. Por favor, intente nuevamente.');
      resetState();
    }
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
                onTotalPersonChange={handleTotalPeopleChange}
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