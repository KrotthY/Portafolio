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
import { Link } from "react-router-dom";

export function Sidebar() {

  const [ SelectedSideBar, SetSelectedSideBar ] = useState(null) 

  const valueSelected = "bg-blue-gray-100 bg-opacity-80  text-blue-gray-900"

  
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-gray-50  rounded-none">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Panel de Administración
        </Typography>
      </div>
      <List>
        <Link to="/admin/panel-administracion" >
          <ListItem onClick={ () => SetSelectedSideBar("Departamentos") } className={ SelectedSideBar === "Departamentos" ? valueSelected : ''}>
            <ListItemPrefix>
              <BuildingOffice2Icon className="h-5 w-5" />
            </ListItemPrefix>
            Departamentos
          </ListItem>
        </Link>
        <Link to="/admin/servicios-transporte" >
          <ListItem onClick={ () => SetSelectedSideBar("ServicioTransporte") } className={ SelectedSideBar === "ServicioTransporte" ? valueSelected : ''}>
            <ListItemPrefix>
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Servicios de Transporte
          </ListItem>
        </Link>
        <Link to="/admin/servicio-turismo" >
          <ListItem onClick={ () => SetSelectedSideBar("ServicioTurismo") } className={ SelectedSideBar === "ServicioTurismo" ? valueSelected : ''}>
            <ListItemPrefix>
              <GlobeAmericasIcon className="h-5 w-5" />
            </ListItemPrefix>
            Servicio de Turismo
          </ListItem>
        </Link>
        <Link to="/admin/servicios" >
          <ListItem onClick={ () => SetSelectedSideBar("Servicios") } className={ SelectedSideBar === "Servicios" ? valueSelected : ''}>
            <ListItemPrefix>
              <WrenchScrewdriverIcon className="h-5 w-5" />
            </ListItemPrefix>
            Servicios
          </ListItem>
        </Link>
        <Link to="/admin/usuarios" >
          <ListItem onClick={ () => SetSelectedSideBar("Usuarios") } className={ SelectedSideBar === "Usuarios" ? valueSelected : ''}>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Usuarios
          </ListItem>
        </Link>
        <Link to="/admin/reportes" >
          <ListItem onClick={ () => SetSelectedSideBar("Reportes") } className={ SelectedSideBar === "Reportes" ? valueSelected : ''}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Reportes
          </ListItem>
        </Link>
        <Link to="/admin/perfil" >
          <ListItem onClick={ () => SetSelectedSideBar("Perfil") } className={ SelectedSideBar === "Perfil" ? valueSelected : ''}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Perfil
          </ListItem>
        </Link>
        <ListItem onClick={ () => SetSelectedSideBar("Cerrar") } className={ SelectedSideBar === "Cerrar" ? valueSelected : ''}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Cerrar Sesión
        </ListItem>
      </List>
    </Card>
  );
}