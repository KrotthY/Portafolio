import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";



const CardReserva = ({handleOpenModal, MAX_HUESPEDES  = 0,  TARIFA_DIARIA, DIAS_RESERVADOS,onTotalCostChange,onTotalPersonChange,onDateSelected}) =>{
  
  const [selectedPersons, setSelectedPersons] = useState(0); 
  const handlePersonsChange = (selectedValue) => {
    selectedValue = parseInt(selectedValue);
    
    setSelectedPersons(selectedValue); 
    if (onTotalPersonChange) {
      onTotalPersonChange(selectedValue);
    }
  };

  const [listaTransformada, setListaTransformada] = useState([]);
  useEffect(() => {
    if (DIAS_RESERVADOS) {
      const listaApiTransformada = DIAS_RESERVADOS.map(obj => ({
        startDate: obj.STARTDATE,
        endDate: obj.ENDDATE
      }));

      setListaTransformada(listaApiTransformada);
    }
  }, [DIAS_RESERVADOS]); 


  const calculeDays = (startDate, endDate) => {
    const startDay = new Date(startDate);
    const endDay = new Date(endDate);
    startDay.setHours(0,0,0,0);
    endDay.setHours(0,0,0,0);
    const timeDiff = Math.abs(endDay.getTime() - startDay.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return diffDays
  }
  
  const [dateToday, setDateToday] = useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = newDateSelected => {
    setDateToday(newDateSelected);


    const days = calculeDays(newDateSelected.startDate, newDateSelected.endDate)

    if (onDateSelected) {
      onDateSelected(newDateSelected);
    }

    if (onTotalCostChange) {
      const newTotalCost = TARIFA_DIARIA * days;
      onTotalCostChange(newTotalCost);
    }
  };

  const days = calculeDays(dateToday.startDate, dateToday.endDate)
  const totalCost = TARIFA_DIARIA * days;

  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);

  const handleReservaClick = (e) => {
    if (selectedPersons === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Uups...',
        text: 'Debe seleccionar al menos 1 huésped para realizar la reserva!',
      });
    } else {
      handleOpenModal(e);
    }
  };
  
  const tarifaFormateada = TARIFA_DIARIA && typeof TARIFA_DIARIA === 'number'
  ? TARIFA_DIARIA.toLocaleString('de-DE')
  : '0,00';

  return (
    <Card className="mt-6 w-96">
      <CardBody className="rounded-t-lg bg-gray-50 border-gray-900" >
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          $ { tarifaFormateada }  x Noche con IVa
        </Typography>
        <div className="bg-gray-200 p-2 rounded-lg my-6">
        <Datepicker 
          useRange={false} 
          value={dateToday} 
          readOnly={true} 
          onChange={handleValueChange} 
          minDate={today}
          maxDate={oneYearLater}
          primaryColor={"green"}
          disabledDates={listaTransformada}
          
        />
        </div>
        <div className="w-full p-2">
          <Select color="blue" 
          className="text-lg"  
          label="Huespedes"
          onChange={(e) => handlePersonsChange(e)}
          >
          { 
            Array.from({ length: MAX_HUESPEDES }).map((_, index) => (
              <Option key={index} value={(index + 1).toString()} >{index + 1} Huespedes</Option>
            ))
          }
          </Select>
        </div>
        <div className="py-2 font-normal text-base text-center">
          <span>Total $ { totalCost.toLocaleString('de-DE') } </span>
        </div>
      </CardBody>
      <CardFooter className="pt-1 rounded-b-lg bg-gray-100">
        <Button className="w-full"  onClick={(e) => handleReservaClick(e)}>Solicitar reserva</Button>
      </CardFooter>
    </Card>
  );
}


CardReserva.propTypes = {
  MAX_HUESPEDES: PropTypes.number,
  TARIFA_DIARIA: PropTypes.number,
  DIAS_RESERVADOS: PropTypes.array,
  handleOpenModal: PropTypes.func.isRequired,
  onTotalCostChange: PropTypes.func.isRequired,
  onTotalPersonChange: PropTypes.func.isRequired,
  onDateSelected: PropTypes.func.isRequired
}

export default CardReserva