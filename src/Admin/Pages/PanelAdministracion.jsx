
import {  Chip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const URL_API_GET_DEPTO = 'https://fastapi-gv342xsbja-tl.a.run.app/departamentos';


const PanelAdministracion = () => {

  const [ depto , setDepto ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_DEPTO,requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDepto(data)
      })
      .catch(error => console.log(error))
  }, []);



  const evaluateStatusBtn = (estadoRespuesta) => {
    
    switch (estadoRespuesta) {
      case 1:
        return (
          <div className="font-extrabold flex items-center gap-x-6">
            <button onClick={handleOpenModalCheckIn} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-green-500 bg-green-300 group  active:bg-green-500 active:border-green-500" href="{{ route('process.create') }}">
              <span className="absolute right-0 h-full w-10 rounded-lg bg-green-300 hover:bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
              </span>
            </button>
            <button onClick={handleOpenModalCheckOut} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500" href="{{ route('process.create') }}">
              <span className="absolute right-0 h-full w-10 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 576 512"><path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"/></svg>
              </span>
            </button>
            <button onClick={handleOpenModalCheckOut} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500" href="{{ route('process.create') }}">
              <span className="absolute right-0 h-full w-10 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 576 512"><path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"/></svg>
              </span>
            </button>
            <button onClick={handleOpenModalCheckOut} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500" href="{{ route('process.create') }}">
              <span className="absolute right-0 h-full w-10 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 576 512"><path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"/></svg>
              </span>
            </button>
          </div>
          
        );
    }
  };

  const evaluateStatusDepto = (estadoDpto) => {
    
    switch (estadoDpto) {
      case 1:
        return (

        <Chip
        variant="ghost"
        color="green"
        size="sm"
        value="Activo"
        icon={
          <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
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
            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
          }
        />

          
        );
      default:
        return (
          <Chip
          variant="ghost"
          color="yellow"
          size="sm"
          value="Mantención"
          icon={
            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-yellow-900 content-['']" />
          }
        />

        );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const filteredDepto = depto.filter((departamentoItem) => {
    return Object.values(departamentoItem).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  })

  const totalItems = filteredDepto.length;
  const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastItemIndex = Math.min(firstItemIndex + itemsPerPage - 1, totalItems);
  
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  const [showModalIn, setShowModalIn] = useState(false);

  const handleOpenModalCheckIn = (e) => {
    e.preventDefault();
    setShowModalIn(true);
  }
  
  const closeModalIn = () => {
    setShowModalIn(false);
  }

  const [showModalOut, setShowModalOut] = useState(false);

  const handleOpenModalCheckOut = (e) => {
    e.preventDefault();
    setShowModalOut(true);
  }
  
  const closeModalOut = () => {
    setShowModalOut(false);
  }

  return (
    <>
      <div className="flex flex-col items-center ">
      <Typography className="py-6" variant="h3">
        Administración de Departamentos
      </Typography>
      </div>        
      <div className="mb-2 ml-6 flex flex-col justify-start gap-8">
          <Typography variant="h5" color="blue-gray">
            Lista de Departamentos
          </Typography>
          <Typography color="gray" className=" font-normal">
          En esta Seccion podras gestionar los departamentos de tu edificio.
          </Typography>
      </div>
      <section className="my-9 w-full">
    <div className="bg-gray-100 p-3 sm:p-5">
      <div className="mx-auto  px-1 lg:px-12">
        <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
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
                  <th scope="col" className="px-4 py-3 w-auto">ID</th> 
                  <th scope="col" className="px-4 py-3 w-auto">Nombre</th>
                  <th scope="col" className="px-4 py-3 w-auto">Estado departamento</th>
                  <th scope="col" className="px-4 py-3 w-auto">Tarifa Diaría</th> 
                  <th scope="col" className="px-4 py-3 w-auto">Dirección</th>
                  <th scope="col" className="relative py-3.5 px-4 w-auto">Acciones</th> 
                </tr>
              </thead>
              <tbody>
                {filteredDepto
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((departamentoItem) => (
                  <tr key={departamentoItem.DEPARTAMENTO_ID} className="hover:bg-gray-100 italic ">
                    <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap ">{departamentoItem.DEPARTAMENTO_ID}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{departamentoItem.NOMBRE}</td>
                    <td className="px-4 py-4 ">{evaluateStatusDepto(1)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{departamentoItem.TARIFA_DIARIA}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{departamentoItem.DIRECCION}</td>
                    <td className="px-4 py-4 text-sm flex items-center justify-center">
                      {evaluateStatusBtn(1)}
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
    
  </section>
    </>
  );
};

export default PanelAdministracion;
