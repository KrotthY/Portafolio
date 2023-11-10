import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Select, Option, Checkbox } from "@material-tailwind/react";
import PropTypes from 'prop-types'

const ModalEdit = ({onClose,showModal}) => {

  return (
    <Dialog open={showModal}  aria-labelledby="modalRegistro" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Editar Departamento</span>
        <IconButton
        color="blue-gray"
        size="sm"
        variant="text"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
      </DialogHeader>
      <DialogBody>
  
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-blue-200">
          <Input color="blue" label="Nombre" size="md"  />
          <Input color="blue" label="Número" size="md" disabled/>
          <Input color="blue" label="Descripción" size="md" />
          <Input color="blue" label="Región" size="md" disabled/>
          <Input color="blue" label="Tarifa Diaria" size="md" />
          <Input color="blue" label="Comuna" size="md" disabled/>
          <Input color="blue" label="Calle" size="md" disabled />

        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
          <Typography className="-mb-2" variant="h6">
            Imagenes de la Propiedad
          </Typography>
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
          </div>
          <div>
          <Typography className="-mb-2" variant="h6">
            Servicios
          </Typography>
          <div className="grid grid-cols-2 py-2">
            <span className="flex items-center">
              <Checkbox color="blue" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="red" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="green" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="amber" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="teal" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="indigo" defaultChecked />
              Hola
            </span>
            <span className="flex items-center">
              <Checkbox color="purple" defaultChecked />
              Hola
            </span>
          </div>
          </div>
        </div>
    


      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
        <button
          className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Guardar
        </button>
      </DialogFooter>
    </Dialog>
  );
};

ModalEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalEdit;
