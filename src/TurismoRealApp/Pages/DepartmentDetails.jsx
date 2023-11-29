
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import CardReserva from "../Components/Department/DepartamentCardReserva";
import ListServices from "../Components/Department/DepartmentCardServices";
import { DepartmentAccordion } from "../Components";
import DepartamentoModal from "../Components/Department/DepartmentReservaModal";


const DepartmentDetails = () => {


  const { id } = useParams();
  
  const URL_API_GET_DEPARTMENTS_ID = `https://fastapi-gv342xsbja-tl.a.run.app/departamentos/${id}`;
  const [deparmentsId, setDeparmentsId] = useState(null);

  const cargarDptos = () => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_DEPARTMENTS_ID, requestOptions)
      .then(response => response.json())
      .then(data => {
        setDeparmentsId(data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    cargarDptos();
  }, []);
  

  const [showModal, setShowModal] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  
  const closeModal = () => {
    cargarDptos();
    setShowModal(false);
  }

const [parentTotalCost, setParentTotalCost] = useState(0);
const handleTotalCostChange = (cost) => {
    setParentTotalCost(cost);
};

const [parentHuesped, setParentHuesped] = useState(0);

const handlePersonChange = (person) => {
  setParentHuesped(person);
};

const [parentDateSelected, setParentDateSelected] = useState({
  startDate: null,
  endDate: null
});
const handleDateSelected = (dateSelected) => {
  setParentDateSelected(dateSelected);
};




  return (
    <>
    <section className="py-10 mx-auto max-w-7xl">
      <div className="flex justify-start items-center py-6">
        <h4 className=" antialiased tracking-normal leading-5  text-2xl font-semibold decoration-inherit ">
          {deparmentsId?.NOMBRE} <span className="font-light text-xl"> - {deparmentsId?.TIPO}</span> 
        </h4>
      </div>
      <div className="mb-6">
        <h6 className="font-light text-base leading-3 ">
        {deparmentsId?.NOMBRE_REGION}  -  {deparmentsId?.NOMBRE_COMUNA} 
        </h6>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 py-6 gap-4">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2">
          <img
            src="https://images.pexels.com/photos/2635835/pexels-photo-2635835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="row-span-1  rounded-l-lg w-full h-full" 
            alt="prod1"
          />
          <img
            src="https://images.pexels.com/photos/161124/abbaye-de-senanque-monastery-abbey-notre-dame-de-senanque-161124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="prod2"
            className=" w-full h-full"
          />
          <img
            src="https://media.istockphoto.com/id/1165384568/es/foto/complejo-moderno-de-edificios-residenciales-en-europa.jpg?s=2048x2048&w=is&k=20&c=E9ddfbNLOJw0NKIaKF6180TLCPuC4Se00DoCzf2VwFA="
            alt="prod3"
            className="  rounded-l-lg w-full h-full"
          />
          <img
            src="https://media.istockphoto.com/id/1165384568/es/foto/complejo-moderno-de-edificios-residenciales-en-europa.jpg?s=2048x2048&w=is&k=20&c=E9ddfbNLOJw0NKIaKF6180TLCPuC4Se00DoCzf2VwFA="
            alt="prod4"
            className=" w-full h-full"
          />
        </div>

        <div className="flex justify-center w-full h-full">
          <img
            src="https://images.pexels.com/photos/7129137/pexels-photo-7129137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full  rounded-r-lg"
            alt="prod5"
          />
        </div>
      </div>


        <div className="grid grid-cols-2 mt-12">
          <div className="col-span-1 h-full w-full">
            <p className="block antialiased  text-base italic font-normal decoration-inherit mb-5 mt-3  leading-[27px]  pb-12">
            { deparmentsId?.DESCRIPCION}
            </p>
            <article className="my-12">
              <ul className="flex items-center justify-between text-base font-light leading-relaxed text-gray-700 antialiased">
                <li>Baños: { deparmentsId?.BANOS } </li>
                <li>Camas:{ deparmentsId?.CAMAS } </li>
                <li>Habitaciones: { deparmentsId?.DORMITORIOS }</li>
              </ul>
            </article>
            <div className="mb-8 mt-3 flex flex-col items-start  gap-4">
              <span className="text-lg font-normal" >Servicios</span>
              {deparmentsId && <ListServices SERVICIOS={deparmentsId.SERVICIOS} />}
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center ">
            <CardReserva onDateSelected={ handleDateSelected } onTotalPersonChange={handlePersonChange} onTotalCostChange={handleTotalCostChange} handleOpenModal={handleOpen} MAX_HUESPEDES={deparmentsId?.MAX_HUESPEDES}   TARIFA_DIARIA={deparmentsId?.TARIFA_DIARIA}  DIAS_RESERVADOS={deparmentsId?.DIAS_RESERVADOS} />
          </div>
          < DepartamentoModal 
            showModal={showModal}
            onClose={closeModal}
            idDepartamento={deparmentsId?.DEPARTAMENTO_ID}
            NOMBRE_TOUR={deparmentsId?.NOMBRE}
            NOMBRE_COMUNA={deparmentsId?.NOMBRE_COMUNA}
            NOMBRE_REGION={deparmentsId?.NOMBRE_REGION}
            parentTotalCost={parentTotalCost}
            parentHuesped={parentHuesped}
            parentDateSelected={parentDateSelected}
            />
        </div>
        <div className="mt-36">
        <DepartmentAccordion/>
        </div>
    </section>
    </>
  )
}


export default DepartmentDetails