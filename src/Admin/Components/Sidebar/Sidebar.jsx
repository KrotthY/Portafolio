import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
import {
  BuildingOffice2Icon,
  PresentationChartBarIcon,
  UserGroupIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  PowerIcon,
  GlobeAmericasIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../../Auth/Context/UseSession";
import { PublicRoutes } from "../../../Router";

export function Sidebar() {
  const { logout } = useSession();
  const navigate = useNavigate ();

  const [ SelectedSideBar, SetSelectedSideBar ] = useState(null) 

  const valueSelected = "bg-blue-gray-50 bg-opacity-80  text-dark"

  
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-500/5 bg-blue-gray-900  rounded-none ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Panel de Administración
        </Typography>
      </div>
      <div className=" flex flex-col h-full">
        <List className="flex-1">
          <Link to="panel-administracion" >
            <ListItem   onClick={ () => SetSelectedSideBar("Departamentos") } 
              className= {` font-normal text-white  ${SelectedSideBar === "Departamentos" ? valueSelected : ''}`}
            >
              <ListItemPrefix>
                <BuildingOffice2Icon className="h-5 w-5" />
              </ListItemPrefix>
              Propiedades
            </ListItem>
          </Link>
          <Link to="/admin/servicios-transporte" >
            <ListItem onClick={ () => SetSelectedSideBar("ServicioTransporte") }
            className={`  font-normal text-white  ${ SelectedSideBar === "ServicioTransporte" ? valueSelected : ''} `}>
              <ListItemPrefix>
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
              </ListItemPrefix>
              Servicios de Transporte
            </ListItem>
          </Link>
          <Link to="/admin/servicio-turismo" >
            <ListItem onClick={ () => SetSelectedSideBar("ServicioTurismo") } 
              className={`  font-normal text-white  ${ SelectedSideBar === "ServicioTurismo" ? valueSelected : ''} `}
              >
              <ListItemPrefix>
                <GlobeAmericasIcon className="h-5 w-5" />
              </ListItemPrefix>
              Servicio de Turismo
            </ListItem>
          </Link>
          <Link to="/admin/inventario" >
            <ListItem onClick={ () => SetSelectedSideBar("Inventario") } 
              className={`  font-normal text-white  ${ SelectedSideBar === "Inventario" ? valueSelected : ''} `}
              >
              <ListItemPrefix>
                <GlobeAmericasIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inventario
            </ListItem>
          </Link>
          <Link to="/admin/servicios" >
            <ListItem onClick={ () => SetSelectedSideBar("Servicios") }
            className={`  font-normal text-white  ${ SelectedSideBar === "Servicios" ? valueSelected : ''} `}
            >
              <ListItemPrefix>
                <WrenchScrewdriverIcon className="h-5 w-5" />
              </ListItemPrefix>
              Servicios
            </ListItem>
          </Link>
          <Link to="/admin/usuarios" >
            <ListItem onClick={ () => SetSelectedSideBar("Usuarios") }
            className={`  font-normal text-white  ${ SelectedSideBar === "Usuarios" ? valueSelected : ''} `}
            >
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              Usuarios
            </ListItem>
          </Link>
          <Link to="/admin/reportes" >
            <ListItem onClick={ () => SetSelectedSideBar("Reportes") }
            className={`  font-normal text-white  ${ SelectedSideBar === "Reportes" ? valueSelected : ''} `}
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Reportes
            </ListItem>
          </Link>
        </List>
        <List className="mt-auto">
          <Link to="/admin/perfil" >
            <ListItem onClick={ () => SetSelectedSideBar("Perfil") }
            className={`  font-normal text-white  ${ SelectedSideBar === "Perfil" ? valueSelected : ''} `}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Perfil
            </ListItem>
          </Link>

          <ListItem onClick={ () => {
                SetSelectedSideBar("Cerrar"); 
                logout();
                navigate(PublicRoutes.LOGOUT, { replace: true });
              
              } } 
              className={`  font-normal text-white  ${ SelectedSideBar === "cerrar" ? valueSelected : ''} `}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cerrar Sesión
          </ListItem>
        </List>
      </div>
    </Card>
    
  );
}