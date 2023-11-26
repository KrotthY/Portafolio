import PropTypes from 'prop-types';
import { Chip } from '@material-tailwind/react';
import { useState } from 'react';

const TourOfferCard = ({ idTour, imgSrc,qtyPerson,description,title,price,status}) => {

  const [offerStatus, setStatus ] = useState("S")

  const isAvailable = offerStatus === status;
  const chipColor = isAvailable ? 'green' : 'red';
  const chipValue = isAvailable ? 'Disponible' : 'Agotado';

  
  return (
    <div className="w-full select-none">
      <div className="overflow-hidden shadow-md">
        <img className="w-full h-24 object-cover object-center" src={imgSrc} alt={`Imgen del ${ title }`} />
        <div className="p-4 cursor-pointer">
          <div className='flex justify-between' >
          <h5 className="font-bold text-lg">{title}</h5>
          <Chip
            variant="ghost"
            color={chipColor}
            size="sm"
            value={chipValue}
            icon={
              <span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${ offerStatus === status ? 'bg-green-900' : 'bg-red-900'}`} />
            }
          />
          </div>
            <p className="text-xs flex items-center justify-between">
              {qtyPerson}
            </p>
            <p className="text-xs font-normal my-2 ">
              {description}
            </p>   
            <div className="flex justify-center items-center">
              <p className=" text-xs font-bold">
                ${ price && (price.toLocaleString('de-DE'))} desde x persona
              </p>
            </div>
              <p className='text-xs font-extralight my-2'>
                Para agendar un tour debe poseer una reserva, por favor revise las ofertas en la pagina de tours
              </p>
        </div>
      </div>
    </div>
  );
}

TourOfferCard.propTypes = {
  idTour: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  qtyPerson: PropTypes.number,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number,     
  status: PropTypes.string     
};

export default TourOfferCard;
