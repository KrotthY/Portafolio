import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Card, Checkbox, ListItemPrefix, ListItem, List } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import useSession from "../../../Auth/Context/UseSession";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import formatNumberWithDollar from "../../../Admin/Assets/js/formatNumberDollar";
import Swal from "sweetalert2";

const guestSchema = yup.object().shape({
  rut: yup.string().required('El rut es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  apellido: yup.string().required('El apellido es requerido'),
  telefono: yup.string().required('El telefono es requerido')
});

const accompanyingGuestSchema = yup.object().shape({
  nombreGuest: yup.string().required('El nombre es requerido'),
  apellidoGuest: yup.string().required('El apellido es requerido'),
  telefonoGuest: yup.string().required('El telefono es requerido')
});

const schema = yup.object({
  titulares: yup.array().of(guestSchema),
  acompanantes: yup.array().of(accompanyingGuestSchema)
});


const ModalRegistroEntrada = ({showModal,onClose,idReserva}) => {

  const { user } = useSession();
  const {  register, formState: { errors }, reset,getValues } = useForm({
    resolver: yupResolver(schema),
  });
  
  
  const [ checkIn , setCheckIn ] = useState([]);
  const cargarCheckIn = () => {
    const URL_API_GET_CHECK_IN = `https://fastapi-gv342xsbja-tl.a.run.app/check-in/${idReserva}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_CHECK_IN,requestOptions)
      .then(response => response.json())
      .then(data => {
        setCheckIn(data)
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    if(idReserva){
      cargarCheckIn();
    }

  }, [idReserva]);

  const TABLE_HEAD = ["Nombre propiedad","Fecha de ingreso ","Fecha de salida","Total Noches","Total Personas"];
  const TABLE_HEADPRECIOS = ["Tarifa Diaria","Monto abonado por cliente ","Total a pagar"];

  function diffDays(dateStart, dateEnd) {
    let startIso = dateStart.split("-").reverse().join("-");
    let endIso = dateEnd.split("-").reverse().join("-");
    let start = new Date(startIso);
    let end = new Date(endIso);
    let diff = end.getTime() - start.getTime();
    let days = diff / (1000 * 60 * 60 * 24);
    return days;
  }

  useEffect(() => {
    if (checkIn && checkIn.length > 0) {
      const titularesData = checkIn.map((guest) => ({
        rut: guest.RUT_TITULAR,
        nombre: guest.NOMBRE,
        apellido: guest.APELLIDO,
        telefono: guest.TELEFONO_TITULAR
      }));
  
      let acompanantesData = [];
      if (checkIn[0]?.HUESPEDES && checkIn[0]?.HUESPEDES.length > 0) {
        acompanantesData = checkIn[0]?.HUESPEDES.map((guestHuesped) => ({
          nombreGuest: guestHuesped.NOMBRE,
          apellidoGuest: guestHuesped.APELLIDO,
          telefonoGuest: guestHuesped.TELEFONO
        }));
      }
  
      reset({ titulares: titularesData, acompanantes: acompanantesData });
    }
  }, [checkIn, reset]);
  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  
  const handleCheckboxChange = (isChecked, idAcompanante) => {
    setSelectedCheckboxes(prevSelected => {
      const newSelected = new Set(prevSelected); 
      
      if (isChecked) {
        newSelected.add(idAcompanante);
      } else {
        newSelected.delete(idAcompanante); 
      }
  
      return Array.from(newSelected); 
    });
  };
  
  const handleSubmitCheckIn = () => {
    
  
    updateAcompanantes()
      .then(updateCheckIn)
      .then(() => {
        Swal.fire('Actualizado', 'El proceso de check-in ha sido actualizado con éxito, pago recepcionado.', 'success');
        onClose();
      })
      .catch(error => {
        Swal.fire('Error', 'Hubo un problema al realizar el check-in.', 'error');
        onClose();
      });
  };
  
  
  const updateAcompanantes = async () => {
    const URL_API_POST_CHECK_IN_ACOMPANANTES = `https://fastapi-gv342xsbja-tl.a.run.app/update_acompanante`;

  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(selectedCheckboxes)
    };
 
    const response = await fetch(URL_API_POST_CHECK_IN_ACOMPANANTES, requestOptions);
    
    if (!response.ok) {
      throw new Error('Error al actualizar acompañantes');
    }
    return response.json(); 
  };
  
  const updateCheckIn = async () => {
    const URL_API_POST_CHECK_IN = `https://fastapi-gv342xsbja-tl.a.run.app/update_check-in`;
    const queryParams = { reservation_id: idReserva };
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = `${URL_API_POST_CHECK_IN}?${queryString}`;
  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      }
    };
  
    const response = await fetch(urlWithParams, requestOptions);

    if (!response.ok) {
      throw new Error('Error al actualizar check-in');
    }
    return response.json(); 
  };
  
  return (
    <Dialog open={showModal}  
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}  
      aria-labelledby="modalRegistro" 
      size="xl" 
      className="max-w-full max-h-screen py-2  overflow-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Proceso de Registro</span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={()=> {
          onClose();
          setSelectedCheckboxes([]);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
      </DialogHeader>
      <DialogBody>
        <Typography className="-mb-2" variant="h5">
          Titular Reserva
        </Typography>
          {
            checkIn && checkIn.length > 0 && (
              checkIn.map((item, index) => (
                <div  key={index} className="flex items-center justify-between sm:grid sm:grid-cols-2 gap-6 my-12 border-b-4 pb-12 border-b-gray-200">
                  <div className="relative w-full">
                  <Input type="text"  name={`titulares[${index}].rut`} color="blue" label="RUT" size="md"
                    {...register(`titulares[${index}].rut`)}
                    error={Boolean(errors?.titulares?.[index]?.rut)}  
                    readOnly
                    success={Boolean(getValues(`titulares[${index}].rut`))}
                    />
                  {errors?.titulares?.[index]?.rut && (
                    <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                      {errors.titulares[index].rut.message}
                    </div>
                  )}
                  </div>
                  <div className="relative w-full">
                  <Input type="text"  name={`titulares[${index}].nombre`} color="blue" label="Nombre" size="md"
                    {...register(`titulares[${index}].nombre`)}
                    error={Boolean(errors?.titulares?.[index]?.nombre)}  
                    readOnly
                    success={Boolean(getValues(`titulares[${index}].nombre`))}
                    />
                  {errors?.titulares?.[index]?.nombre && (
                    <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                      {errors.titulares[index].nombre.message}
                    </div>
                  )}
                  </div>
                  <div className="relative w-full">
                  <Input type="text"  name={`titulares[${index}].apellido`} color="blue" label="Apellido" size="md"
                    {...register(`titulares[${index}].apellido`)}
                    error={Boolean(errors?.titulares?.[index]?.apellido)}  
                    readOnly
                    success={Boolean(getValues(`titulares[${index}].apellido`))}
                    />
                  {errors?.titulares?.[index]?.apellido && (
                    <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                      {errors.titulares[index].apellido.message}
                    </div>
                  )}
                  </div>
                  <div className="relative w-full">
                  <Input type="text"  name={`titulares[${index}].telefono`} color="blue" label="Teléfono" size="md"
                    {...register(`titulares[${index}].telefono`)}
                    error={Boolean(errors?.titulares?.[index]?.telefono)}  
                    readOnly
                    success={Boolean(getValues(`titulares[${index}].telefono`))}
                    />
                  {errors?.titulares?.[index]?.telefono && (
                    <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                      {errors.titulares[index].telefono.message}
                    </div>
                  )}
                  </div>
                </div>
              ))
            )
          }
        <div className="font-normal border-b-4 pb-12 p-6 border-b-gray-200 rounded-sm bg-gray-100 my-12">
        <Typography className="-mb-2" variant="h6">
            Huespedes
          </Typography>

          
        {
          checkIn[0]?.HUESPEDES && checkIn[0]?.HUESPEDES.length > 0 ? (
            checkIn[0]?.HUESPEDES.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-2 my-6">
                <div className="relative w-full">
                  <div className="flex items-center justify-center">
                  <Card>
                    <List>
                      <ListItem className="p-0">
                        <label
                          htmlFor={`vertical-list-svelte${index}`}
                          className="flex w-full cursor-pointer items-center "
                        >
                          <ListItemPrefix>
                            <Checkbox
                              id={`vertical-list-svelte${index}`}
                              ripple={false}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                              onChange={(e) => {handleCheckboxChange(e.target.checked,item.ID_COMPANANTE)} }
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Confirmar Huesped
                          </Typography>
                        </label>
                      </ListItem>
                    </List>
                  </Card>
                  </div>
                </div>
                <div className="relative w-full">
                <Input type="text"  name={`acompanantes[${index}].nombreGuest`} color="blue" label="Nombre" size="md"
                  {...register(`acompanantes[${index}].nombreGuest`)}
                  error={Boolean(errors?.acompanantes?.[index]?.nombreGuest)}  
                  readOnly
                  success={Boolean(getValues(`acompanantes[${index}].nombreGuest`))}
                  />
                {errors?.acompanantes?.[index]?.nombreGuest && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.acompanantes[index].nombreGuest.message}
                  </div>
                )}
                </div>
                <div className="relative w-full">
                <Input type="text"  name={`acompanantes[${index}].apellidoGuest`} color="blue" label="Apellido" size="md"
                  {...register(`acompanantes[${index}].apellidoGuest`)}
                  error={Boolean(errors?.acompanantes?.[index]?.apellidoGuest)}  
                  readOnly
                  success={Boolean(getValues(`acompanantes[${index}].apellidoGuest`))}
                  />
                {errors?.acompanantes?.[index]?.apellidoGuest && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.acompanantes[index].apellidoGuest.message}
                  </div>
                )}
                </div>
                <div className="relative w-full">
                <Input type="text"  name={`acompanantes[${index}].telefonoGuest`} color="blue" label="Teléfono" size="md"
                  {...register(`acompanantes[${index}].telefonoGuest`)}
                  error={Boolean(errors?.acompanantes?.[index]?.telefonoGuest)}  
                  readOnly
                  success={Boolean(getValues(`acompanantes[${index}].telefonoGuest`))}
                  />
                {errors?.acompanantes?.[index]?.telefonoGuest && (
                  <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                    {errors.acompanantes[index].telefonoGuest.message}
                  </div>
                )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center  justify-center">
              <span className="text-lg font-semibold">Sin Acompañantes</span>
            </div>
          )
        }
        


        </div>
        <Typography className="-mb-2" variant="h5">
            Resumen de reserva
        </Typography>

        <Card className="w-full rounded-none overflow-auto my-12">
              <div className="max-h-[16rem] overflow-y-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="sticky top-0 bg-white z-10">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-3 z-10"
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
                <tbody className="text-center">
                  {
                    
                    checkIn  && checkIn.length > 0  ? (
                    
                      checkIn.map((item, index) => {
                    const isLast = index === checkIn.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={item.DEPARTAMENTO_ID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.NOMBRE_DPTO}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.FECHA_INICIO}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.FECHA_FIN}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            { diffDays(item.FECHA_INICIO,item.FECHA_FIN)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.NUM_ACOMPANANTES + 1}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                ) : (

                  <tr>
                  <td colSpan="4" className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      No hay inventario asociado disponible
                    </Typography>
                  </td>
                </tr>
                )

                }
                </tbody>
              </table>
              </div>

        </Card>

        <Card className="w-full rounded-none overflow-auto my-12">
            <div className="max-h-[16rem] overflow-y-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  {TABLE_HEADPRECIOS.map((head) => (
                    <th
                      key={head}
                      className="border-b text-center border-blue-gray-100 bg-blue-gray-50 p-3 z-10"
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
              <tbody className="text-center">
                {
                  
                  checkIn  && checkIn.length > 0  ? (
                  
                    checkIn.map((item, index) => {
                  const isLast = index === checkIn.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={item.DEPARTAMENTO_ID}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatNumberWithDollar(item.TARIFA_DIARIA)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatNumberWithDollar(item.MONTO_RESERVA)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formatNumberWithDollar(item.MONTO_RESTANTE)}
                        </Typography>
                      </td>
  
                    </tr>
                  );
                })
              ) : (

                <tr>
                <td colSpan="4" className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    No hay inventario asociado disponible
                  </Typography>
                </td>
              </tr>
              )

              }
              </tbody>
            </table>
            </div>

        </Card>
        

      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
        <button
          onClick={()=> {
            onClose();
            setSelectedCheckboxes([]);
          }}
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>
        <button onClick={handleSubmitCheckIn}
          className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Pagar  Total
        </button>
      </DialogFooter>
    </Dialog>
  );
};






ModalRegistroEntrada.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  idReserva: PropTypes.number.isRequired
}



export default ModalRegistroEntrada;
