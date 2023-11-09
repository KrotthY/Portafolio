import { Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Textarea, Checkbox } from "@material-tailwind/react";
import PropTypes from 'prop-types'

const ModalRegistroSalida = ({onClose,showModal}) => {

  return (
    <Dialog open={showModal}  aria-labelledby="modalRegistro" size="xs">
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Proceso de Salida</span>
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
          <Typography className="my-2 " variant="h5">
            Huesped titular
          </Typography>
        <div className="grid font-sans grid-cols-2  mb-12 gap-2 text-left text-base rounded-lg  bg-blue-100/30   p-6 ">
          <div >
            <span className="font-bold">Nombre:</span>
            <span className=" uppercase"> carlos </span> 
          </div>
          <div>
            <span className="font-bold">Apellido:</span>
            <span className=" uppercase"> Vidal </span>
          </div>
          <div>
            <span className="font-bold">Teléfono:</span>
            <span className=" uppercase"> 123123123 </span>
          </div>
          <div>
            <span className="font-bold">Rut:</span>
            <span className=" uppercase"> 18.674.411-k </span>
          </div>
        </div>

        <div className="my-12">
        <Textarea label="Ingrese observaciónes si es necesario." />
        </div>

        <div className="flex items-center justify-center my-6">
          <Checkbox color="blue" defaultChecked />
          <span className="text-xs">Todo se encuentra en orden dentro del inmueble al momento de la recepción</span>
        </div>
        <div className="flex items-center justify-around">
        <button
          className="text-white   bg-red-500 hover:bg-red-100 focus:ring-4 focus:ring-red-300 rounded-lg border border-red-200 text-sm font-semibold px-5 py-2.5 hover:text-red-900 focus:outline-none focus:z-10"
        >
          Generar Multa
        </button>
        <button
          className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Registrar Salida
        </button>

        </div>

      </DialogBody>
      <DialogFooter className="p-2 my-4 border-t-2 border-gray-100 gap-4">
        <button
          onClick={onClose}
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>

      </DialogFooter>
    </Dialog>
  );
};

ModalRegistroSalida.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalRegistroSalida;
