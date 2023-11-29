import { Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Card, Tooltip, Spinner } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import useSession from "../../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { eliminarInventario } from "../../Api";
import formatNumberWithDollar from "../../Assets/js/formatNumberDollar";



const ModalEditView = ({onClose,showModal,deptoId}) => {

  const  { user }  = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [productosIdSelected, setDeptoId] = useState(null);
  const cargarDptos = () => {
    setIsLoading(true);
    const URL_API_GET_DEPTO_ID = `https://fastapi-gv342xsbja-tl.a.run.app/productos_por_dpto/${deptoId}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.access_token}`,
      },
    };
    
    fetch(URL_API_GET_DEPTO_ID, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        setTimeout(() => {
          setDeptoId(data);
          setIsLoading(false); 
        }, 300); 
      } else {
        setDeptoId(data);
        setIsLoading(false);
      }

    })
    .catch(error => {
      setIsLoading(false);
    });
  }


  useEffect(() => {
    if(deptoId){

      cargarDptos();
    }
  }, [deptoId])


  const TABLE_HEAD = ["Nombre","Descripcion","Valor",  ""];

  const handleDeptoDelete = async (e,idInventario) => {
    e.preventDefault();
    try {
      const borrarAgenda = {
        "access_token":user.access_token,
        "inventory_id":idInventario,
      }
      await eliminarInventario(borrarAgenda)

      cargarDptos();
    } catch (error) {
      onClose(); 
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar de la agenda.',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }
  return (
    <Dialog open={showModal}  aria-labelledby="modalEditarProductos" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <div className="flex justify-start items-center gap-1">
          <span className="text-2xl tracking-tight font-extrabold text-gray-900">Ver detalles de la propiedad</span>
        </div>
        
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={ () => {
          onClose();
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
        <Typography variant="h6">
          Información del inventario
        </Typography>
        <div className="grid grid-cols-1   gap-6  my-6 ">
          {
            isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner  color="blue" className="h-12 w-12"/> 
              </div>
            ) : (
            



          <Card className="w-full rounded-none overflow-auto">
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
                    
                    
                    productosIdSelected  && productosIdSelected.length > 0  ? (
                    
                      productosIdSelected.map((item, index) => {
                    const isLast = index === productosIdSelected.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={item.INVENTARIO_ID}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.NOMBRE}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.DESCRIPCION}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatNumberWithDollar(item.VALOR)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Eliminar inventario" placement="top">
                            <button onClick={
                              (e) => {
                                handleDeptoDelete(e,item.INVENTARIO_ID);
                              }
                            }  
                              className="rounded-full  relative w-full h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-600 active:border-red-600">
                              <span className=" right-0 h-full w-full rounded-full bg-red-300 hover:bg-red-600 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                              <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                              </span>
                            </button>
                          </Tooltip>
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
          
          )}

        </div>
      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
      <button
            onClick={ () => {
              
              onClose();
            }}
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-white focus:outline-none focus:z-10"
        >
          Cerrar inventario
        </button>
      </DialogFooter>
    </Dialog>
  );
};

ModalEditView.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  deptoId: PropTypes.number,
}

export default ModalEditView;
