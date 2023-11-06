import { PrivateRoutes, PublicRoutes, Role_user } from "../../Router";

const getRoleSpecificRoute = ( role ) => {
if (role === Role_user.ADMIN) {
    return PrivateRoutes.ADMIN_ROLE;
  } else if (role === Role_user.COLLABORATOR) {
    return PrivateRoutes.COLLABORATOR_ROLE;
  } else {
    return PublicRoutes.CLIENTE_ROL;
  }
}

export default getRoleSpecificRoute;