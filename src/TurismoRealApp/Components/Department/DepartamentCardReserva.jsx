import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types';


const CardReserva = ({MAX_HUESPEDES,  TARIFA_DIARIA, DIAS_RESERVADOS}) =>{

  const [dateToday, setDateToday] = useState({
    startDate: null,
    
    endDate: null
  });

  const handleValueChange = newValue => {
    setDateToday(newValue);
  };

  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);
  
  return (
    <Card className="mt-6 w-96">
      <CardBody className="rounded-t-lg bg-gray-50 border-gray-900" >
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          $ { TARIFA_DIARIA }  x Noche con IVa
        </Typography>
        <div className="bg-gray-200 p-2 rounded-lg my-6">
        <Datepicker 
          useRange={false} 
          value={dateToday} 
          onChange={handleValueChange} 
          minDate={today}
          maxDate={oneYearLater}
        />
        </div>
        <div className="w-full p-2">
          <Select color="blue" className="text-lg"  label="Huespedes">
          {
            Array.from({ length: MAX_HUESPEDES }).map((_, index) => (
              <Option key={index}>{index + 1} Huespedes</Option>
            ))
          }
          </Select>
        </div>
      </CardBody>
      <CardFooter className="pt-1 rounded-b-lg bg-gray-100">
        <Button className="w-full" >Solicitar reserva</Button>
      </CardFooter>
    </Card>
  );
}


CardReserva.propTypes = {
  MAX_HUESPEDES: PropTypes.number,
  TARIFA_DIARIA: PropTypes.number,
  DIAS_RESERVADOS: PropTypes.array
}

export default CardReserva