import { useState } from "react";
import SessionContext from "./SessionContext";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const SesionProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    access_token: Cookies.get('authToken'),
    role: Cookies.get('userRole')
  });
  const login = (user) => {
    setUser({
      access_token: user.access_token,
      role: user.role
    })

    Cookies.set('authToken', user.access_token);
    Cookies.set('userRole', user.role);
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('authToken');
    Cookies.remove('userRole');
  }



  return (
    <SessionContext.Provider value={{user,login,logout}}>
      {children}
    </SessionContext.Provider>
  )
}


SesionProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default SesionProvider