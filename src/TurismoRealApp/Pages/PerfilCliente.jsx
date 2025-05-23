import { Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import useSession from "../../Auth/Context/UseSession";
import { createElement, useEffect, useState } from "react";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  
} from "@heroicons/react/24/solid";
import { carousel3 } from "../../Assets";
import formatNumberWithDollar from "../../Admin/Assets/js/formatNumberDollar";

const PerfilCliente = () => {

  const { user } = useSession();
  const [reservaUsuario, setReservaUsuario] = useState([]);
  const cargarReservaUsuarios = () => {
    const URL_API_GET_RESERVA = 'https://fastapi-gv342xsbja-tl.a.run.app/reservas_usuario';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
        'Content-Type': 'application/json',
      },
    };

    fetch(URL_API_GET_RESERVA,requestOptions)
      .then(response => response.json())
      .then(data => {
        setReservaUsuario(data)
      })
      .catch(error => console.log(error))

  }

  useEffect(() => {
    cargarReservaUsuarios();
  }, []);

  const data = [
    {
      label: "Perfil",
      value: "perfil",
      icon: UserCircleIcon,
    },
    {
      label: "Reservas activas",
      value: "reservas",
      icon: BuildingOffice2Icon,
    },
  ];
  const [activeTab, setActiveTab] = useState(false);

  const handleTabs = () => {
    setActiveTab(true)
  }
  console.log(reservaUsuario)
  return (
    <div className="  bg-gray-200 p-12">

      <Tabs>
        <TabsHeader className="bg-blue-gray-200 z-0">
        {data.map(({ label, value, icon }) => (
          <Tab onClick={handleTabs}  key={value} value={value}>
            <div className="flex items-center gap-2">
              {createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
        </TabsHeader>
        <TabsBody>
            <TabPanel key="perfil" value="perfil" >
            <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl my-28">
              <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                      <div className="w-full flex justify-center">
                          <div className="relative">
                              <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                          </div>
                      </div>
                      <div className="w-full text-center mt-20">
                          <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                              <div className="p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">60</span>
                                  <span className="text-sm text-slate-400">Reservas realizadas</span>
                              </div>
                              <div className="p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">4</span>
                                  <span className="text-sm text-slate-400">Tours completados</span>
                              </div>

                              <div className="p-3 text-center">
                                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">64</span>
                                  <span className="text-sm text-slate-400">Lugares conocidos</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="text-center mt-2">
                      <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">Mike Thompson</h3>
                      <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Santiago, Chile
                      </div>
                  </div>
                  <div className="mt-6 py-6 border-t border-slate-200 text-center">
                      <div className="flex flex-wrap justify-center">
                          <div className="w-full px-4">
                              <p className="font-light leading-relaxed text-slate-600 mb-4">
                              Como un apasionado explorador, he decidido emprender un viaje por Chile, un país de contrastes asombrosos y rica cultura. Mi mochila está preparada con lo esencial: ropa adecuada para todo tipo de clima, una cámara para capturar la belleza del paisaje y un diario para anotar cada detalle de mi aventura.

                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            </TabPanel>
            <TabPanel key="reservas" value="reservas">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {
              reservaUsuario && reservaUsuario.length > 0 && reservaUsuario.map((reserva) => (

              <div key={reserva.RESERVA_ID} className="w-full bg-white rounded-lg py-6 flex flex-col justify-center items-center">
                  <div className="flex flex-col space-y-1 items-center">
                      <div className="text-sm text-gray-700 font-extralight ">
                        <p>Inicio: { reserva.FECHA_INICIO }</p>
                      </div>
                      <div className="text-sm text-gray-700 pb-1 font-extralight ">
                        <p>Fin: { reserva.FECHA_FIN }</p>
                      </div>
                  </div>
                  <div className="mb-2">
                      <img className="object-center object-cover rounded-full h-36 w-36" src="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" alt="photo"/>
                  </div>
                  <div>
                    <span className="text-base text-gray-700 font-bold">
                    { reserva.NOMBRE_DPTO +' '+ reserva.NUMERO }
                    </span>
                  </div>
                  <div className="text-center">
                      <p className="text-base text-gray-400 font-normal">{ formatNumberWithDollar(reserva.MONTO_TOTAL) }</p>
                      <p className="text-sm text-gray-700 font-extralight ">{ reserva.NOMBRE_COMUNA }</p>
                  </div>
              </div>
              ))
            }
            </div>
            </TabPanel>
    
        </TabsBody>
      </Tabs>
      {
        !activeTab && (

        <div className="w-full flex flex-col justify-center items-center">
          <Typography className="my-32 " variant="h5">
            Selecciona una opción para ver tu perfil  
          </Typography>
        </div>

        )
      }
    </div>
  );
}

export default PerfilCliente