import { Route, Routes } from "react-router-dom"
import FuncionarioRoutes from "../Funcionarios/Routes/FuncionarioRoutes"
import { PrivateRoutes, PublicRoutes } from "./Routes"
import { AuthGuard } from "../Auth/Guard/AuthGuard"
import { lazy } from "react"


const Login = lazy(() => import('../Auth/Pages/Login'))
const CreateAccount = lazy(() => import('../Auth/Pages/CreateAccount'))
const ForgotPassword = lazy(() => import('../Auth/Pages/ForgotPassword'))
const AdminRoutes = lazy(() => import('../Admin/Routes/AdminRoutes'))
const TurismoRealRoutes = lazy(() => import('../TurismoRealApp/Routes/TurismoRealRoutes'))

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