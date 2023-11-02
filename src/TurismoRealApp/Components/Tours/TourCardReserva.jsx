import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types';


const TourCardReserva = ({DURACION,CAPACIDAD_PARTICIPANTES, VALOR_MINIMO, FECHAS,onDateChange,onTotalCostChange}) =>{

  const [selectedPersons, setSelectedPersons] = useState(1); 

  const handlePersonsChange = (selectedValue) => {
    setSelectedPersons(selectedValue); 
    if (onTotalCostChange) {
      const newTotalCost = VALOR_MINIMO * selectedValue;
      onTotalCostChange(newTotalCost);
    }
  };

  const totalCost = VALOR_MINIMO * selectedPersons;

  const handleDateChange = (selectedValueDate) => {
    if (onDateChange) {
        onDateChange(selectedValueDate);
    }
  };

  return (
    <Card className=" w-full rounded-lg">
      <CardHeader floated={false} className="h-full">
        <img className="h-full w-full object-contain rounded-lg" src="https://images.pexels.com/photos/7903537/pexels-photo-7903537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile-picture" />
      </CardHeader>
      <CardBody className="rounded-lg bg-gray-50 border-gray-900" >
        <Typography variant="h6" color="blue-gray" className="mb-4 text-center font-semibold">
          Desde ${ VALOR_MINIMO.toLocaleString('de-DE') }  x persona
        </Typography>
          <div className="w-full p-2">
            <Select color="blue" 
              className="text-lg"  
              label="Fechas disponibles"
              onChange={(e) => handleDateChange(e)}
            
            >
            { 
              FECHAS.map((fecha, index) => (
                <Option key={index} value={fecha[1]}>{fecha[1]}</Option>
              ))
            }
            </Select>
          </div>
        <div className="w-full p-2">
          <Select 
          color="blue" 
          className="text-lg" 
          label="Personas"
          onChange={(e) => handlePersonsChange(e)}
          >
          {
            Array.from({ length: CAPACIDAD_PARTICIPANTES }).map((_, index) => (
              <Option key={index} value={String(index + 1)} >{index + 1} personas</Option>
            ))
          }
          </Select>
        </div>
        <div className="py-2 text-center">
          <p className="text-sm font-light text-gray-700">Duracion del tour es de {DURACION/60} Hrs.</p>
        </div>

        <div className="py-2 font-normal text-base text-center">
          <span>Total $ { totalCost.toLocaleString('de-DE') } </span>
        </div>
      </CardBody>
    </Card>
  );
}


TourCardReserva.propTypes = {
  DURACION : PropTypes.number.isRequired, //MINUTOS
  CAPACIDAD_PARTICIPANTES : PropTypes.number.isRequired,
  VALOR_MINIMO : PropTypes.number.isRequired,
  FECHAS : PropTypes.array.isRequired,
  onDateChange : PropTypes.func.isRequired,
  onTotalCostChange : PropTypes.func.isRequired,
}

export default TourCardReserva