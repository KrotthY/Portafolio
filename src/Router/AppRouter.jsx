import { Route, Routes } from "react-router-dom"
import  Login  from "../Auth/Pages/Login" 
import CreateAccount from "../Auth/Pages/CreateAccount"
import ForgotPassword from "../Auth/Pages/ForgotPassword"
import AdminRoutes from "../Admin/Routes/AdminRoutes"
import TurismoRealRoutes  from "../TurismoRealApp/Routes/TurismoRealRoutes"
import PrivateRoute from "./Private/PrivateRoute"
import FuncionarioRoutes from "../Funcionarios/Routes/FuncionarioRoutes"

const AppRouter = () => {
  return (
    <>
  <Routes>
      <Route path="inicio-sesion" element={ <Login /> } />
      <Route path="crear-cuenta" element={ <CreateAccount /> } />
      <Route path="recuperar-contrasena" element={ <ForgotPassword /> } />

      <Route path="colaborador/*" element={ 
          <PrivateRoute roles={['funcionario']}>
            <FuncionarioRoutes />
          </PrivateRoute>
        } 
      />
  
      <Route path="admin/*" element={
        <PrivateRoute roles={['admin']}>
          <AdminRoutes />
        </PrivateRoute>
      } />
      <Route path="/*" element={ <TurismoRealRoutes /> } />
  </Routes>
    </>
  )
}

export default AppRouter