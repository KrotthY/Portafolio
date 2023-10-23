import { Route, Routes } from "react-router-dom"
import { Login } from "../Auth/Pages/Login" 
import { TurismoRealRoutes } from "../Auth/Routes/TurismoRealRoutes"
import CreateAccount from "../Auth/Pages/CreateAccount"
import ForgotPassword from "../Auth/Pages/ForgotPassword"

const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="inicio-sesion" element={ <Login /> } />
        <Route path="crear-cuenta" element={ <CreateAccount /> } />
        <Route path="recuperar-contrasena" element={ <ForgotPassword /> } />

        <Route path="/*" element={ <TurismoRealRoutes /> } />


      </Routes>

    </>
  )
}

export default AppRouter