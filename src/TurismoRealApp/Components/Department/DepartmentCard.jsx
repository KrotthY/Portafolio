import { Link } from "react-router-dom";
import { IconBath, IconBed, IconBedroom } from "../../../Assets"
import PropTypes from 'prop-types';
import { useState } from "react";
import { Chip } from '@material-tailwind/react';

const DepartmentCard = ({imgSrc, title,description, location,tipo, identificadorDpto ,qtyBathroom, qtyBed,qtyRoom, price, idApartment }) => {

  const [dptoStatus, setStatus ] = useState("Casa")

  const isAvailable = dptoStatus === tipo;
  const chipColor = isAvailable ? 'brown' : 'orange';

  return (
    <>
      <div className="cards  mx-2 max-w-xs  rounded-t-lg bg-white  text-gray-700 shadow-xl font-sans">
          <div className="relative mx-4 mt-4 overflow-hidden rounded bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src= { imgSrc }
              alt="ui/ux review check"
              className="h-80 object-center w-full"
            />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            <button
              className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle  text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-dark="true"
            >
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">

              </span>
            </button>
          </div>
          <div className="p-6">
            <Chip
            variant="ghost"
            color={chipColor}
            size="sm"
            value={tipo}
            icon={
              <span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${ dptoStatus === tipo ? 'bg-brown-900' : 'bg-orange-900'}`} />
            }

          />
            <div className="mb-3 flex flex-col items-start">
              <h4 className="block text-base font-medium leading-snug tracking-normal text-blue-gray-900 antialiased py-2">
                { title }
              </h4>
              <h6 className="text-sm tracking-normal antialiased leading-snug">
              { location } {identificadorDpto !== null && ` - ${identificadorDpto} `}
              </h6>
            </div>
            <div className="flex flex-col items-center">
              <p className="block  text-xs font-light leading-relaxed text-gray-700 antialiased h-32 py-6">
                { description }
              </p>
            </div>
            <div>
              <article className="grid grid-cols-2 gap-4">
                <div>
                  <p className="flex items-center justify-around text-xs font-light leading-relaxed text-gray-700 antialiased">
                    <IconBath /> Baños: {qtyBathroom}
                  </p>
                  <p className="flex items-center justify-around text-xs font-light leading-relaxed text-gray-700 antialiased">
                    <IconBed />Camas: {qtyBed}
                  </p>
                </div>
                <p className="flex items-center justify-around text-xs font-light leading-relaxed text-gray-700 antialiased">
                  <IconBedroom/> Habitaciones: {qtyRoom}
                </p>
              </article>

              <p className="flex justify-evenly items-center pt-5 text-base text-center font-bold leading-relaxed text-gray-900 antialiased ">
                Precio x Noche: $ { price.toLocaleString('de-DE') }
              </p>
            </div>
          </div>
          <div className="w-full">
            <Link
              to= { `/departamentos/${idApartment}` }
              onClick={() => window.scrollTo(0, 0)} 
            >
              <button
                className=" w-full select-none bg-blue-500 py-3.5 px-7 text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
                >
                Reservar
              </button>
              </Link>
          </div>
      </div>
    </>
  )
}

DepartmentCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,   
  location: PropTypes.string,
  tipo: PropTypes.string,
  identificadorDpto: PropTypes.string,
  qtyBathroom: PropTypes.number,
  qtyBed: PropTypes.number,
  qtyRoom: PropTypes.number,
  price: PropTypes.number,     
  idApartment: PropTypes.number,
  
}

export default DepartmentCard