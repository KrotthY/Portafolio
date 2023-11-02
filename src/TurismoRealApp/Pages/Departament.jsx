import { DepartmentCard } from "../Components"
import { Filter, HeroDepartment } from "../../Ui"
import { useEffect, useState } from "react"
const URL_API_GET_DEPARTMENTS = 'https://fastapi-gv342xsbja-tl.a.run.app/departamentos';

export const Departament = () => {

  const [ deparments , setDeparments ] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_DEPARTMENTS,requestOptions)
      .then(response => response.json())
      .then(data => {
        setDeparments(data)
        console.log(data)
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <>
    <HeroDepartment />
    <Filter />
    <section id="main-content" className=" font-sans mx-auto w-full max-w-container px-4 sm:px-6 py-12  lg:px-8 bg-gray-50  ">
      <div className="mx-auto grid w-full justify-center  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 ">
      {
        deparments.map((apartment) => (
          <DepartmentCard key={apartment.DEPARTAMENTO_ID} imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" 
            title={apartment.NOMBRE} description={ apartment.DESCRIPCION} location={apartment.DIRECCION} tipo={apartment.TIPO} 
            identificadorDpto={apartment.NUMERO_DPTO} qtyBathroom={apartment.BANOS} qtyBed={ apartment. CAMAS} 
            qtyRoom={apartment.DORMITORIOS } price = {apartment.TARIFA_DIARIA} idApartment={ apartment.DEPARTAMENTO_ID}
          />
        ))
      }
        
      </div>
    </section>

    </>
  )
}