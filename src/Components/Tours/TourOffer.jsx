import PropTypes from 'prop-types';
import Star from '../../Assets/icons/Star';
import StarHalf from '../../Assets/icons/StarHalf';
import { Chip } from '@material-tailwind/react';
import { useState } from 'react';

const TourOffer = ({ imgSrc, title, location, price,  qualification, status}) => {

  const [offerStatus, setStatus ] = useState(true)

  const isAvailable = offerStatus === status;
  const chipColor = isAvailable ? 'green' : 'red';
  const chipValue = isAvailable ? 'Disponible' : 'Agotado';

  return (
    <div className="w-full">
      <div className="rounded overflow-hidden shadow-md">
        <img className="w-full h-88 object-cover object-center" src={imgSrc} alt={`Imgen del ${ title }`} />
        <div className="p-4">
          <div className='flex justify-between' >
          <h5 className="font-bold text-xl">{title}</h5>
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
          <a href="#" className="text-black no-underline">
          <p className="flex items-center justify-between">
              {location}</p>     
            <div className="flex flex-col items-center">
              <p className=" text-xs ">Desde</p>
              <p className=" text-xl ">
                ${price}
              </p>
              <p className="text-base">
                x Persona
              </p>
            </div>
            <strong className="flex items-center justify-between">
            < Star/>
            < Star/>
            < Star/>
            < Star/>
            < StarHalf/>
            { qualification }
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
}

TourOffer.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  price: PropTypes.number,     
  qualification: PropTypes.number,
  status: PropTypes.bool     
};

export default TourOffer;
