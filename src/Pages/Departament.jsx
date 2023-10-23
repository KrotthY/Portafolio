import DepartmentCard from "../Components/Department/DepartmentCard"
import { Filter, HeroDepartment } from "../Ui"

export const Departament = () => {
  return (
    <>
    <HeroDepartment />
    <Filter />
    <section id="main-content" className="mx-auto w-full max-w-container px-4 sm:px-6 py-12  lg:px-8 bg-gray-50  ">
      
      <div className="mx-auto grid w-full justify-center  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16">
        <DepartmentCard imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" title="Los Angeles" location="Biobío" description={"Buen Lugar"} price={20000} qualification={4.3} idApartment={1}/>
        <DepartmentCard imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" title="Puerto Montt" location="Los lagos" description={"Puerto Montt es el punto de partida para explorar la región de los lagos y fiordos de Chile."} price={52000} qualification={2.2} idApartment={2}/>
      </div>
    </section>

    </>
  )
}
