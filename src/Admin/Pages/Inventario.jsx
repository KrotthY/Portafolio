
import { Chip, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useSession from "../../Auth/Context/UseSession";
import formatNumberWithDollar from "../Assets/js/formatNumberDollar";
import { ModalViewInventario } from "../Components";

const URL_API_GET_DEPARTMENTOS = 'https://fastapi-gv342xsbja-tl.a.run.app/departamentos/admin';


const Inventario = () => {

  const [currentInventarioId, setCurrentInventarioId] = useState(null);
  const [ departamentosGet , setDepartamentos ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const { user } = useSession();

  const cargarDptos =  () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_DEPARTMENTOS,requestOptions)
      .then(response => response.json())
      .then(data => {
        setDepartamentos(data)
      })
      .catch(error => console.log(error))
  };

  useEffect(() => {
    cargarDptos();
  },[]);

  const evaluateStatusDepto = (estadoTour) => {
    const tipoEstado = estadoTour === "S" ? 1 : 2 ;
    switch (tipoEstado) {
      case 1:
        return (

        <Chip
        variant="ghost"
        color="green"
        size="sm"
        value="Activo"
        icon={
          <span className="mx-auto  block mt-1 h-2 w-2 rounded-full bg-green-900 content-['']" />
        }
      />
        );
      
      case 2:
        return (
          <Chip
          variant="ghost"
          color="red"
          size="sm"
          value="Inactivo"
          icon={
            <span className="mx-auto block mt-1 h-2 w-2  bg-red-900 content-['']" />
          }
        />
        );
    }
  };

  const evaluateStatusBtn = (idProducto) => {
    return (
      <div className="font-extrabold flex items-center gap-x-6">
        <Tooltip content="Ver inventario" placement="right">
        <button onClick={(e)=>{handleOpenModalEdit(e,idProducto)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-blue-500 bg-blue-300 group  active:bg-blue-500 active:border-blue-500" href="{{ route('process.create') }}">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-blue-300 hover:bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 384 512"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"/></svg>
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

  const filteredInventario = departamentosGet.filter((productosItem) => {
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



  const [showModalView, setShowModalView] = useState(false);

  const handleOpenModalEdit = (e,idDepto) => {
    e.preventDefault();
    setCurrentInventarioId(idDepto)
    setShowModalView(true);
  }
  
  const closeModalEdit = () => {
    cargarDptos();
    setShowModalView(false);
  }


  return (
    <>
      <div className="flex flex-col items-center ">
      <Typography variant="h3">
        Inventario
      </Typography>
      </div>        
      <div className="flex flex-col justify-start gap-2">
          <Typography variant="h5" color="blue-gray">
            Lista de propiedades
          </Typography>
          <Typography color="gray" className=" font-normal">
          En esta Seccion podras gestionar el inventario asociado a tus propiedades.
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
 
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-md text-gray-700 bg-blue-100  text-center">
                <tr>

                  <th scope="col" className="px-4 py-3 w-auto">Nombre</th>
                  <th scope="col" className="px-4 py-3 w-auto">Estado </th> 
                  <th scope="col" className="px-4 py-3 w-auto">Dirección</th> 
                  <th scope="col" className="px-4 py-3 w-auto">Costo diario</th>
                  <th scope="col" className="relative py-3.5 px-4 w-auto">Acciones</th> 
                </tr>
              </thead>
              <tbody>
                {filteredInventario
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((inventarioItem) => (
                  <tr key={inventarioItem.DEPARTAMENTO_ID} className="hover:bg-gray-100 italic  text-center  border-b-4 shadow-md">

                    <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{inventarioItem.NOMBRE}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">{evaluateStatusDepto(inventarioItem.ACTIVO)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">{inventarioItem.DIRECCION}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">{ formatNumberWithDollar(inventarioItem.TARIFA_DIARIA) }</td>
                    <td className="px-4 py-4 text-sm flex items-center justify-center">
                      {evaluateStatusBtn( inventarioItem.DEPARTAMENTO_ID)}
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
    <ModalViewInventario onClose={closeModalEdit} showModal={showModalView} deptoId={currentInventarioId} /> 

  </section>
    </>
  );
};

export default Inventario;
