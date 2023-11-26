import {
  Card,
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
  ChatBubbleBottomCenterTextIcon,
  ArchiveBoxIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../../Auth/Context/UseSession";
import { PublicRoutes } from "../../../Router";
import { IconoTurismoReal } from "../../../Assets";

export function Sidebar() {
  const { logout } = useSession();
  const navigate = useNavigate ();
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ isDropdownOpenInv, setIsDropdownOpenInv ] = useState(false);
  const [ isDropdownOpenCon, setIsDropdownOpenCon ] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClickConductor = () => {
    setIsDropdownOpenCon(!isDropdownOpenCon);
  };

  const handleDropdownClickInv = () => {
    setIsDropdownOpenInv(!isDropdownOpenInv);
  };



  return (
    <Card className="h-[100vh] md:w-auto rounded-none w-full p-2 shadow-xl bg-blue-gray-900">
      <div className=" flex flex-col h-full ">
          <div className="mb-2 p-4">
            <img src={IconoTurismoReal} className="w-40" alt="" />
          </div>
        <div className="flex-1 overflow-y-auto">
          <List>

            <Link to="panel-administracion" >
              <ListItem  
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <BuildingOffice2Icon className="h-6 w-6" />
                </ListItemPrefix>
                Propiedades
              </ListItem>
    
            </Link>
            <Link>
              <ListItem 
                onClick={handleDropdownClickConductor} 
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </ListItemPrefix>
                Servicios de Transporte
              </ListItem>
            </Link>
            {isDropdownOpenCon && (
              <div className="ml-4">
                <Link to="/admin/servicios-transporte" >
                  <ListItem   
                    className="font-normal text-white" 
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Traslados
                  </ListItem>
                </Link>

                <Link to="/admin/conductores" >
                  <ListItem   
                    className="font-normal text-white"
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Conductores
                  </ListItem>
                </Link>
              </div>
            )}
            <Link to="#" >
              <ListItem onClick={handleDropdownClick}  
                className="font-normal text-white" 
                >
                <ListItemPrefix>
                  <GlobeAmericasIcon className="h-6 w-6" />
                </ListItemPrefix>
                Administración de Tours
              </ListItem>
            </Link>
            {isDropdownOpen && (
              <div className="ml-4">
                <Link to="/admin/servicio-turismo" >
                  <ListItem   
                    className="font-normal text-white" 
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Crear tour
                  </ListItem>
                </Link>

                <Link to="/admin/agendar-tour" >
                  <ListItem   
                    className="font-normal text-white"
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Agendar tour
                  </ListItem>
                </Link>
              </div>
            )}

            <Link>
              <ListItem onClick={handleDropdownClickInv}  
                className="font-normal text-white"
                >
                <ListItemPrefix>
                  <ArchiveBoxIcon className="h-6 w-6" />
                </ListItemPrefix>
                Administración de Inventario
              </ListItem>
            </Link>
            {isDropdownOpenInv && (
              <div className="ml-4">
                <Link to="/admin/inventario" >
                  <ListItem   
                    className="font-normal text-white"
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Inventario
                  </ListItem>
                </Link>
                <Link to="/admin/productos" >
                  <ListItem   
                    className="font-normal text-white"
                    >
                    <ListItemPrefix>
                      <ChevronRightIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Productos
                  </ListItem>
                </Link>
              </div>
            )}
            <Link to="/admin/servicios" >
              <ListItem   
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <WrenchScrewdriverIcon className="h-6 w-6" />
                </ListItemPrefix>
                Servicios
              </ListItem>
            </Link>
            <Link to="/admin/usuarios" >
              <ListItem   
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <UserGroupIcon className="h-6 w-6" />
                </ListItemPrefix>
                Usuarios
              </ListItem>
            </Link>
            <Link to="/admin/reportes" >
              <ListItem   
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-6 w-6" />
                </ListItemPrefix>
                Reportes
              </ListItem>
            </Link>
          </List>
        </div>
        <div className="mt-4">
          <List className="mt-auto">
            <Link to="/admin/perfil" >
              <ListItem   
                className="font-normal text-white"
              >
                <ListItemPrefix>
                  <UserCircleIcon className="h-6 w-6" />
                </ListItemPrefix>
                Perfil
              </ListItem>
            </Link>

            <ListItem onClick={ () => {
                  logout();
                  navigate(PublicRoutes.LOGOUT, { replace: true });
                } } 
                className="font-normal text-white"
                >
              <ListItemPrefix>
                <PowerIcon className="h-6 w-6" />
              </ListItemPrefix>
              Cerrar Sesión
            </ListItem>
          </List>
        </div>
      </div>
    </Card>
    
  );
}