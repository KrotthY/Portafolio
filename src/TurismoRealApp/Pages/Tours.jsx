import { TourCarousel, TourOffer } from "../Components";
import { useEffect, useState } from "react"

const URL_API_GET_TOUR = 'https://fastapi-gv342xsbja-tl.a.run.app/tours';

const Tours = () => {

  const [ tours , setTours ] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(URL_API_GET_TOUR,requestOptions)
      .then(response => response.json())
      .then(data => setTours(data))
      .catch(error => console.log(error))
  }, []);


  return (
    <>
      <div className="w-full h-[600px] mx-auto">
        <TourCarousel />
      </div>
      <div className=" mx-auto px-12 py-12 border-y-4 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {
            tours.map((tour) => (
              <TourOffer key={tour?.TOUR_ID} idTour={tour?.TOUR_ID} imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" qtyPerson={tour?.CAPACIDAD_PARTICIPANTES} description={tour.DESCRIPCION} title={tour.NOMBRE_TOUR} price={tour.VALOR_MINIMO}  status={tour.ACTIVO} />
            ))
          }
          
        </div>
      </div>
    </>
  );
}

export default Tours;
