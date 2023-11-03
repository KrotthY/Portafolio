import { Route, Routes } from "react-router-dom"
import { Login } from "../Auth/Pages/Login" 
import CreateAccount from "../Auth/Pages/CreateAccount"
import ForgotPassword from "../Auth/Pages/ForgotPassword"
import AdminRoutes from "../Admin/Routes/AdminRoutes"
import { TurismoRealRoutes } from "../TurismoRealApp/Routes/TurismoRealRoutes"

const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="inicio-sesion" element={ <Login /> } />
        <Route path="crear-cuenta" element={ <CreateAccount /> } />
        <Route path="recuperar-contrasena" element={ <ForgotPassword /> } />

        <Route path="/*" element={ <TurismoRealRoutes /> } />
        <Route path="admin/*" element={ <AdminRoutes /> } />


      </Routes>

    </>
  )
}

export default AppRouter