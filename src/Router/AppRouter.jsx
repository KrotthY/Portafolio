import { Route, Routes } from "react-router-dom"
import FuncionarioRoutes from "../Funcionarios/Routes/FuncionarioRoutes"
import { PrivateRoutes, PublicRoutes } from "./Routes"
import { AuthGuard } from "../Auth/Guard/AuthGuard"
import { CreateAccount, ForgotPassword, Login } from "../Auth/Pages"
import { AdminRoutes } from "../Admin/Routes"
import { TurismoRealRoutes } from "../TurismoRealApp/Routes"


const AppRouter = () => {
  return (
    <>
  <Routes>
      <Route path={ PublicRoutes.LOGIN } element={ <Login /> } />
      <Route path={ PublicRoutes.REGISTER } element={ <CreateAccount /> } />
      <Route path={ PublicRoutes.RECOVER_PASSWORD } element={ <ForgotPassword /> } />

      <Route element={ <AuthGuard />} > 
        <Route path={ PrivateRoutes.COLLABORATOR_ALL } element={ <FuncionarioRoutes />} />
        <Route path={ PrivateRoutes.ADMIN_ALL } element={<AdminRoutes /> } />
      
      </Route>
      <Route path={PublicRoutes.HOME_ALL} element={ <TurismoRealRoutes /> } />
  </Routes>
    </>
  )
}

export default AppRouter