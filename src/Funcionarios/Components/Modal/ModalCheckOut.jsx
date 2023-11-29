import { Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Card, Input } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import useSession from "../../../Auth/Context/UseSession";
import { useEffect, useState } from "react";
import formatNumberWithDollar from "../../../Admin/Assets/js/formatNumberDollar";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { realizarCheckOut } from "../../Api/realizarCheckOut";
import { realizarCheckOutCorrecto } from "../../Api/realizarCheckOutCorrecto";


const guestSchema = yup.object().shape({
  inventario_id: yup.number()
    .required('El ID del inventario es requerido')
    .positive('El ID del inventario debe ser un número positivo')
    .integer('El ID del inventario debe ser un número entero'),

  multa: yup.number()
    .required('La multa es requerida')
    .min(0, 'La multa no puede ser menor que 0')
    .max(1, 'La multa no puede ser mayor que 1 (100%)'),

  costo: yup.number()
    .required('El costo es requerido')
    .positive('El costo debe ser un número positivo')
    .max(1000000, 'El costo no puede exceder 1,000,000'), // Suponiendo un límite máximo

  cantidad: yup.number()
    .required('La cantidad es requerida')
    .min(0, 'La cantidad no puede ser menor que 0')
    .integer('La cantidad debe ser un número entero'),

    cantidadDanados: yup.number()
    .required('La cantidad dañada es requerida')
    .min(0, 'La cantidad de productos dañados debe ser mayor o igual a 0')
    .test(
      'maxCantidadDanados',
      'La cantidad de productos dañados debe ser menor o igual a la cantidad de productos',
      function(value) {
        const { cantidad } = this.parent;
        return typeof value === 'number' && typeof cantidad === 'number' && value <= cantidad;
      }
    )
    .integer('La cantidad dañada debe ser un número entero'),
  
});



const schema = yup.object({
  outForm: yup.array().of(guestSchema),
});

const ModalRegistroSalida = ({onClose,showModal,idReserva,idDepto,idUsuario}) => {
  const { user } = useSession();
  const [ checkIn , setCheckIn ] = useState([]);
  const [ productos , setProductos ] = useState([]);
  const {  register, formState: { errors }, reset,getValues } = useForm({
    resolver: yupResolver(schema),
  });

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
  },[idReserva])

  const cargarProductos = (idDpto) => {
    const URL_API_GET_PRODUCTOS = `https://fastapi-gv342xsbja-tl.a.run.app/productos_por_dpto/${idDpto}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_PRODUCTOS,requestOptions)
      .then(response => response.json())
      .then(data => {
        setProductos(data)
      })
      .catch(error => console.log(error))
  }

  const TABLE_HEAD = ["RUT","Nombre","Apellido","Teléfono"];
  const TABLE_HEAD_INVENTARIO = ["Nombre","Multa","Costo","Cantidad","Cantidad dañados"];
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);

  const handleCheckboxChange = (e) => {
    if(idDepto){
      cargarProductos(idDepto);
    }
    setIsCheckboxChecked(e.target.checked);
  };


  const handleSubmitForm = async  () => {
    try {
      const checkOutForm = {
        access_token: user.access_token,
        reservation_id: idReserva,
        usuario_id: idUsuario,
      }
      console.log(checkOutForm)
      await realizarCheckOutCorrecto(checkOutForm);
      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Registro de salida',
        text: 'Se ha registrado la salida del huesped',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la salida',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  const handleSubmitFormErrors = async  () => {
    try {
      const formData = getValues();
      const evaluarCantidad = formData.outForm.filter((id)=> id.cantidadDanados !== '0' && id.cantidadDanados !== 0).map((guest) => guest.cantidadDanados);

      if(evaluarCantidad.length === 0){
        onClose();
        reset();
        Swal.fire({
          icon: 'info',
          title: 'Registro de salida',
          text: 'Debe ingresar al menos un producto dañado',
          confirmButtonText: 'Ok'
        });
        return;
      }

      const inventarioId = formData.outForm.filter((id)=> id.cantidadDanados !== '0' && id.cantidadDanados !== 0).map((guest) => guest.inventario_id);
      const cantidadDanados = formData.outForm.filter((id)=> id.cantidadDanados !== '0' && id.cantidadDanados !== 0).map((guest) => guest.cantidadDanados);
      const total = formData.outForm.filter((id)=> id.cantidadDanados !== '0' && id.cantidadDanados !== 0).map((guest) => (guest.cantidadDanados * guest.costo) * (guest.multa + 1));
      const guestsData = [
        {
          "INVENTARIO_ID": inventarioId
        },
        {
          "CANTIDAD": cantidadDanados
        },
      ];
  

      const checkOutForm = {
        access_token: user.access_token,
        reservation_id: idReserva,
        usuario_id: idUsuario,
        total : total[0],
        guestsData: guestsData
      }

      await realizarCheckOut(checkOutForm);

      onClose();
      reset(); 
      Swal.fire({
        icon: 'success',
        title: 'Registro de salida',
        text: 'Se ha registrado la salida del huesped',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la salida',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }

  useEffect(() => {
    if (productos && productos.length > 0) {
      const outFormData = productos.map((guest) => ({
        inventario_id: guest.INVENTARIO_ID,
        multa: guest.PORCENTAJE_MULTA,
        costo: guest.VALOR,
        cantidad: guest.CANTIDAD,
       
        cantidadDanados: 0
      }));
  
      reset({ outForm: outFormData});
    }
  },[productos, reset]);


  return (
    <Dialog open={showModal}  aria-labelledby="modalRegistro" size="xl">
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Proceso de Salida </span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={onClose}
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
          <Typography className="my-2 " variant="h5">
            Huesped titular
          </Typography>

          <Card className="w-full rounded-none overflow-auto mb-12">
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
                    <tr key={item?.USUARIO_ID}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.RUT_TITULAR}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.NOMBRE}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.APELLIDO}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.TELEFONO_TITULAR}
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
          
          {

            !isCheckboxChecked && (
              <div>
                <Typography className="my-2 " variant="h5">
                  Inventario
                </Typography>
                <Card className="w-full rounded-none overflow-auto mb-12">
                <div className="max-h-[16rem] overflow-y-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr>
                      {TABLE_HEAD_INVENTARIO.map((head) => (
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
                      
                      productos  && productos.length > 0  ? (
                      
                      productos.map((item, index) => {
                      const isLast = index === productos.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                      return (
                        <tr key={item?.INVENTARIO_ID}>
                          <td  {...register(`outForm[${index}].inventario_id`)} hidden></td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.NOMBRE}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              {...register(`outForm[${index}].multa`)}
                            >
                              {(item?.PORCENTAJE_MULTA * 100)}%
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              {...register(`outForm[${index}].costo`)}
                            >
                              {formatNumberWithDollar(item?.VALOR)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              {...register(`outForm[${index}].cantidad`)}
                            >
                              {item?.CANTIDAD}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Input className="w-5" min={0} max={item?.CANTIDAD}
                            label="Cantidad dañado" color="blue" type="number" 
                            name={`outForm[${index}].cantidadDanados`} size="md" 
                            {...register(`outForm[${index}].cantidadDanados`, {
                              setValueAs: value => value === "" ? null : Number(value),
                            })}
                            
                            error={Boolean(errors?.outForm?.[index]?.cantidadDanados)} 
                            success={Boolean(getValues(`outForm[${index}].cantidadDanados`))}
                            />
                            {errors?.outForm?.[index]?.cantidadDanados && (
                              <div className="absolute left-0   bg-red-500 text-white text-xs mt-1 rounded-lg  px-2">
                                {errors.outForm[index].cantidadDanados.message}
                              </div>
                            )}
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
              </div>
            )
          }      

        <div className="flex items-center justify-center mt-6">
          <Checkbox color="blue" defaultChecked  onChange={handleCheckboxChange} />
          <span className="text-xs">Todo se encuentra en orden dentro del inmueble al momento de la recepción</span>
        </div>
      </DialogBody>
      <DialogFooter className="p-2 my-4 border-t-2 border-gray-100 gap-4">
      <button
          onClick={onClose}
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>
      {
          isCheckboxChecked && (
            <div className="flex items-center justify-around">
              <button onClick={handleSubmitForm}
                className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
              >
                Registrar Salida
              </button>
            </div>
          )
        }

        {
          !isCheckboxChecked && (

            <div className="flex items-center justify-around">
              <button
                onClick={handleSubmitFormErrors}
                className="text-white   bg-red-500 hover:bg-red-100 focus:ring-4 focus:ring-red-300 rounded-lg border border-red-200 text-sm font-semibold px-5 py-2.5 hover:text-red-900 focus:outline-none focus:z-10"
              >
                Generar Multa y Registrar Salida
              </button>
            </div>

          )
        }


      </DialogFooter>
    </Dialog>
  );
};

ModalRegistroSalida.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  idReserva: PropTypes.number.isRequired,
  idDepto: PropTypes.number.isRequired,
  idUsuario: PropTypes.number.isRequired,
}

export default ModalRegistroSalida;
