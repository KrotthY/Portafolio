
import { Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useSession from "../../Auth/Context/UseSession";
import Swal from "sweetalert2";
import { eliminarProducto } from "../Api/Productos/eliminarProductos";
import { ModalCreateProductos, ModalEditProductos } from "../Components";
import formatNumberWithDollar from "../Assets/js/formatNumberDollar";

const URL_API_GET_PRODUCTOS = 'https://fastapi-gv342xsbja-tl.a.run.app/productos';


const Productos = () => {

  const [currentProductosId, setCurrentProductosId] = useState(null);
  const [ producto , setInventario ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const { user } = useSession();

  const cargarInventario =  () => {
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
        setInventario(data)
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    cargarInventario();
  },[]);



  const evaluateStatusBtn = (idProducto) => {
    return (
      <div className="font-extrabold flex items-center gap-x-6">
        <Tooltip content="Editar producto" placement="top">
        <button onClick={(e)=>{handleOpenModalEdit(e,idProducto)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-blue-500 bg-blue-300 group  active:bg-blue-500 active:border-blue-500" href="{{ route('process.create') }}">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-blue-300 hover:bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
          </svg>
          </span>
        </button>
        </Tooltip>


        <Tooltip content="Borrar producto" placement="top">
        <button onClick={(e)=>{handleDeptoDelete(e,idProducto)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500" href="{{ route('process.create') }}">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
          </span>
        </button>
        </Tooltip>
      </div>
      
    );
    
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const filteredInventario = producto.filter((productosItem) => {
    return Object.values(productosItem).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  })

  const totalItems = filteredInventario.length;
  const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastItemIndex = Math.min(firstItemIndex + itemsPerPage - 1, totalItems);
  
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleOpenModalCreate = (e) => {
    e.preventDefault();
    setShowModalCreate(true);
  }

  const closeModalCreate = () => {
    cargarInventario();
    setShowModalCreate(false);
  }


  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleOpenModalEdit = (e,idProducto) => {
    e.preventDefault();
    setCurrentProductosId(idProducto)
    setShowModalEdit(true);
  }
  
  const closeModalEdit = () => {
    cargarInventario();
    setShowModalEdit(false);
  }


  


  const handleDeptoDelete = (e,idProducto) => {
    e.preventDefault();
    try {
      const borrarInventario = {
        "access_token":user.access_token,
        "inventarioId":idProducto
      }

      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4299e1',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Si, borrar producto',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
        
          eliminarProducto(borrarInventario)
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto se ha eliminado correctamente',
            confirmButtonText: 'Ok'
          })
          cargarInventario()  
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar producto',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }
  


  return (
    <>
      <div className="flex flex-col items-center ">
      <Typography variant="h3">
        Administración de productos
      </Typography>
      </div>        
      <div className="flex flex-col justify-start gap-2">
          <Typography variant="h5" color="blue-gray">
            Lista de productos
          </Typography>
          <Typography color="gray" className=" font-normal">
          En esta Seccion podras gestionar los productos.
          </Typography>
      </div>
      <section className="my-3 w-full">
    <div className="bg-gray-100 p-1">
      <div className="mx-auto">
        <div className="bg-white  relative shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Buscar</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-red-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" 
                  id="simple-search" 
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2" placeholder="Buscar" required=""/>
                </div>
              </form>

            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenModalCreate}
              > Crear producto </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-md text-gray-700 bg-blue-100  text-center">
                <tr>
                 
                  <th scope="col" className="px-4 py-3 w-auto">Nombre</th>
                  <th scope="col" className="px-4 py-3 w-auto">Costo</th> 
                  <th scope="col" className="px-4 py-3 w-auto">Porcentaje de Multa</th>
                  <th scope="col" className="relative py-3.5 px-4 w-auto">Acciones</th> 
                </tr>
              </thead>
              <tbody>
                {filteredInventario
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((productosItem) => (
                  <tr key={productosItem.INVENTARIO_ID} className="hover:bg-gray-100 italic text-center  border-b-4 shadow-md">
                    
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{productosItem.NOMBRE}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{ formatNumberWithDollar(productosItem.VALOR) }</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{productosItem.PORCENTAJE_MULTA}</td>
                    <td className="px-4 py-4 text-sm flex items-center justify-center">
                      {evaluateStatusBtn( productosItem.INVENTARIO_ID)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
            </div>
              <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                  <span id="info" className="text-sm font-normal text-gray-500 ">
                      Mostrar
                      <span className="font-semibold text-gray-900 mx-2 ">{firstItemIndex}-{lastItemIndex}</span>
                      de
                      <span className="font-semibold text-gray-900 mx-2 ">{totalItems}</span>
                  </span>
                  <ul className="inline-flex items-stretch -space-x-px">
                      <li>
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage <= 1}
                          className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 ${currentPage <= 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                        >  
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#000000" fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </li>
                      <li>
                          <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                          {currentPage}
                          </span>
                      </li>
                      <li>
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage >= totalPages}
                          className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 ${currentPage >= totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                        >

                          <svg className="w-5 h-5" aria-hidden="true"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#000000" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </li>
                  </ul>
              </nav>
          </div>
        </div>
      </div>
    <ModalCreateProductos onClose={closeModalCreate} showModal={showModalCreate} /> 
    <ModalEditProductos onClose={closeModalEdit} showModal={showModalEdit} productosId={currentProductosId} /> 

  </section>
    </>
  );
};

export default Productos;
