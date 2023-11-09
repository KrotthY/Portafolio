import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
import {
  PowerIcon,
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

  const valueSelected = "bg-blue-gray-100 bg-opacity-80  text-blue-gray-900"

  
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-500/5 bg-blue-gray-800  rounded-none ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Panel de Funcionarios
        </Typography>
      </div>
      <div className="flex flex-col h-full">
      <List className="flex-1">
        <Link to="/colaborador/check-in" >
          <ListItem onClick={ () => SetSelectedSideBar("ServicioTransporte") } 
          className= {` font-bold text-white  ${SelectedSideBar === "ServicioTransporte" ? valueSelected : ''}`}
          >
            <ListItemPrefix>
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Registro de huespedes
          </ListItem>
        </Link>
      </List>
      <List className="mt-auto">
        <ListItem onClick={ () => {

            SetSelectedSideBar("Cerrar")
            logout();
            navigate(PublicRoutes.LOGOUT, { replace: true });

          } } 
          className= {` font-bold text-white  ${SelectedSideBar === "Cerrar" ? valueSelected : ''}`}
          >
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