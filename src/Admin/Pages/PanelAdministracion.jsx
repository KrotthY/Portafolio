
import {  Chip, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useSession from "../../Auth/Context/UseSession";
import ModalEdit from "../Components/PanelAdministracion/ModalEdit";
import ModalView from "../Components/PanelAdministracion/ModalView";
import ModalMaintence from "../Components/PanelAdministracion/ModalMaintence";
import ModalCreate from "../Components/PanelAdministracion/ModalCreate";
import { eliminarDpto } from "../Api/Departamento/eliminarDpto";
import Swal from "sweetalert2";
import formatNumberWithDollar from "../Assets/js/formatNumberDollar";

const URL_API_GET_DEPTO = 'https://fastapi-gv342xsbja-tl.a.run.app/departamentos/admin';


const PanelAdministracion = () => {

  const [currentDeptoId, setCurrentDeptoId] = useState(null);
  const [ depto , setDepto ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const { user } = useSession();

  const cargarDepartamentos =  () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    };

    fetch(URL_API_GET_DEPTO,requestOptions)
      .then(response => response.json())
      .then(data => {
        setDepto(data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    cargarDepartamentos();
  }, []);



  const evaluateStatusBtn = (idPropiedad, estado) => {
    const evaluarEstado = estado === "S" ? 1 :  2 ;
    const changeEstado = estado === "S" ? "N" : "S" ;

    return (
        evaluarEstado === 1 ? (
      <div className="font-extrabold flex items-center gap-x-6">
        <Tooltip content="Editar propiedad" placement="top">
        <button onClick={(e)=>{handleOpenModalEdit(e,idPropiedad)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-blue-500 bg-blue-300 group  active:bg-blue-500 active:border-blue-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-blue-300 hover:bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
          </svg>
          </span>
        </button>
        </Tooltip>

        <Tooltip content="Ver propiedad" placement="top">
        <button onClick={(e)=>{handleOpenModalView(e,idPropiedad)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-blue-500 bg-blue-300 group active:bg-blue-500 active:border-blue-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-blue-300 hover:bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/></svg>
          </span>
        </button>
        </Tooltip>

        <Tooltip content="Mantención de propiedad" placement="top">
        <button onClick={(e)=>{handleOpenModalMaintence(e,idPropiedad)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-yellow-500 bg-yellow-300 group active:bg-yellow-500 active:border-yellow-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-yellow-300 hover:bg-yellow-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#000"}}  xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          </span>
        </button>
        </Tooltip>

        <Tooltip content="Desahabilitar propiedad" placement="top">
        <button onClick={(e)=>{handleDeptoDelete(e,idPropiedad,changeEstado)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
          </span>
        </button>
        </Tooltip>
      </div>) : (
          <div className="font-extrabold flex items-center gap-x-6">
          <Tooltip content="Editar propiedad" placement="top">
          <button className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-gray-500 bg-gray-300 group  active:bg-gray-500 active:border-gray-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-gray-300 hover:bg-gray-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512">
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
          </svg>
          </span>
          </button>
          </Tooltip>

          <Tooltip content="Ver propiedad" placement="top">
          <button className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-gray-500 bg-gray-300 group active:bg-gray-500 active:border-gray-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-gray-300 hover:bg-gray-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/></svg>
          
          </span>
          </button>
          </Tooltip>

          <Tooltip content="Mantención de propiedad" placement="top">
          <button className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-gray-500 bg-gray-300 group active:bg-gray-500 active:border-gray-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-gray-300 hover:bg-gray-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg style={{fill:"#fff"}}  xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          </span>
          </button>
          </Tooltip>

          <Tooltip content="Habilitar propiedad" placement="top">
          <button  onClick={(e)=>{handleDeptoDelete(e,idPropiedad,changeEstado)}} className="rounded-lg  relative w-12 h-10 overflow-x-hidden cursor-pointer flex items-center border border-blue-500 bg-blue-300 group active:bg-blue-500 active:border-blue-500">
          <span className="absolute right-0 h-full w-11 rounded-lg bg-blue-300 hover:bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <svg style={{fill:"#fff"}} xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
          </span>
          </button>
          </Tooltip>
          </div>
        )
      
    );
    
  };

  const evaluateStatusDepto = (estadoDpto) => {
    const estado = estadoDpto === "S" ? 1 :  2 ;
    switch (estado) {
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
            <span className="mx-auto mt-1 block h-2 w-2  bg-red-900 content-['']" />
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

  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleOpenModalCreate = (e) => {
    e.preventDefault();
    setShowModalCreate(true);
  }

  const closeModalCreate = () => {
    cargarDepartamentos();
    setShowModalCreate(false);
  }


  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleOpenModalEdit = (e,idPropiedad) => {
    e.preventDefault();
    setCurrentDeptoId(idPropiedad)
    setShowModalEdit(true);
  }
  
  const closeModalEdit = () => {
    setShowModalEdit(false);
    cargarDepartamentos();
  }


  const [showModalView, setShowModalView] = useState(false);

  const handleOpenModalView = (e,idPropiedad) => {
    e.preventDefault();
    setCurrentDeptoId(idPropiedad)
    setShowModalView(true);
  }
  
  const closeModalView = () => {
    setShowModalView(false);
    cargarDepartamentos();
  }

  const [showModalMaintence, setShowModalMaintence] = useState(false);

  const handleOpenModalMaintence = (e,idPropiedad) => {
    e.preventDefault();
    setCurrentDeptoId(idPropiedad)
    setShowModalMaintence(true);
  }
  
  const closeModalMaintence= () => {
    setShowModalMaintence(false);
    cargarDepartamentos();
  }


  const handleDeptoDelete =  (e,idPropiedad,changeEstado) => {
    try {
      const borrarDepartamento = {
        "access_token":user.access_token,
        "dptoId":idPropiedad,
        "changeEstado":changeEstado
      }

      const message = changeEstado === "N" ? "¿Deseas deshabilitar la propiedad ?" : "¿Deseas habilitar la propiedad ?" ;

      Swal.fire({
        title: '¡Estás seguro!',
        text: `${message}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4299e1',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Si, actualizar departamento',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarDpto(borrarDepartamento)
          Swal.fire({
            icon: 'success',
            title: 'Departamento actualizado',
            text: 'El departamento se ha actualizado correctamente',
            confirmButtonText: 'Ok'
          })
          cargarDepartamentos();
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar departamento',
        text: error,
        confirmButtonText: 'Ok'
      });
    }
  }
  
  return (
    <>
      <div className="flex flex-col items-center ">
      <Typography variant="h3">
        Administración de Propiedades
      </Typography>
      </div>        
      <div className="flex flex-col justify-start gap-2">
          <Typography variant="h5" color="blue-gray">
            Lista de Propiedades
          </Typography>
          <Typography color="gray" className=" font-normal">
          En esta Seccion podras gestionar las Propiedades.
          </Typography>
      </div>

    <section className="my-3 w-full ">
    <div className="bg-gray-100 p-1">
      <div className="mx-auto">
        <div className="bg-white relative shadow-2xl overflow-hidden">
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
              > Crear Propiedad </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-md text-gray-700 bg-blue-100  text-center">
                <tr>
                 
                  <th scope="col" className="px-4 py-3 w-auto">Nombre</th>
                  <th scope="col" className="px-4 py-3 w-auto">Estado propiedad</th>
                  <th scope="col" className="px-4 py-3 w-auto">Tarifa Diaría</th> 
                  <th scope="col" className="px-4 py-3 w-auto">Dirección</th>
                  <th scope="col" className="relative py-3.5 px-4 w-auto">Acciones</th> 
                </tr>
              </thead>
              <tbody>
                {filteredDepto
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((departamentoItem) => (
                  <tr key={departamentoItem.DEPARTAMENTO_ID} className="hover:bg-gray-100 italic  text-center  border-b-4">
                    
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{departamentoItem.NOMBRE}</td>
                    <td className="px-4 py-4 ">{evaluateStatusDepto(departamentoItem.ACTIVO)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{formatNumberWithDollar(departamentoItem.TARIFA_DIARIA)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">{departamentoItem.DIRECCION}</td>
                    <td className="px-4 py-4 text-sm flex items-center justify-center">
                      {evaluateStatusBtn( departamentoItem.DEPARTAMENTO_ID,departamentoItem.ACTIVO)}
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
    <ModalCreate onClose={closeModalCreate} showModal={showModalCreate} />
    
    <ModalEdit onClose={closeModalEdit} showModal={showModalEdit} deptoId={currentDeptoId} />
    <ModalView onClose={closeModalView} showModal={showModalView} deptoId={currentDeptoId}/>
    <ModalMaintence onClose={closeModalMaintence} showModal={showModalMaintence} deptoId={currentDeptoId}/>

  </section>
    </>
  );
};

export default PanelAdministracion;
