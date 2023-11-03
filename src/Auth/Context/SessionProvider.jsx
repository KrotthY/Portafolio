import { useState } from "react";
import SessionContext from "./SessionContext";
import PropTypes from "prop-types";

const SesionProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
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