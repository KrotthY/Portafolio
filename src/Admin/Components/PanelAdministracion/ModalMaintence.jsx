import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types'

const ModalMaintence = ({onClose,showModal}) => {

  return (
    <Dialog open={showModal}  aria-labelledby="modalRegistro" size="md">
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Proceso de Registro</span>
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
          <Typography className="-mb-2" variant="h5">
            Huesped titular
          </Typography>
        <div className="flex items-center justify-between gap-6 my-12 border-b-4 pb-12 border-b-gray-200">
          <Input label="Rut" size="xs" />
          <Input label="Nombre" size="xs" />
          <Input label="Apellido" size="xs" />
          <Input label="Teléfono" size="xs" />
        </div>

        <Typography className="-mb-2" variant="h6">
            Acompañantes
          </Typography>
        <div className="font-normal border-b-4 pb-12 border-b-gray-200 my-12">
          <div className="flex items-center justify-between gap-6 my-6">
          <span className="w-1/2 ">Acompañante 1</span>

            <Input label="Nombre" size="xs"  />
            <Input label="Apellido" size="xs" />
            <Input label="Teléfono" size="xs" />
          </div>
          <div className="flex items-center justify-between gap-6 my-6">
          <span className="w-1/2 ">Acompañante 2</span>
            <Input label="Nombre" size="xs"  />
            <Input label="Apellido" size="xs" />
            <Input label="Teléfono" size="xs" />
          </div>
          <div className="flex items-center justify-between gap-6 my-6">
          <span className="w-1/2">Acompañante3</span>
            <Input label="Nombre" size="xs"  />
            <Input label="Apellido" size="xs" />
            <Input label="Teléfono" size="xs" />
          </div>
        </div>
        <Typography className="-mb-2" variant="h5">
            Resumen de reserva
        </Typography>
        <div className="grid grid-cols-3 my-12 gap-2 text-left text-base rounded-lg bg-blue-50/30   p-6 ">
          <div >
            <span className="font-normal">Nombre:</span>
            <span className="italic font-semibold"> Departamento 1</span> 
          </div>
          <div>
            <span className="font-normal">Fecha de entrada:</span>
            <span className="italic font-semibold"> 20/10/2021</span>
          </div>
          <div>
            <span className="font-normal">Fecha de salida:</span>
            <span className="italic font-semibold"> 20/10/2021</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-left text-base border-2 rounded-lg bg-blue-100/30  p-3 ">
          <div>
            <span className="font-normal">Total de noches:</span>
            <span className="italic font-semibold"> 1</span>
          </div>
          <div>
            <span className="font-normal">Total de personas:</span>
            <span className="italic font-semibold"> 2</span>
          </div>
        </div>
        <div className="grid grid-cols-3 my-12 gap-2 text-left text-base border-4 rounded-lg bg-blue-200/30   p-6 ">
          <div>
            <span className="font-normal">Costo diario:</span>
            <span className="italic font-semibold"> $100.000</span>
          </div>
          <div>
            <span className="font-normal">Monto Abonado:</span>
            <span className="italic font-semibold"> $100.000</span>
          </div>
          <div>
            <span className="font-normal">Monto Total Adeudado:</span>
            <span className="italic font-semibold"> $100.000</span>
          </div>
        </div>


      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
        <button
          onClick={onClose}
          className="text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
          Cancelar
        </button>
        <button
          className="text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10"
        >
          Pagar  Total
        </button>
      </DialogFooter>
    </Dialog>
  );
};

ModalMaintence.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalMaintence;
