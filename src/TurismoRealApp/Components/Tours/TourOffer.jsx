import PropTypes from 'prop-types';
import { Chip } from '@material-tailwind/react';
import { useState } from 'react';
import TourModal from './TourModal';
import Swal from 'sweetalert2';

const TourOffer = ({ idTour, imgSrc,qtyPerson,description,title,price,status}) => {

  const [offerStatus, setStatus ] = useState("S")
  const [showModal, setShowModal] = useState(false);

  const isAvailable = offerStatus === status;
  const chipColor = isAvailable ? 'green' : 'red';
  const chipValue = isAvailable ? 'Disponible' : 'Agotado';

  const handleOpen = (e) => {
    if(isAvailable){
      e.preventDefault();
      setShowModal(true);
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Ups!',
        text: 'No quedan cupos disponibles para este tour',
        confirmButtonText: 'Entendido'
      });
    }
  }
  
  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="w-full select-none">
      <div className="rounded overflow-hidden shadow-md">
        <img className="w-full h-88 object-cover object-center" src={imgSrc} alt={`Imgen del ${ title }`} />
        <div className="p-4 cursor-pointer " onClick={handleOpen}>
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
              location
            </p>
            <p className="text-xs font-normal my-4  h-16">
              {description}

            </p>
            <div className="flex flex-col items-center">
              <p className=" text-xs font-light ">Capacidad</p>
              <p className=" text-xl ">
                {qtyPerson}
              </p>
              <p className="text-xs font-light">
                Personas
              </p>
            </div>    
            <div className="flex justify-center items-center pt-6">
              <p className=" text-xs ">
                ${price.toLocaleString('de-DE')} desde x persona
              </p>
            </div>
          
        </div>
      </div>
      <TourModal 
        idTour={idTour}
        showModal={showModal}
        onClose={closeModal}
      />
    </div>
  );
}

TourOffer.propTypes = {
  idTour: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  qtyPerson: PropTypes.number,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number,     
  status: PropTypes.string     
};

export default TourOffer;
