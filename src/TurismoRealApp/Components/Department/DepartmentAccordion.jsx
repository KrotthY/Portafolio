import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import PropTypes from 'prop-types';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}


const DepartmentAccordion = () => {

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>Politicas de Reserva</AccordionHeader>
        <AccordionBody>
        Anticipación: Las reservas deben realizarse con al menos 48 horas de anticipación.  <br/>Reservas de última hora están sujetas a disponibilidad.
        <br/> <br/>
        Depósito: Se requiere un depósito del 25% al momento de la reserva.  <br/>El saldo restante deberá pagarse a la llegada.
        <br/> <br/>
        Cancelación: Las cancelaciones realizadas con más de 7 días de anticipación recibirán un reembolso completo del depósito. Las cancelaciones realizadas entre 3 y 7 días antes de la fecha de check-in recibirán un reembolso del 50% del depósito. 
        <br/>Las cancelaciones realizadas con menos de 3 días de anticipación no serán reembolsadas.
        <br/> <br/>
        Modificaciones: Cualquier cambio en la fecha de reserva está sujeto a disponibilidad y puede incurrir en cargos adicionales.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Normas y Reglamento
        </AccordionHeader>
        <AccordionBody>
          No Fumar: Está prohibido fumar en todas las áreas del departamento. Se cobrará una multa por limpieza si se detecta que se ha fumado en el interior.
          <br/> <br/>

          Horario de Silencio: Por respeto a los vecinos y otros huéspedes, solicitamos mantener el ruido al mínimo entre las 10:00 p.m. y las 7:00 a.m.
          <br/> <br/>
          Mascotas: No se admiten mascotas en las instalaciones. Si se descubre que se ha llevado una mascota al departamento, se cobrará una multa y se podrá solicitar al huésped que abandone la propiedad.
          <br/> <br/>
          Daños: Cualquier daño causado al departamento o a sus contenidos será responsabilidad del huésped y se cobrará acorde al costo de reparación o reemplazo.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Preguntas frecuentes (FAQs)
        </AccordionHeader>
        <AccordionBody>
          ¿Hay WiFi disponible?
          <br/> <br/>
          Sí, ofrecemos WiFi gratuito en todo el departamento. Los detalles de acceso se proporcionarán al momento del check-in.
          <br/> <br/>
          ¿Cómo funciona el sistema de calefacción?
          <br/> <br/>
          El departamento cuenta con un sistema centralizado de calefacción. Las instrucciones detalladas están disponibles en el manual del departamento que se encuentra en la sala de estar.
          <br/> <br/>
          ¿Hay estacionamiento disponible?
          <br/> <br/>
          Sí, ofrecemos un espacio de estacionamiento gratuito por departamento. Si necesita estacionamiento adicional, por favor infórmenos con anticipación.
          <br/> <br/>
          ¿El departamento está equipado con utensilios de cocina y electrodomésticos?
          <br/> <br/>
          Sí, el departamento tiene una cocina completamente equipada con todos los utensilios básicos y electrodomésticos, como nevera, horno, microondas y tostadora.

        </AccordionBody>
      </Accordion>  
    </>
  )
}


Icon.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired
}

export default DepartmentAccordion