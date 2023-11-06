import { Sidebar } from "../Components/Sidebar/Sidebar";
import { Checkbox, Typography } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import apiCheckInRegister from "../../Api/checkInHuesped";
import Swal from "sweetalert2";


const URL_API_GET_CHECK_IN = 'https://fastapi-gv342xsbja-tl.a.run.app/check-in';

const CheckInFuncionario = () => {

  const [confirmedCheckIns, setConfirmedCheckIns] = useState({});
  const [ checkIn , setCheckIn ] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_CHECK_IN,requestOptions)
      .then(response => response.json())
      .then(data => {
        setCheckIn(data)
      })
      .catch(error => console.log(error))
  }, []);

  const TABLE_HEAD = ["Huesped", "Reserva", "Estado", "Fecha Ingreso", "Check in"];

  
  const TABLE_ROWS = checkIn.map(obj => ({
      
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: obj.NOMBRE + " " + obj.APELLIDO,
      email: "john@creative-tim.com",
      job: "Departamento",
      org: "304",
      online: false,
      date: obj.FECHA,
      idReserva: obj.RESERVA_ID,
      idUser: obj.USUARIO_ID
  }));

  const [currentReservation, setCurrentReservation] = useState({
    reservation_id: null,
    user_id: null,
  });   

  const handleCheckboxClick = (reservation_id, user_id, client_confirmation) => {
    setCurrentReservation({ reservation_id, user_id });
    handleRegisterHuesped(reservation_id, user_id, client_confirmation);
    setConfirmedCheckIns(prev => ({ ...prev, [reservation_id]: true }));
  };


  const handleRegisterHuesped = (reservation_id, user_id,client_confirmation) => {

    const client_confirmationSend = client_confirmation;
    const reservation_idSend  = reservation_id;
    const user_idSend  = user_id;

    
    apiCheckInRegister(client_confirmationSend,reservation_idSend ,user_idSend)
    .then(() => {

      Swal.fire({
        icon: 'success',
        title: 'Check In exitoso',
        text: '¡Ingreso de huesped realizado con éxito!',
        confirmButtonText: 'Ok'
      });
    })
    .catch(() => {

      Swal.fire({
        icon: 'error',
        title: 'Error en el Check In',
        text: 'No se pudo realizar el Check In. Por favor, intente nuevamente.',
        confirmButtonText: 'Entendido'
      });
    });
  };




  return (
    <>
      <div className="flex flex-col items-center ">
                <Typography className="py-6" variant="h2">
                  Ingreso de Check-In
                </Typography>
      </div>        
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Huespedes
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
            En esta Seccion podras realizar el Check-In de los huespedes que se encuentran en el Hotel
            </Typography>
          </div>
        </div>
    
      </CardHeader>
      <CardBody className="overflow-scroll px-10 rounded-lg">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
          <tbody>
            {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date ,idReserva,idUser }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={idReserva}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "Ingresado" : "Pendiente"}
                          color={online ? "green" : "yellow"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <form>
                        <input type="hidden" name="reservation_id" value={idReserva} /> 
                        <input type="hidden" name="user_id" value={idUser} />

                      <Tooltip content="Registrar Check In">
                        <IconButton variant="text">
                          <Checkbox onClick={() => handleCheckboxClick(idReserva, idUser, true)}
                          className="h-6 w-6"
                          disabled={confirmedCheckIns[idReserva]}
                          />
                        </IconButton>
                      </Tooltip>
                      </form>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Pagina 1 de 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previo
          </Button>
          <Button variant="outlined" size="sm">
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
    </>
  );
};

export default CheckInFuncionario;
