import {
  Card,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
import {
  PowerIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import useSession from "../../../Auth/Context/UseSession";
import { PublicRoutes } from "../../../Router";
import { logoTurismoReal } from "../../../Assets";

export function Sidebar() {
  const { logout } = useSession();
  const navigate = useNavigate ();


  return (
    <Card className="h-[100vh] md:w-auto rounded-none w-full p-2 shadow-xl bg-blue-gray-900">
    <div className=" flex flex-col h-full ">
        <div className="mx-auto">
          <img src={logoTurismoReal} className="w-32" alt="" />
        </div>
      <div className="flex-1 overflow-y-auto">
        <List>

          <Link to="/colaborador/check-in" >
            <ListItem  
              className="font-normal text-white"
            >
              <ListItemPrefix>
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              </ListItemPrefix>
              Registro de Huespedes
            </ListItem>
  
          </Link>

        </List>
      </div>
      <div className="mt-4">
        <List className="mt-auto">
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