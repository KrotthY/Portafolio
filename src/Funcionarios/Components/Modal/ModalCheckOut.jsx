import { Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Card, List, ListItem, ListItemPrefix, Input } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import useSession from "../../../Auth/Context/UseSession";
import { useEffect, useState } from "react";
import formatNumberWithDollar from "../../../Admin/Assets/js/formatNumberDollar";

const ModalRegistroSalida = ({onClose,showModal,idReserva,idDepto}) => {
  const { user } = useSession();
  const [ checkIn , setCheckIn ] = useState([]);
  const [ productos , setProductos ] = useState([]);
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
  const TABLE_HEAD_INVENTARIO = ["Nombre","Multa","Costo","Cantidad","Cantidad dañados",""];

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

const handleCheckboxChange = (e) => {
  if(idDepto){
    cargarProductos(idDepto);
  }
  setIsCheckboxChecked(e.target.checked);
};



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
                              {(item?.PORCENTAJE_MULTA * 100)}%
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {formatNumberWithDollar(item?.VALOR)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item?.CANTIDAD}
                            </Typography>
                          </td>
                          <td className={classes}>
                            
                            <Input className="w-5" label="Cantidad dañado" color="blue" type="number" name="cantidadDanados" size="md" />

                          </td>
                          <td className={classes}>
                          <Card className="p-1">
                            <List className="m-0"> 
                              <ListItem className="p-1"> 
                                <label
                                  htmlFor={`vertical-list-svelte${index}`}
                                  className="flex w-full cursor-pointer items-center"
                                >
                                  <ListItemPrefix className="p-0"> 
                                    <Checkbox
                                      id={`vertical-list-svelte${index}`}
                                      ripple={false}
                                      className="hover:before:opacity-0"
                                      containerProps={{
                                        className: "p-0",
                                      }}
                                    />
                                  </ListItemPrefix>
                                  <Typography color="blue-gray" className="font-medium select-none text-sm"> 
                                    ¿Dañado?
                                  </Typography>
                                </label>
                              </ListItem>
                            </List>
</Card>

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
          <Checkbox color="blue" defaultChecked onChange={handleCheckboxChange} />
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
              <button
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
}

export default ModalRegistroSalida;
