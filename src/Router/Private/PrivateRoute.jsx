import { Navigate } from "react-router-dom";
import useSession from "../../Auth/Context/UseSession";
import PropTypes from "prop-types";


const PrivateRoute = ({ children, roles }) => {

  const { user } = useSession();

  if (!user) {
    return <Navigate to="/inicio-sesion" />;
  }

  
  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/" />;
  }
  
  return (children)
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.array
}


export default PrivateRoute