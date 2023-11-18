import { Input,Dialog,DialogBody,DialogFooter,DialogHeader, IconButton, Typography, Checkbox, Select, Option, Textarea } from "@material-tailwind/react";
import PropTypes from 'prop-types'
import { useState } from "react";




const ModalView = ({onClose,showModal}) => {

  const [tipo, setTipo] = useState('');
  const [comuna, setComuna] = useState('');
  const [region, setRegion] = useState('');

  return (
    <Dialog open={showModal}  aria-labelledby="modalCrear" size="xl"
    className="max-w-full max-h-screen py-2  overflow-y-scroll"
    >
      <DialogHeader className="border-b-2 border-gray-300 flex justify-between items-start p-5">
        <span className="text-2xl tracking-tight font-extrabold text-gray-900">Ver Propiedad</span>
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
        <Typography>
          Datos de la propiedad
        </Typography>
        <div className="grid grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-blue-200">
          <div className="relative">
            <Input type="text" name="nombre" color="blue" label="Nombre" size="md"
            disabled
            />
          </div>

          <div className="flex  justify-center items-center gap-11">
            <div className="relative w-full">
              <Input color="blue" label="Número" name="numero" size="md" 
              type="text"
              disabled
              />
            </div>
            <div className="relative w-full">
              <Select color="blue" label="Tipo de Propiedad" size="md"
              value={tipo}
              disabled
              onChange={e =>{
                setTipo(e)
              }} 
              >
                <Option value="Departamento">Departamento</Option>
                <Option value="Casa">Casa</Option>
              </Select>

            </div>
          </div>
          <div className="relative">
            <Select color="blue" label="Región" size="md"
            value={region}
            disabled
            onChange={e =>{
              setRegion(e)
            }}
            >
              <Option value="1">Region 1</Option>
              <Option value="2">Material Tailwind React</Option>
            </Select>
          </div>
          <div className="relative">
            <Input color="blue" label="Tarifa Diaria" size="md" name="tarifa"
            disabled
            type="number"
            />
          </div>
          <div className="relative">
            <Select color="blue" label="Comuna" size="md"
            disabled
            value={comuna}
            onChange={e =>{ 
              setComuna(e) 
            }}

            >
              <Option value="1" >comuna 1</Option>
              <Option value="2" >Material Tailwind React</Option>
              <Option value="3" >Material Tailwind Vue</Option>
            </Select>
          </div>
          <div className="relative">
            <Input color="blue" label="Calle" size="md"  name="calle"
            type="text"
            disabled
            />
          </div>
          <div className="relative">
            <Textarea  color="blue" label="Descripción" size="md" name="descripcion"
            type="text"
            disabled

            />
  
          </div>
          <div className="grid w-full grid-cols-1 md:grid-cols-2  gap-4">
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
        <Typography>
          Datos del Departamento
        </Typography>
        <div className="grid grid-cols-4  gap-6">
          <div className="relative">
            <Input color="blue" label="Cantidad de Baños" size="md" 
              type="number"
              disabled
            />

          </div>
          <div className="relative">
            <Input name="habitaciones" color="blue" label="Cantidad de Habitaciones" size="md"  
              type="number"
              disabled
            />
          </div>
          <div>
            <Input name="camas" color="blue" label="Cantidad de Camas" size="md"  
              type="number"
              disabled
            />
          </div>
          <div className="relative">
            <Input color="blue" label="Cantidad de Huespedes" size="md"  max={20} min={1} 
              type="number"
              disabled
            />
          </div>
        </div>
        <div className="flex items-center justify-center my-6 ">
          <span className="flex items-center">
            <Checkbox color="blue" defaultChecked size="sm"
            name="active"
            disabled
            />
            Habilitar departamento 
          </span>

        </div>

      </DialogBody>
      <DialogFooter className="p-2 border-t-2 border-gray-100 gap-4">
        <button
          onClick={onClose}
          type="button"
          className="text-white   bg-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10"
        >
        Cerrar ventana
        </button>
      </DialogFooter>
    </Dialog>
  );
};

ModalView.propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default ModalView;
